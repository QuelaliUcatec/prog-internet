// ============================================================
// Display.ts — Pantalla de la calculadora
// React.createElement() puro — sin JSX ni .tsx
// ============================================================

import React from 'react'
import './Display.css'
import type { CalculatorState } from '../hooks/useCalculator'

const ce = React.createElement

interface DisplayProps {
  state: Pick<CalculatorState, 'display' | 'history' | 'expression' | 'memory' | 'hasError' | 'angleMode'>
}

// Arrow Function: ajusta tamaño de fuente según longitud del texto
const getFontSize = (text: string): string => {
  if (text.length > 18) return '1.1rem'
  if (text.length > 12) return '1.6rem'
  if (text.length > 8)  return '2rem'
  return '2.6rem'
}

// Componente Display — Arrow Function con React.createElement
const Display: React.FC<DisplayProps> = ({ state }) => {
  const { display, history, expression, memory, hasError, angleMode } = state

  return ce('div', { className: 'display' },
    // Barra de estado: modo ángulo + memoria
    ce('div', { className: 'display__status-bar' },
      ce('span', { className: `status-badge ${angleMode}` }, angleMode.toUpperCase()),
      // if: hay valor en memoria → muestra badge; else → null
      memory !== 0
        ? ce('span', { className: 'status-badge memory' }, `M: ${memory}`)
        : null
    ),
    // Historial de la operación anterior
    ce('div', { className: 'display__history' }, history || '\u00A0'),
    // Expresión en curso
    ce('div', { className: 'display__expression' }, expression || '\u00A0'),
    // Número principal
    // if: error → clase roja; else → clase normal
    ce('div', {
      className: hasError ? 'display__main display__main--error' : 'display__main',
      style: { fontSize: getFontSize(display) },
    }, display)
  )
}

export default Display
