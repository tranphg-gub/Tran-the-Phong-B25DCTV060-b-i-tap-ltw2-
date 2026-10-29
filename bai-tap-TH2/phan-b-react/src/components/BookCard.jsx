import React from 'react';

export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card" data-genre={book.genre}>
      <div className="book-cover" aria-hidden="true"><span className="cover-label">TỦ SÁCH GÓC ĐỌC</span><strong>{book.title}</strong><small>{book.author}</small></div>
      <div className="book-content">
        <span className="genre-tag">{book.genre}</span>
        <h3>{book.title}</h3>
        <p className="book-meta">Tác giả: {book.author}</p>
        <p className="book-meta">Năm xuất bản: {book.year}</p>
        <div className="card-actions"><button className="favorite" aria-pressed={isFavorite} aria-label={`${isFavorite ? 'Đã yêu thích' : 'Yêu thích'}: ${book.title}`} onClick={() => onToggleFavorite(book.id)}>{isFavorite ? 'Đã yêu thích' : 'Yêu thích'}</button></div>
      </div>
    </article>
  );
}
