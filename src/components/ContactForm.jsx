import React, { useState } from 'react'

const initialForm = { name: '', email: '', topic: '', message: '', consent: false }

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const updateField = event => {
    const { name, value, checked, type } = event.target
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Vui lòng nhập ít nhất 2 ký tự.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) nextErrors.email = 'Email chưa đúng định dạng.'
    if (!form.topic) nextErrors.topic = 'Vui lòng chọn một chủ đề.'
    if (form.message.trim().length < 20) nextErrors.message = 'Nội dung cần ít nhất 20 ký tự.'
    if (!form.consent) nextErrors.consent = 'Vui lòng xác nhận điều kiện của biểu mẫu demo.'
    setErrors(nextErrors)
    setStatus(Object.keys(nextErrors).length ? 'Vui lòng kiểm tra lại các trường được đánh dấu.' : 'Nội dung hợp lệ. Đây là bản demo nên thông tin chưa được gửi đi.')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-row">
        <label>Họ và tên *<input name="name" value={form.name} onChange={updateField} placeholder="Tên của bạn" />{errors.name && <small>{errors.name}</small>}</label>
        <label>Email *<input name="email" type="email" value={form.email} onChange={updateField} placeholder="ban@example.com" />{errors.email && <small>{errors.email}</small>}</label>
      </div>
      <label>Chủ đề *<select name="topic" value={form.topic} onChange={updateField}><option value="">Chọn một chủ đề</option><option>Gia sư</option><option>Sản xuất nội dung</option><option>Web giáo dục</option><option>Nghiên cứu AI</option></select>{errors.topic && <small>{errors.topic}</small>}</label>
      <label>Nội dung * <span>{form.message.length}/500</span><textarea name="message" rows="5" maxLength="500" value={form.message} onChange={updateField} placeholder="Mục tiêu, đối tượng và kết quả bạn mong muốn..." />{errors.message && <small>{errors.message}</small>}</label>
      <label className="consent"><input name="consent" type="checkbox" checked={form.consent} onChange={updateField} /><span>Tôi hiểu đây là biểu mẫu minh họa và dữ liệu không được gửi đi.</span></label>
      {errors.consent && <small>{errors.consent}</small>}
      <button className="primary-button" type="submit">Kiểm tra nội dung</button>
      <p className={status.startsWith('Nội dung hợp lệ') ? 'form-status success' : 'form-status'} aria-live="polite">{status}</p>
    </form>
  )
}

export default ContactForm
