import React, { useEffect, useState } from 'react'
import Calculator from './components/Calculator'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('calculator-theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('calculator-theme', theme)
  }, [theme])

  return (
    <>
      <header className="app-header">
        <div className="shell header-inner">
          <div className="brand" aria-label="Bài 1 Virtual Calculator">
            <span>1</span><strong>VIRTUAL CALCULATOR</strong>
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
      <main><Calculator /></main>
    </>
  )
}

export default App
