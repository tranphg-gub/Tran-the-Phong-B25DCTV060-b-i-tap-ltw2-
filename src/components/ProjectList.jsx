import React, { useMemo, useState } from 'react'

function ProjectList({ items, filters }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi')
    return items.filter(project => {
      const matchesFilter = activeFilter === 'all' || project.categories.includes(activeFilter)
      const searchText = `${project.title} ${project.description} ${project.label}`.toLocaleLowerCase('vi')
      return matchesFilter && (!normalizedQuery || searchText.includes(normalizedQuery))
    })
  }, [activeFilter, items, query])

  return (
    <>
      <div className="project-tools">
        <label className="project-search">
          <span className="sr-only">Tìm dự án</span>
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Tìm theo từ khóa..." />
          <span aria-hidden="true">⌕</span>
        </label>
        <div className="filters" aria-label="Lọc dự án">
          {filters.map(filter => (
            <button className={activeFilter === filter.value ? 'active' : ''} key={filter.value} type="button" onClick={() => setActiveFilter(filter.value)}>{filter.label}</button>
          ))}
        </div>
      </div>
      <div className="project-list">
        {visibleProjects.map(project => (
          <article className="project-item" key={project.id}>
            <span className="project-number">{String(project.id).padStart(2, '0')}</span>
            <div><p className="project-label">{project.label}</p><h3>{project.title}</h3><p>{project.description}</p></div>
            <strong className="project-code">{project.code}</strong>
          </article>
        ))}
      </div>
      {!visibleProjects.length && <p className="empty-state">Chưa có dự án phù hợp. Hãy thử từ khóa khác.</p>}
      <p className="disclaimer">Nội dung dự án là mô tả định hướng mẫu, chưa phải hồ sơ thành tích đã xác minh.</p>
    </>
  )
}

export default ProjectList
