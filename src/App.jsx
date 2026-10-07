import { useEffect, useState } from 'react'
import CVPage from './components/CVPage'

function AppHeader({ activeView, onChangeView, theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="shell header-inner">
        <button className="brand" type="button" onClick={() => onChangeView('calculator')} aria-label="Về trang máy tính">
          <span>S</span><strong>SEPP</strong>
        </button>
        <nav className="view-switcher" aria-label="Chọn bài tập">
          <button className={activeView === 'calculator' ? 'active' : ''} type="button" onClick={() => onChangeView('calculator')}>01 · Máy tính</button>
          <button className={activeView === 'cv' ? 'active' : ''} type="button" onClick={() => onChangeView('cv')}>02 · CV React</button>
        </nav>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}>
          {theme === 'dark' ? '☀' : '◐'}
        </button>
      </div>
    </header>
  )
}

function App() {
  const [activeView, setActiveView] = useState('calculator')
  const [theme, setTheme] = useState(() => localStorage.getItem('sepp-theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sepp-theme', theme)
  }, [theme])

  return (
    <>
      <AppHeader activeView={activeView} onChangeView={setActiveView} theme={theme} onToggleTheme={() => setTheme(value => value === 'dark' ? 'light' : 'dark')} />
      <main>
        {activeView === 'cv' ? <CVPage /> : (
          <section className="placeholder shell" aria-labelledby="page-title">
            <p className="eyebrow">Bài tập React · B25DCTV060</p>
            <h1 id="page-title">Virtual Calculator</h1>
            <p>Máy tính tương tác sẽ xuất hiện ở đây.</p>
          </section>
        )}
      </main>
    </>
  )
}

export default App
