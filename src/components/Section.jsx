function Section({ number, label, title, className = '', children }) {
  return (
    <section className={`cv-section ${className}`}>
      <div className="shell section-layout">
        <p className="section-kicker"><span>{number}</span>{label}</p>
        <div className="section-content">
          {title && <h2>{title}</h2>}
          {children}
        </div>
      </div>
    </section>
  )
}

export default Section
