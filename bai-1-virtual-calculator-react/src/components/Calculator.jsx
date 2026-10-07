import React, { useState } from 'react'
import CalculatorButton from './CalculatorButton'
import CalculatorDisplay from './CalculatorDisplay'

const operatorSymbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' }

const calculate = (first, second, operator) => {
  if (operator === 'add') return first + second
  if (operator === 'subtract') return first - second
  if (operator === 'multiply') return first * second
  if (operator === 'divide') return second === 0 ? null : first / second
  return second
}

const formatValue = value => {
  if (!Number.isFinite(value)) return 'Lỗi'
  return Number.parseFloat(value.toPrecision(12)).toString()
}

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [expression, setExpression] = useState('')

  const inputDigit = digit => {
    setDisplay(current => waitingForOperand || current === '0' || current === 'Lỗi' ? digit : current + digit)
    setWaitingForOperand(false)
  }

  const inputDecimal = () => {
    if (waitingForOperand || display === 'Lỗi') {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (!display.includes('.')) setDisplay(current => `${current}.`)
  }

  const clear = () => {
    setDisplay('0')
    setStoredValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setExpression('')
  }

  const removeLast = () => {
    if (waitingForOperand || display === 'Lỗi') return
    setDisplay(current => current.length > 1 ? current.slice(0, -1) : '0')
  }

  const toggleSign = () => setDisplay(current => current === '0' || current === 'Lỗi' ? current : current.startsWith('-') ? current.slice(1) : `-${current}`)
  const percentage = () => setDisplay(current => current === 'Lỗi' ? current : formatValue(Number(current) / 100))

  const chooseOperator = nextOperator => {
    const inputValue = Number(display)
    if (display === 'Lỗi') return clear()
    if (operator && !waitingForOperand) {
      const result = calculate(storedValue, inputValue, operator)
      if (result === null) {
        setDisplay('Lỗi')
        setExpression('Không thể chia cho 0')
        setStoredValue(null)
        setOperator(null)
        setWaitingForOperand(true)
        return
      }
      const formatted = formatValue(result)
      setDisplay(formatted)
      setStoredValue(result)
      setExpression(`${formatted} ${operatorSymbols[nextOperator]}`)
    } else {
      setStoredValue(inputValue)
      setExpression(`${display} ${operatorSymbols[nextOperator]}`)
    }
    setOperator(nextOperator)
    setWaitingForOperand(true)
  }

  const equals = () => {
    if (!operator || storedValue === null || waitingForOperand) return
    const inputValue = Number(display)
    const result = calculate(storedValue, inputValue, operator)
    if (result === null) {
      setDisplay('Lỗi')
      setExpression('Không thể chia cho 0')
    } else {
      setExpression(`${formatValue(storedValue)} ${operatorSymbols[operator]} ${display} =`)
      setDisplay(formatValue(result))
    }
    setStoredValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  const buttons = [
    { label: 'C', action: clear, variant: 'utility', ariaLabel: 'Xóa tất cả' },
    { label: 'DEL', action: removeLast, variant: 'utility', ariaLabel: 'Xóa ký tự cuối' },
    { label: '%', action: percentage, variant: 'utility', ariaLabel: 'Phần trăm' },
    { label: '÷', action: () => chooseOperator('divide'), variant: 'operator', ariaLabel: 'Chia' },
    { label: '7', action: () => inputDigit('7') }, { label: '8', action: () => inputDigit('8') }, { label: '9', action: () => inputDigit('9') },
    { label: '×', action: () => chooseOperator('multiply'), variant: 'operator', ariaLabel: 'Nhân' },
    { label: '4', action: () => inputDigit('4') }, { label: '5', action: () => inputDigit('5') }, { label: '6', action: () => inputDigit('6') },
    { label: '−', action: () => chooseOperator('subtract'), variant: 'operator', ariaLabel: 'Trừ' },
    { label: '1', action: () => inputDigit('1') }, { label: '2', action: () => inputDigit('2') }, { label: '3', action: () => inputDigit('3') },
    { label: '+', action: () => chooseOperator('add'), variant: 'operator', ariaLabel: 'Cộng' },
    { label: '±', action: toggleSign, variant: 'utility', ariaLabel: 'Đổi dấu' }, { label: '0', action: () => inputDigit('0') },
    { label: '.', action: inputDecimal, ariaLabel: 'Dấu thập phân' }, { label: '=', action: equals, variant: 'equals', ariaLabel: 'Bằng' },
  ]

  return (
    <section className="calculator-page shell" aria-labelledby="calculator-title">
      <div className="calculator-intro">
        <p className="eyebrow">Bài 01 · React state & props</p>
        <h1 id="calculator-title">Virtual<br /><span>Calculator.</span></h1>
        <p>Máy tính được xây từ component <code>Display</code> và <code>Button</code>. State lưu số hiện tại, toán tử và kết quả trung gian.</p>
        <div className="feature-list"><span>+ Cộng</span><span>− Trừ</span><span>× Nhân</span><span>÷ Chia</span><span>C Xóa</span><span>= Kết quả</span></div>
      </div>
      <div className="calculator-shell">
        <CalculatorDisplay expression={expression} value={display} />
        <div className="calculator-grid">
          {buttons.map((button, index) => <CalculatorButton key={`${button.label}-${index}`} label={button.label} onClick={button.action} variant={button.variant} ariaLabel={button.ariaLabel} />)}
        </div>
      </div>
    </section>
  )
}

export default Calculator
