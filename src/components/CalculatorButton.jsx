import React from 'react'

function CalculatorButton({ label, onClick, variant = 'number', span = 1, ariaLabel }) {
  return (
    <button
      className={`calculator-button ${variant}`}
      style={{ gridColumn: `span ${span}` }}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  )
}

export default CalculatorButton
