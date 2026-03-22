// ============================================================
// Calculator.ts — Componente principal de la calculadora
// React.createElement() puro — sin JSX ni .tsx
// ============================================================

import React, { useEffect, useCallback } from 'react'
import useCalculator from '../hooks/useCalculator'
import Display from './Display'
import CalcButton from './CalcButton'
import type { ButtonVariant } from './CalcButton'
import './Calculator.css'

const ce = React.createElement

interface ButtonDef {
  label: string
  value: string
  variant: ButtonVariant
  wide?: boolean
}

// ── Layout completo del teclado ──
const BUTTON_ROWS: ButtonDef[][] = [
  [
    { label: 'MC',  value: 'MC',  variant: 'memory' },
    { label: 'MR',  value: 'MR',  variant: 'memory' },
    { label: 'M+',  value: 'M+',  variant: 'memory' },
    { label: 'M−',  value: 'M-',  variant: 'memory' },
    { label: 'DEG', value: 'DEG', variant: 'mode' },
    { label: 'RAD', value: 'RAD', variant: 'mode' },
  ],
  [
    { label: 'sin', value: 'sin',  variant: 'function' },
    { label: 'cos', value: 'cos',  variant: 'function' },
    { label: 'tan', value: 'tan',  variant: 'function' },
    { label: 'log', value: 'log',  variant: 'function' },
    { label: 'ln',  value: 'ln',   variant: 'function' },
    { label: '√x',  value: 'sqrt', variant: 'function' },
  ],
  [
    { label: 'x²',  value: 'x²',  variant: 'function' },
    { label: 'x³',  value: 'x³',  variant: 'function' },
    { label: 'xʸ',  value: '^',   variant: 'function' },
    { label: '1/x', value: '1/x', variant: 'function' },
    { label: '|x|', value: 'abs', variant: 'function' },
    { label: 'x!',  value: 'x!',  variant: 'function' },
  ],
  [
    { label: 'π',   value: 'π',   variant: 'function' },
    { label: 'e',   value: 'e',   variant: 'function' },
    { label: '(',   value: '(',   variant: 'operator' },
    { label: ')',   value: ')',   variant: 'operator' },
    { label: '%',   value: '%',   variant: 'operator' },
    { label: '+/−', value: '+/-', variant: 'operator' },
  ],
  [
    { label: 'C',  value: 'C',  variant: 'action' },
    { label: 'CE', value: 'CE', variant: 'action' },
    { label: '⌫',  value: '⌫',  variant: 'action' },
    { label: '÷',  value: '/',  variant: 'operator' },
    { label: '7',  value: '7',  variant: 'number' },
    { label: '8',  value: '8',  variant: 'number' },
  ],
  [
    { label: '9', value: '9', variant: 'number' },
    { label: '×', value: '*', variant: 'operator' },
    { label: '4', value: '4', variant: 'number' },
    { label: '5', value: '5', variant: 'number' },
    { label: '6', value: '6', variant: 'number' },
    { label: '−', value: '-', variant: 'operator' },
  ],
  [
    { label: '1', value: '1', variant: 'number' },
    { label: '2', value: '2', variant: 'number' },
    { label: '3', value: '3', variant: 'number' },
    { label: '+', value: '+', variant: 'operator' },
    { label: '0', value: '0', variant: 'number', wide: true },
    { label: '.', value: '.', variant: 'number' },
  ],
]

// Mapa de teclas físicas
const KEY_MAP: Record<string, string> = {
  'Enter': '=', '=': '=', 'Backspace': '⌫', 'Escape': 'C',
  '+': '+', '-': '-', '*': '*', '/': '/',
  '.': '.', '%': '%', '(': '(', ')': ')',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
}

// Componente Calculator — Arrow Function con React.createElement
const Calculator: React.FC = () => {
  const { state, handleInput } = useCalculator()

  const handleKeyDown = useCallback((e: KeyboardEvent): void => {
    const mapped = KEY_MAP[e.key]
    if (mapped) { e.preventDefault(); handleInput(mapped) }
  }, [handleInput])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Construye filas de botones
  const buttonRows = BUTTON_ROWS.map((row, i) =>
    ce('div', { className: 'keyboard__row', key: `row-${i}` },
      ...row.map(btn =>
        ce(CalcButton, { key: btn.value + btn.label, label: btn.label, value: btn.value, variant: btn.variant, wide: btn.wide, onClick: handleInput })
      )
    )
  )

  return ce('div', { className: 'calculator' },
    // Cabecera
    ce('header', { className: 'calculator__header' },
      ce('div', { className: 'calculator__title-row' },
        ce('span', { className: 'calculator__icon' }, '⬡'),
        ce('h1', { className: 'calculator__title' },
          'SCI',
          ce('span', { className: 'calculator__title--accent' }, 'CALC')
        ),
        ce('span', { className: 'calculator__version' }, 'v1.0')
      ),
      ce('div', { className: 'calculator__subtitle' }, 'Calculadora Científica')
    ),
    // Pantalla
    ce(Display, { state }),
    // Teclado
    ce('div', { className: 'calculator__keyboard' },
      ...buttonRows,
      ce('div', { className: 'keyboard__row keyboard__row--equals' },
        ce(CalcButton, { label: '=', value: '=', variant: 'equals', onClick: handleInput })
      )
    ),
    // Footer
    ce('footer', { className: 'calculator__footer' },
      ce('span', null, 'Vite + React + TypeScript'),
      ce('span', null, '·'),
      ce('span', null, 'sin JSX · solo .ts')
    )
  )
}

export default Calculator
