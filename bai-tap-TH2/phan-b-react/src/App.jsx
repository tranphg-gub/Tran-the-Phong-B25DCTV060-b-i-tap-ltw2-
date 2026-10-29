import React, { useState } from 'react';
import { books } from './books.js';
import Header from './components/Header.jsx';
import Section from './components/Section.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import BookList from './components/BookList.jsx';
import Footer from './components/Footer.jsx';

function normalizeText(text) {
  return text.trim().toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function readFavorites() {
  try {
    const data = JSON.parse(localStorage.getItem('thu-vien-react-favorites') || '[]');
    return Array.isArray(data) ? data.filter(id => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

let initialDark = false;
try { initialDark = localStorage.getItem('thu-vien-react-theme') === 'dark'; } catch {}
document.documentElement.dataset.theme = initialDark ? 'dark' : 'light';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [favorites, setFavorites] = useState(readFavorites);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [dark, setDark] = useState(initialDark);
  const [notice, setNotice] = useState('');
  const genres = [...new Set(books.map(book => book.genre))];
  const visibleBooks = books.filter(book => normalizeText(book.title).includes(normalizeText(search))
    && (!selectedGenre || book.genre === selectedGenre)
    && (!favoritesOnly || favorites.includes(book.id)));
  const favoriteCount = books.filter(book => favorites.includes(book.id)).length;

  function toggleFavorite(id) {
    const next = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    setFavorites(next);
    setNotice('');
    try {
      localStorage.setItem('thu-vien-react-favorites', JSON.stringify(next));
    } catch {
      setNotice('Trình duyệt không cho lưu yêu thích. Thay đổi chỉ có hiệu lực trong phiên này.');
    }
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('thu-vien-react-theme', next ? 'dark' : 'light'); } catch {}
  }

  function clearFilters() {
    setSearch('');
    setSelectedGenre('');
    setFavoritesOnly(false);
  }

  function selectFeatured(title) {
    setSearch(title);
    setSelectedGenre('');
    setFavoritesOnly(false);
    document.querySelector('.catalog').scrollIntoView({ block: 'start' });
    document.getElementById('search').focus({ preventScroll: true });
  }

  return (
    <>
      <Header favoriteCount={favoriteCount} favoritesOnly={favoritesOnly} onFilterFavorites={() => setFavoritesOnly(!favoritesOnly)} dark={dark} onToggleTheme={toggleTheme} />
      <main id="main" className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy"><p className="eyebrow">MỞ MỘT CUỐN SÁCH, MỞ THÊM MỘT THẾ GIỚI</p><h1 id="hero-title">Hôm nay, bạn<br />muốn đọc gì?</h1><p>Từ những câu chuyện tuổi thơ đến những điều kỳ thú của khoa học. Một cuốn sách hay luôn đang chờ bạn.</p><div className="hero-stats"><span><strong>{books.length}</strong> cuốn sách</span><span><strong>{genres.length}</strong> thể loại</span><span>Tủ sách lớp học</span></div></div>
          <aside className="featured-shelf" aria-labelledby="featured-heading"><h2 id="featured-heading">Gợi ý trên kệ</h2><p>Chọn một cuốn để tìm nhanh</p><div className="featured-books">{books.slice(0, 3).map(book => <button key={book.id} className="featured-book" onClick={() => selectFeatured(book.title)} aria-label={`Tìm sách ${book.title}`}><span>{book.genre}</span><strong>{book.title}</strong><small>{book.author}</small></button>)}</div></aside>
        </section>
        <Section id="list-heading" eyebrow="KHÁM PHÁ THƯ VIỆN" title="Kệ sách của bạn">
          <div className="toolbar"><div className="search-field"><label htmlFor="search">Bạn đang tìm cuốn sách nào?</label><input id="search" type="search" placeholder="Nhập tên sách, ví dụ: Mat biec" value={search} onChange={event => setSearch(event.target.value)} aria-describedby="search-hint" /><small id="search-hint">Tìm ngay khi gõ, có dấu hoặc không dấu đều được.</small><GenreFilter genres={genres} selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} /></div></div>
          <div className="results-row"><p className="status" role="status" aria-live="polite">Đang hiển thị {visibleBooks.length} / {books.length} cuốn</p>{(search || selectedGenre || favoritesOnly) && <button className="text-button" onClick={clearFilters}>Xóa bộ lọc</button>}</div>
          {notice && <p className="notice" role="status">{notice}</p>}
          <BookList books={visibleBooks} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
