import type { Book } from './types.js';

export function renderFeatured(container: HTMLElement, books: Book[]): void {
  container.replaceChildren();
  for (const book of books.slice(0, 3)) {
    const button = document.createElement('button');
    button.className = 'featured-book';
    button.type = 'button';
    button.dataset.title = book.title;
    button.setAttribute('aria-label', `Tìm sách ${book.title}`);
    const genre = document.createElement('span');
    genre.textContent = book.genre;
    const title = document.createElement('strong');
    title.textContent = book.title;
    const author = document.createElement('small');
    author.textContent = book.author;
    button.append(genre, title, author);
    container.append(button);
  }
}

export function renderGenres(select: HTMLSelectElement, books: Book[]): void {
  const selected = select.value;
  select.replaceChildren(new Option('Tất cả thể loại', ''));
  const genres = new Set(books.map(book => book.genre));
  for (const genre of genres) {
    select.add(new Option(genre, genre));
  }
  if (genres.has(selected)) select.value = selected;
}

export function renderBooks(list: HTMLElement, books: Book[], favorites: Set<string>): void {
  list.replaceChildren();
  if (books.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'Không có sách phù hợp. Hãy thử tên khác hoặc xóa bộ lọc.';
    list.append(empty);
    return;
  }
  for (const book of books) {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.genre = book.genre;
    const cover = document.createElement('div');
    cover.className = 'book-cover';
    cover.setAttribute('aria-hidden', 'true');
    const coverLabel = document.createElement('span');
    coverLabel.className = 'cover-label';
    coverLabel.textContent = 'TỦ SÁCH GÓC ĐỌC';
    const coverTitle = document.createElement('strong');
    coverTitle.textContent = book.title;
    const coverAuthor = document.createElement('small');
    coverAuthor.textContent = book.author;
    cover.append(coverLabel, coverTitle, coverAuthor);
    const content = document.createElement('div');
    content.className = 'book-content';
    const tag = document.createElement('span');
    tag.className = 'genre-tag';
    tag.textContent = book.genre;
    const title = document.createElement('h3');
    title.textContent = book.title;
    const author = document.createElement('p');
    author.className = 'book-meta';
    author.textContent = `Tác giả: ${book.author}`;
    const year = document.createElement('p');
    year.className = 'book-meta';
    year.textContent = `Năm xuất bản: ${book.year}`;
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const favorite = document.createElement('button');
    favorite.type = 'button';
    favorite.className = 'favorite';
    favorite.dataset.action = 'favorite';
    favorite.dataset.id = book.id;
    favorite.textContent = favorites.has(book.id) ? 'Đã yêu thích' : 'Yêu thích';
    favorite.setAttribute('aria-pressed', String(favorites.has(book.id)));
    favorite.setAttribute('aria-label', `${favorite.textContent}: ${book.title}`);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete';
    remove.dataset.action = 'delete';
    remove.dataset.id = book.id;
    remove.textContent = 'Xóa';
    remove.setAttribute('aria-label', `Xóa: ${book.title}`);
    actions.append(favorite, remove);
    content.append(tag, title, author, year, actions);
    card.append(cover, content);
    list.append(card);
  }
}
