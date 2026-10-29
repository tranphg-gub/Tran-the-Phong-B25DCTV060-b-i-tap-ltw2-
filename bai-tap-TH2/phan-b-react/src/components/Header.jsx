import React from 'react';

export default function Header({ favoriteCount, favoritesOnly, onFilterFavorites, dark, onToggleTheme }) {
  return (
    <>
      <a className="skip-link" href="#main">Bỏ qua đến nội dung</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="./index.html"><span className="brand-mark" aria-hidden="true">GĐ</span><span>Góc Đọc<small>THƯ VIỆN LỚP HỌC</small></span></a>
          <div className="header-actions">
            <button className="favorites-filter" aria-pressed={favoritesOnly} onClick={onFilterFavorites}>Sách yêu thích <span className="count">{favoriteCount}</span></button>
            <button className="theme-toggle" aria-pressed={dark} onClick={onToggleTheme}>{dark ? 'Chế độ sáng' : 'Chế độ tối'}</button>
          </div>
        </div>
      </header>

    </>
  );
}
