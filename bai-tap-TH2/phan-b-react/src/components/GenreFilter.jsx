import React from 'react';

export default function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-buttons" role="group" aria-label="Lọc theo thể loại">
      <button aria-pressed={selectedGenre === ''} onClick={() => onSelectGenre('')}>Tất cả thể loại</button>
      {genres.map(genre => <button key={genre} aria-pressed={selectedGenre === genre} onClick={() => onSelectGenre(genre)}>{genre}</button>)}
    </div>
  );
}
