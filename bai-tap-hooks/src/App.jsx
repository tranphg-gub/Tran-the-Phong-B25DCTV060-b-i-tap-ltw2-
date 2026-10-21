import { useMemo, useState } from 'react'
import useFetch from './useFetch'
import { ThemeProvider, useTheme } from './ThemeContext'
const empty = { studentCode: '', name: '', email: '', className: '' }
function Students() {
  const { theme, toggleTheme } = useTheme()
  const [url, setUrl] = useState(localStorage.getItem('student-api') || '')
  const [draftUrl, setDraftUrl] = useState(url)
  const { data, loading, error, reload } = useFetch(url)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const rows = useMemo(() => data.filter(s => [s.name, s.studentCode, s.email, s.className].some(v => String(v || '').toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')))), [data, query])
  function connect(e) {
    e.preventDefault()
    try {
      const parsed = new URL(draftUrl.trim())
      if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.mockapi.io')) throw new Error()
      const next = parsed.href.replace(/\/$/, '')
      localStorage.setItem('student-api', next); setUrl(next); setForm(empty); setEditId(null); setMessage(''); reload()
    } catch { setMessage('Nhập URL HTTPS của resource trên MockAPI, ví dụ https://<project>.mockapi.io/students') }
  }
  async function mutate(method, id, body) {
    setBusy(true); setMessage('')
    try {
      const response = await fetch(id == null ? url : `${url}/${encodeURIComponent(id)}`, { method, headers: { 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) })
      if (!response.ok) throw new Error(`Thao tác thất bại (${response.status})`)
      setMessage('Đã lưu thay đổi.'); setForm(empty); setEditId(null); reload()
    } catch (e) { setMessage(e.message) } finally { setBusy(false) }
  }
  function save(e) {
    e.preventDefault()
    const cleaned = Object.fromEntries(Object.entries(form).map(([k,v]) => [k, v.trim()]))
    if (Object.values(cleaned).some(v => !v)) { setMessage('Vui lòng điền đầy đủ thông tin.'); return }
    if (data.some(s => String(s.id) !== String(editId) && String(s.studentCode).toLowerCase() === cleaned.studentCode.toLowerCase())) { setMessage('Mã sinh viên đã tồn tại.'); return }
    mutate(editId == null ? 'POST' : 'PUT', editId, cleaned)
  }
  return <main><header><div><p>BÀI TẬP REACT HOOKS</p><h1>Quản lý sinh viên</h1></div><button onClick={toggleTheme}>Chế độ {theme === 'light' ? 'tối' : 'sáng'}</button></header>
    <section><h2>Kết nối dữ liệu</h2><form onSubmit={connect} className="connection"><label>URL resource MockAPI<input type="url" required value={draftUrl} onChange={e => setDraftUrl(e.target.value)} placeholder="https://project.mockapi.io/students" /></label><button disabled={busy || loading}>Kết nối</button></form></section>
    <div className="layout"><section><h2>{editId == null ? 'Thêm sinh viên' : 'Sửa sinh viên'}</h2><form onSubmit={save}><fieldset disabled={!url || busy || loading}>{[['studentCode','Mã sinh viên'],['name','Họ và tên'],['email','Email'],['className','Lớp']].map(([key,label]) => <label key={key}>{label}<input required maxLength={150} type={key === 'email' ? 'email' : 'text'} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} /></label>)}<button>{busy ? 'Đang lưu...' : editId == null ? 'Thêm sinh viên' : 'Lưu thay đổi'}</button><button type="button" onClick={() => { setForm(empty); setEditId(null) }}>Hủy</button></fieldset></form></section>
    <section><h2>Danh sách sinh viên ({rows.length})</h2><label>Tìm theo mã, tên, email hoặc lớp<input value={query} onChange={e => setQuery(e.target.value)} /></label><button disabled={!url || loading || busy} onClick={reload}>Tải lại</button>{loading && <p role="status">Đang tải dữ liệu...</p>}{error && <p role="alert">{error}</p>}{!url && <p>Nhập URL MockAPI để bắt đầu.</p>}<div className="table"><table><thead><tr>{['Mã sinh viên','Họ và tên','Email','Lớp','Thao tác'].map(t => <th key={t}>{t}</th>)}</tr></thead><tbody>{rows.map(s => <tr key={s.id}><td>{s.studentCode}</td><td>{s.name}</td><td>{s.email}</td><td>{s.className}</td><td><button disabled={busy || loading} onClick={() => { setEditId(s.id); setForm(Object.fromEntries(Object.keys(empty).map(k => [k,String(s[k] || '')]))) }}>Sửa</button><button disabled={busy || loading} onClick={() => { if (confirm(`Xóa sinh viên ${s.name}?`)) mutate('DELETE', s.id) }}>Xóa</button></td></tr>)}</tbody></table></div>{url && !loading && !error && !rows.length && <p>Không có sinh viên phù hợp.</p>}</section></div><p role="status">{message}</p></main>
}
export default function App() { return <ThemeProvider><Students /></ThemeProvider> }
