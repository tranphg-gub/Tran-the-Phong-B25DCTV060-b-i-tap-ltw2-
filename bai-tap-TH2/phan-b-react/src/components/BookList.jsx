import React from 'react';
import BookCard from './BookCard.jsx';

export default function BookList({ books, favorites, onToggleFavorite }) {
  return (
    <div className="book-list">
      {books.length === 0 && <p className="empty">Không có sách phù hợp. Hãy thử tên khác hoặc xóa bộ lọc.</p>}
      {books.map(book => <BookCard key={book.id} book={book} isFavorite={favorites.includes(book.id)} onToggleFavorite={onToggleFavorite} />)}
    </div>
  );
}
