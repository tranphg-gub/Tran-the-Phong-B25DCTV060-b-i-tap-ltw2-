import { loadBooks, createBook, deleteBook, usingMockApi } from './api.js';
import { readFavorites, saveFavorites, setupTheme } from './storage.js';
import { renderBooks, renderGenres, renderFeatured } from './render.js';
import { validateField } from './validation.js';
import { normalizeText } from './search.js';
import type { Book, BookField, NewBook } from './types.js';

const search = document.querySelector<HTMLInputElement>('#search')!;
const genreFilter = document.querySelector<HTMLSelectElement>('#genre-filter')!;
const list = document.querySelector<HTMLElement>('#book-list')!;
const status = document.querySelector<HTMLElement>('#status')!;
const count = document.querySelector<HTMLElement>('#favorite-count')!;
const retry = document.querySelector<HTMLButtonElement>('#retry')!;
const form = document.querySelector<HTMLFormElement>('#book-form')!;
const message = document.querySelector<HTMLElement>('#form-message')!;
const notice = document.querySelector<HTMLElement>('#notice')!;
const submit = document.querySelector<HTMLButtonElement>('#add-book')!;
const favoriteFilter = document.querySelector<HTMLButtonElement>('#favorites-filter')!;
const clear = document.querySelector<HTMLButtonElement>('#clear-filters')!;
const dialog = document.querySelector<HTMLDialogElement>('#delete-dialog')!;
const featured = document.querySelector<HTMLElement>('#featured-books')!;
const fields: BookField[] = ['title', 'author', 'genre', 'year'];
let books: Book[] = [];
let favoritesOnly = false;
let ready = false;
let busy = false;
const favorites = readFavorites();

setupTheme(document.querySelector<HTMLButtonElement>('#theme-toggle')!);
form.querySelector<HTMLInputElement>('[name="year"]')!.max = String(new Date().getFullYear());
document.querySelector<HTMLElement>('#data-source')!.textContent = usingMockApi ? 'Thư viện trực tuyến' : 'Tủ sách mẫu';
document.querySelector<HTMLElement>('#save-hint')!.textContent = usingMockApi
  ? 'Sách mới được lưu vào thư viện trực tuyến.' : 'Bản mẫu: sách thêm hoặc xóa chỉ thay đổi trong phiên hiện tại.';

function render(): void {
  const keyword = normalizeText(search.value);
  const visible = books.filter(book => normalizeText(book.title).includes(keyword)
    && (!genreFilter.value || book.genre === genreFilter.value)
    && (!favoritesOnly || favorites.has(book.id)));
  renderBooks(list, visible, favorites);
  renderFeatured(featured, books);
  count.textContent = String(books.filter(book => favorites.has(book.id)).length);
  document.querySelector<HTMLElement>('#total-books')!.textContent = String(books.length);
  document.querySelector<HTMLElement>('#total-genres')!.textContent = String(new Set(books.map(book => book.genre)).size);
  if (ready) status.textContent = `Đang hiển thị ${visible.length} / ${books.length} cuốn`;
  favoriteFilter.setAttribute('aria-pressed', String(favoritesOnly));
  clear.hidden = !search.value && !genreFilter.value && !favoritesOnly;
  if (busy) list.querySelectorAll<HTMLButtonElement>('button').forEach(button => { button.disabled = true; });
}

function setBusy(value: boolean): void {
  busy = value;
  submit.disabled = value || !ready;
  form.querySelector<HTMLFieldSetElement>('fieldset')!.disabled = value;
  list.setAttribute('aria-busy', String(value));
  list.querySelectorAll<HTMLButtonElement>('button').forEach(button => { button.disabled = value; });
}

function persistFavorites(): void {
  if (!saveFavorites(favorites)) notice.textContent = 'Trình duyệt không cho lưu yêu thích. Thay đổi chỉ có hiệu lực trong phiên này.';
}

async function init(): Promise<void> {
  ready = false;
  status.textContent = 'Đang tải...';
  retry.hidden = true;
  setBusy(true);
  try {
    books = await loadBooks();
    renderGenres(genreFilter, books);
    const select = form.elements.namedItem('genre') as HTMLSelectElement;
    const genres = new Set(['Văn học', 'Khoa học', 'Kỹ năng', ...books.map(book => book.genre)]);
    select.replaceChildren(new Option('Chọn thể loại', ''));
    for (const genre of genres) select.add(new Option(genre, genre));
    ready = true;
    render();
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : 'Có lỗi khi tải sách. Vui lòng thử lại.';
    retry.hidden = false;
  } finally {
    setBusy(false);
  }
}

search.addEventListener('input', render);
genreFilter.addEventListener('change', render);
favoriteFilter.addEventListener('click', () => { favoritesOnly = !favoritesOnly; render(); });
clear.addEventListener('click', () => {
  search.value = '';
  genreFilter.value = '';
  favoritesOnly = false;
  render();
  search.focus();
});
retry.addEventListener('click', init);
featured.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest<HTMLButtonElement>('button[data-title]');
  if (!button) return;
  search.value = button.dataset.title || '';
  genreFilter.value = '';
  favoritesOnly = false;
  render();
  document.querySelector<HTMLElement>('.catalog')!.scrollIntoView({ block: 'start' });
  search.focus({ preventScroll: true });
});

function confirmDelete(book: Book): Promise<boolean> {
  document.querySelector<HTMLElement>('#delete-description')!.textContent = `Xóa sách “${book.title}” khỏi thư viện? ${usingMockApi ? 'Thao tác này sẽ xóa sách trên kho trực tuyến.' : 'Dữ liệu mẫu gốc sẽ được tải lại khi làm mới trang.'}`;
  dialog.returnValue = '';
  dialog.showModal();
  return new Promise(resolve => {
    dialog.addEventListener('close', () => resolve(dialog.returnValue === 'confirm'), { once: true });
  });
}

list.addEventListener('click', async event => {
  if (busy || !(event.target instanceof Element)) return;
  const button = event.target.closest<HTMLButtonElement>('button[data-action]');
  if (!button) return;
  const book = books.find(item => item.id === button.dataset.id);
  if (!book) return;
  notice.textContent = '';
  if (button.dataset.action === 'favorite') {
    if (favorites.has(book.id)) favorites.delete(book.id);
    else favorites.add(book.id);
    persistFavorites();
    render();
    list.querySelectorAll<HTMLButtonElement>('.favorite').forEach(item => {
      if (item.dataset.id === book.id) item.focus({ preventScroll: true });
    });
    return;
  }
  if (button.dataset.action !== 'delete' || !await confirmDelete(book)) return;
  setBusy(true);
  notice.textContent = 'Đang xóa sách...';
  try {
    await deleteBook(book.id);
    books = books.filter(item => item.id !== book.id);
    favorites.delete(book.id);
    renderGenres(genreFilter, books);
    notice.textContent = `Đã xóa sách “${book.title}”.`;
    persistFavorites();
    render();
    search.focus({ preventScroll: true });
  } catch (error) {
    notice.textContent = error instanceof Error ? error.message : 'Chưa xóa được sách. Vui lòng thử lại.';
  } finally {
    setBusy(false);
  }
});

function checkField(name: BookField): boolean {
  const input = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
  const error = validateField(name, input.value);
  document.querySelector<HTMLElement>(`#${name}-error`)!.textContent = error;
  input.setAttribute('aria-invalid', String(Boolean(error)));
  return !error;
}

for (const name of fields) {
  const input = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
  input.addEventListener('input', () => checkField(name));
  input.addEventListener('change', () => checkField(name));
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!ready || busy) return;
  message.textContent = '';
  if (fields.map(checkField).includes(false)) {
    form.querySelector<HTMLElement>('[aria-invalid="true"]')!.focus();
    return;
  }
  const data = new FormData(form);
  const newBook: NewBook = {
    title: String(data.get('title')).trim(),
    author: String(data.get('author')).trim(),
    genre: String(data.get('genre')).trim(),
    year: Number(data.get('year'))
  };
  setBusy(true);
  submit.textContent = 'Đang lưu...';
  try {
    const book = await createBook(newBook);
    books.unshift(book);
    search.value = '';
    genreFilter.value = '';
    favoritesOnly = false;
    renderGenres(genreFilter, books);
    render();
    form.reset();
    message.textContent = `Đã thêm sách “${book.title}” vào đầu danh sách.`;
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : 'Chưa thêm được sách. Vui lòng thử lại.';
  } finally {
    submit.textContent = 'Thêm vào kệ sách';
    setBusy(false);
  }
});

init();
