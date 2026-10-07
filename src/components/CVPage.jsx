import React from 'react'
import ContactForm from './ContactForm'
import Hero from './Hero'
import ProjectList from './ProjectList'
import Section from './Section'
import SkillGrid from './SkillGrid'
import { filters, projects, skills } from '../data/portfolio'

function CVPage() {
  const goToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="cv-page">
      <Hero onExplore={goToProjects} />
      <Section number="01" label="Giới thiệu" title={<>Tôi xây những thứ giúp người khác <span>hiểu nhanh hơn</span> và làm tốt hơn.</>}>
        <div className="about-columns">
          <p>Tôi theo đuổi cách làm việc gọn, có căn cứ và có thể kiểm chứng. Mỗi sản phẩm đều bắt đầu từ điều người dùng thực sự cần hiểu hoặc làm được.</p>
          <p>Làm việc độc lập giúp tôi kết nối tư duy sư phạm, kể chuyện trực quan và công nghệ thành một quy trình thống nhất.</p>
        </div>
      </Section>
      <Section number="02" label="Kỹ năng" title={<>Năng lực đa lĩnh vực, <span>một hướng tiếp cận nhất quán.</span></>} className="skills-section">
        <SkillGrid items={skills} />
      </Section>
      <div id="projects">
        <Section number="03" label="Dự án" title={<>Một số hướng dự án <span>tôi đang phát triển.</span></>}>
          <ProjectList items={projects} filters={filters} />
        </Section>
      </div>
      <Section number="04" label="Liên hệ" title={<>Có một ý tưởng <span>đáng để cùng làm?</span></>} className="contact-section">
        <div className="contact-grid">
          <div><p>Hãy mô tả ngắn mục tiêu và kết quả tôi có thể hỗ trợ. Biểu mẫu chỉ kiểm tra dữ liệu trên trình duyệt.</p><p className="availability"><i />Sẵn sàng trao đổi</p></div>
          <ContactForm />
        </div>
      </Section>
      <footer><div className="shell footer-inner"><strong>SEPP</strong><span>© {new Date().getFullYear()} Trần Thế Phong</span><span>React · B25DCTV060</span></div></footer>
    </div>
  )
}

export default CVPage
