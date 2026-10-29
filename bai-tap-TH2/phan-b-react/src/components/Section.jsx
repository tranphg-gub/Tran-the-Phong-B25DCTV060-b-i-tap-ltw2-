import React from 'react';

export default function Section({ id, title, eyebrow, children }) {
  return (
    <section className="catalog" aria-labelledby={id}>
      <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div></div>
      {children}
    </section>
  );
}
