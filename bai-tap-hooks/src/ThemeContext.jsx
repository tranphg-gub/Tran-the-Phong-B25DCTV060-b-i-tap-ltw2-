import React, { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext(null)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('student-theme') === 'dark' ? 'dark' : 'light')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('student-theme', theme) }, [theme])
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
