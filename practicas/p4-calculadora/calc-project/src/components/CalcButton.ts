// ============================================================
// CalcButton.ts — Botón reutilizable de la calculadora
// React.createElement() puro — sin JSX ni .tsx
// ============================================================

import React from 'react'
import './CalcButton.css'

const ce = React.createElement

export type ButtonVariant = 'number' | 'operator' | 'function' | 'action' | 'equals' | 'memory' | 'mode'

interface CalcButtonProps {
  label: string
  value: string
  variant?: ButtonVariant
  wide?: boolean
  onClick: (value: string) => void
}

// Componente CalcButton — Arrow Function con React.createElement
const CalcButton: React.FC<CalcButtonProps> = ({ label, value, variant = 'number', wide = false, onClick }) => {
  // Arrow Function → handler del click
  const handleClick = (): void => onClick(value)

  const className = ['calc-btn', `calc-btn--${variant}`, wide ? 'calc-btn--wide' : '']
    .filter(Boolean)
    .join(' ')

  return ce('button', { className, onClick: handleClick, 'aria-label': label }, label)
}

export default CalcButton
