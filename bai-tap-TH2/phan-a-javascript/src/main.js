import { loadBooks, createBook, deleteBook, usingMockApi } from './api.js';
import { readFavorites, saveFavorites, setupTheme } from './storage.js';
import { renderBooks, renderGenres, renderFeatured } from './render.js';
import { validateField } from './validation.js';
import { normalizeText } from './search.js';
const search = document.querySelector('#search');
const genreFilter = document.querySelector('#genre-filter');
const list = document.querySelector('#book-list');
const status = document.querySelector('#status');
const count = document.querySelector('#favorite-count');
const retry = document.querySelector('#retry');
const form = document.querySelector('#book-form');
const message = document.querySelector('#form-message');
const notice = document.querySelector('#notice');
const submit = document.querySelector('#add-book');
const favoriteFilter = document.querySelector('#favorites-filter');
const clear = document.querySelector('#clear-filters');
const dialog = document.querySelector('#delete-dialog');
const featured = document.querySelector('#featured-books');
const fields = ['title', 'author', 'genre', 'year'];
let books = [];
let favoritesOnly = false;
let ready = false;
let busy = false;
const favorites = readFavorites();
setupTheme(document.querySelector('#theme-toggle'));
form.querySelector('[name="year"]').max = String(new Date().getFullYear());
document.querySelector('#data-source').textContent = usingMockApi ? 'Thư viện trực tuyến' : 'Tủ sách mẫu';
document.querySelector('#save-hint').textContent = usingMockApi
    ? 'Sách mới được lưu vào thư viện trực tuyến.' : 'Bản mẫu: sách thêm hoặc xóa chỉ thay đổi trong phiên hiện tại.';
function render() {
    const keyword = normalizeText(search.value);
    const visible = books.filter(book => normalizeText(book.title).includes(keyword)
        && (!genreFilter.value || book.genre === genreFilter.value)
        && (!favoritesOnly || favorites.has(book.id)));
    renderBooks(list, visible, favorites);
    renderFeatured(featured, books);
    count.textContent = String(books.filter(book => favorites.has(book.id)).length);
    document.querySelector('#total-books').textContent = String(books.length);
    document.querySelector('#total-genres').textContent = String(new Set(books.map(book => book.genre)).size);
    if (ready)
        status.textContent = `Đang hiển thị ${visible.length} / ${books.length} cuốn`;
    favoriteFilter.setAttribute('aria-pressed', String(favoritesOnly));
    clear.hidden = !search.value && !genreFilter.value && !favoritesOnly;
    if (busy)
        list.querySelectorAll('button').forEach(button => { button.disabled = true; });
}
function setBusy(value) {
    busy = value;
    submit.disabled = value || !ready;
    form.querySelector('fieldset').disabled = value;
    list.setAttribute('aria-busy', String(value));
    list.querySelectorAll('button').forEach(button => { button.disabled = value; });
}
function persistFavorites() {
    if (!saveFavorites(favorites))
        notice.textContent = 'Trình duyệt không cho lưu yêu thích. Thay đổi chỉ có hiệu lực trong phiên này.';
}
async function init() {
    ready = false;
    status.textContent = 'Đang tải...';
    retry.hidden = true;
    setBusy(true);
    try {
        books = await loadBooks();
        renderGenres(genreFilter, books);
        const select = form.elements.namedItem('genre');
        const genres = new Set(['Văn học', 'Khoa học', 'Kỹ năng', ...books.map(book => book.genre)]);
        select.replaceChildren(new Option('Chọn thể loại', ''));
        for (const genre of genres)
            select.add(new Option(genre, genre));
        ready = true;
        render();
    }
    catch (error) {
        status.textContent = error instanceof Error ? error.message : 'Có lỗi khi tải sách. Vui lòng thử lại.';
        retry.hidden = false;
    }
    finally {
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
    if (!(event.target instanceof Element))
        return;
    const button = event.target.closest('button[data-title]');
    if (!button)
        return;
    search.value = button.dataset.title || '';
    genreFilter.value = '';
    favoritesOnly = false;
    render();
    document.querySelector('.catalog').scrollIntoView({ block: 'start' });
    search.focus({ preventScroll: true });
});
function confirmDelete(book) {
    document.querySelector('#delete-description').textContent = `Xóa sách “${book.title}” khỏi thư viện? ${usingMockApi ? 'Thao tác này sẽ xóa sách trên kho trực tuyến.' : 'Dữ liệu mẫu gốc sẽ được tải lại khi làm mới trang.'}`;
    dialog.returnValue = '';
    dialog.showModal();
    return new Promise(resolve => {
        dialog.addEventListener('close', () => resolve(dialog.returnValue === 'confirm'), { once: true });
    });
}
list.addEventListener('click', async (event) => {
    if (busy || !(event.target instanceof Element))
        return;
    const button = event.target.closest('button[data-action]');
    if (!button)
        return;
    const book = books.find(item => item.id === button.dataset.id);
    if (!book)
        return;
    notice.textContent = '';
    if (button.dataset.action === 'favorite') {
        if (favorites.has(book.id))
            favorites.delete(book.id);
        else
            favorites.add(book.id);
        persistFavorites();
        render();
        list.querySelectorAll('.favorite').forEach(item => {
            if (item.dataset.id === book.id)
                item.focus({ preventScroll: true });
        });
        return;
    }
    if (button.dataset.action !== 'delete' || !await confirmDelete(book))
        return;
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
    }
    catch (error) {
        notice.textContent = error instanceof Error ? error.message : 'Chưa xóa được sách. Vui lòng thử lại.';
    }
    finally {
        setBusy(false);
    }
});
function checkField(name) {
    const input = form.elements.namedItem(name);
    const error = validateField(name, input.value);
    document.querySelector(`#${name}-error`).textContent = error;
    input.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
}
for (const name of fields) {
    const input = form.elements.namedItem(name);
    input.addEventListener('input', () => checkField(name));
    input.addEventListener('change', () => checkField(name));
}
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!ready || busy)
        return;
    message.textContent = '';
    if (fields.map(checkField).includes(false)) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
    }
    const data = new FormData(form);
    const newBook = {
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
    }
    catch (error) {
        message.textContent = error instanceof Error ? error.message : 'Chưa thêm được sách. Vui lòng thử lại.';
    }
    finally {
        submit.textContent = 'Thêm vào kệ sách';
        setBusy(false);
    }
});
init();
