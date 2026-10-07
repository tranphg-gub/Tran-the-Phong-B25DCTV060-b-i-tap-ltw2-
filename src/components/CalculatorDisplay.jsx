function CalculatorDisplay({ expression, value }) {
  return (
    <div className="calculator-display" aria-live="polite" aria-atomic="true">
      <span>{expression || 'Sẵn sàng tính toán'}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default CalculatorDisplay
