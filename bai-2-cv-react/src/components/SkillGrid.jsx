import React from 'react'

function SkillCard({ skill, index }) {
  return (
    <article className="skill-card">
      <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="skill-icon" aria-hidden="true">{skill.icon}</div>
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <ul>{skill.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    </article>
  )
}

function SkillGrid({ items }) {
  return <div className="skill-grid">{items.map((skill, index) => <SkillCard key={skill.id} skill={skill} index={index} />)}</div>
}

export default SkillGrid
