import React from 'react'

function Hero({ onExplore }) {
  return (
    <section className="cv-hero shell" aria-labelledby="cv-title">
      <div className="hero-copy">
        <p className="eyebrow">CV React · B25DCTV060</p>
        <h1 id="cv-title">Biến kiến thức thành <span>trải nghiệm dễ hiểu.</span></h1>
        <p className="hero-lede">Tôi là Trần Thế Phong — làm việc độc lập ở giao điểm của giáo dục, nội dung số, phát triển web và nghiên cứu AI.</p>
        <button className="primary-button" type="button" onClick={onExplore}>Xem dự án</button>
      </div>
      <aside className="profile-card" aria-label="Bốn lĩnh vực hoạt động">
        <div className="profile-orbit"><span>02</span></div>
        <div className="profile-roles">
          <p><strong>Gia sư</strong><span>Học rõ bản chất</span></p>
          <p><strong>Sáng tạo nội dung</strong><span>Kể chuyện có mục tiêu</span></p>
          <p><strong>Web giáo dục</strong><span>Học qua tương tác</span></p>
          <p><strong>Nghiên cứu AI</strong><span>Thử nghiệm thực tế</span></p>
        </div>
      </aside>
    </section>
  )
}

export default Hero
