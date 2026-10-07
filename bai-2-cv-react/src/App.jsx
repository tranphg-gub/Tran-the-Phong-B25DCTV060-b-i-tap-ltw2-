import React, { useEffect, useState } from 'react'
import CVPage from './components/CVPage'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('cv-theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('cv-theme', theme)
  }, [theme])

  return (
    <>
      <header className="app-header">
        <div className="shell header-inner">
          <div className="brand" aria-label="Bài 2 CV React">
            <span>2</span><strong>CV REACT</strong>
          </div>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
          >
            {theme === 'dark' ? '☀' : '◐'}
          </button>
        </div>
      </header>
      <main><CVPage /></main>
    </>
  )
}

export default App
