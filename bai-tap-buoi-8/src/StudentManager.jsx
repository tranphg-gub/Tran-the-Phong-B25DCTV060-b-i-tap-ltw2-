import React from 'react'
const blank = { name: '', studentCode: '', gpa: '' }
export default class StudentManager extends React.Component {
  state = { students: [], form: { ...blank }, editing: null, query: '', error: '' }
  nextId = 1
  change = e => { const { name, value } = e.target; this.setState(previous => ({ form: { ...previous.form, [name]: value }, error: '' })) }
  save = e => {
    e.preventDefault()
    const name = this.state.form.name.trim()
    const studentCode = this.state.form.studentCode.trim()
    const raw = String(this.state.form.gpa).trim()
    const gpa = Number(raw)
    if (!name || !studentCode || !raw || !Number.isFinite(gpa) || gpa < 0 || gpa > 4) { this.setState({ error: 'Nhập đầy đủ mã, tên và GPA là số từ 0 đến 4.' }); return }
    if (this.state.students.some(s => s.id !== this.state.editing && s.studentCode.toLowerCase() === studentCode.toLowerCase())) { this.setState({ error: 'Mã sinh viên đã tồn tại.' }); return }
    const id = this.state.editing ?? this.nextId++
    this.setState(previous => ({ students: previous.editing === null ? [...previous.students, { id, name, studentCode, gpa }] : previous.students.map(s => s.id === previous.editing ? { id, name, studentCode, gpa } : s), form: { ...blank }, editing: null, error: '' }))
  }
  remove = student => {
    if (!window.confirm(`Xóa sinh viên ${student.name}?`)) return
    this.setState(previous => ({ students: previous.students.filter(s => s.id !== student.id), ...(previous.editing === student.id ? { editing: null, form: { ...blank }, error: '' } : {}) }))
  }
  render() {
    const { students, form, editing, query, error } = this.state
    const rows = students.filter(s => s.name.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi')))
    return <section><h2>Quản lý sinh viên bằng Class</h2><div className="layout"><form onSubmit={this.save}><h3>{editing === null ? 'Thêm sinh viên' : 'Sửa sinh viên'}</h3><label>Mã sinh viên<input name="studentCode" required maxLength={40} value={form.studentCode} onChange={this.change}/></label><label>Họ và tên<input name="name" required maxLength={150} value={form.name} onChange={this.change}/></label><label>GPA (0 đến 4)<input name="gpa" type="number" min="0" max="4" step="any" required value={form.gpa} onChange={this.change}/></label>{error && <p role="alert">{error}</p>}<button type="submit">{editing === null ? 'Thêm' : 'Lưu'}</button><button type="button" onClick={() => this.setState({ form: { ...blank }, editing: null, error: '' })}>Hủy</button></form><div><label>Tìm theo tên<input value={query} onChange={e => this.setState({ query: e.target.value })}/></label><p>Tổng số: {students.length} | Kết quả: {rows.length}</p><div className="table"><table><thead><tr><th>Mã</th><th>Họ và tên</th><th>GPA</th><th>Thao tác</th></tr></thead><tbody>{rows.map(s => <tr key={s.id}><td>{s.studentCode}</td><td>{s.name}</td><td>{s.gpa}</td><td><button onClick={() => this.setState({ editing: s.id, form: { name: s.name, studentCode: s.studentCode, gpa: String(s.gpa) }, error: '' })}>Sửa</button><button onClick={() => this.remove(s)}>Xóa</button></td></tr>)}</tbody></table></div>{!rows.length && <p>Không có sinh viên phù hợp.</p>}</div></div></section>
  }
}
