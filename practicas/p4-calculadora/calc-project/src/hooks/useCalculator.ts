// ============================================================
// useCalculator.ts — Hook personalizado de la calculadora
//
// Conceptos aplicados:
//   useState       → gestión de estado
//   Arrow Function → todas las funciones son const fn = () => {}
//   eval()         → motor de cálculo de expresiones
//   try...catch    → manejo de errores
//   if / else      → concatenación y limpieza del display
// ============================================================

import { useState } from 'react'

// ---------- Tipo del estado ----------
export interface CalculatorState {
  display: string
  expression: string
  history: string
  memory: number
  isResult: boolean
  hasError: boolean
  angleMode: 'deg' | 'rad'
}

// ---------- Estado inicial ----------
const INITIAL_STATE: CalculatorState = {
  display: '0',
  expression: '',
  history: '',
  memory: 0,
  isResult: false,
  hasError: false,
  angleMode: 'deg',
}

// ============================================================
// Hook principal — Arrow Function
// ============================================================
const useCalculator = () => {
  // useState → declara y gestiona el estado completo
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE)

  // ── Convierte grados a radianes según el modo activo ──
  const toRad = (angle: number, mode: 'deg' | 'rad'): number =>
    mode === 'deg' ? (angle * Math.PI) / 180 : angle

  // ── Prepara la expresión para eval() sustituyendo funciones y constantes ──
  const prepareExpression = (expr: string, mode: 'deg' | 'rad'): string =>
    expr
      .replace(/sin\(([^)]+)\)/g, (_, a) => String(Math.sin(toRad(Number(a), mode))))
      .replace(/cos\(([^)]+)\)/g, (_, a) => String(Math.cos(toRad(Number(a), mode))))
      .replace(/tan\(([^)]+)\)/g, (_, a) => String(Math.tan(toRad(Number(a), mode))))
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g,  'Math.log(')
      .replace(/sqrt\(/g,'Math.sqrt(')
      .replace(/abs\(/g, 'Math.abs(')
      .replace(/π/g, String(Math.PI))
      .replace(/e(?!\d)/g, String(Math.E))
      .replace(/\^/g, '**')

  // ── Formatea el resultado eliminando imprecisiones de punto flotante ──
  const formatResult = (num: number): string => {
    // try...catch → captura errores inesperados de formateo
    try {
      if (!isFinite(num)) return 'Error: División por cero'
      if (isNaN(num))     return 'Error: Resultado inválido'
      return String(parseFloat(num.toPrecision(10)))
    } catch {
      return 'Error'
    }
  }

  // ============================================================
  // handleInput — Arrow Function central que procesa cada botón
  // ============================================================
  const handleInput = (value: string): void => {
    setState((prev: CalculatorState) => {

      // ── Si hay error: C reinicia todo, cualquier otra tecla limpia y continúa ──
      if (prev.hasError) {
        if (value === 'C') return INITIAL_STATE
        return { ...INITIAL_STATE, display: value, expression: value, isResult: false }
      }

      // ── LIMPIAR TODO (C) ──
      if (value === 'C') return INITIAL_STATE

      // ── LIMPIAR ENTRADA ACTUAL (CE) ──
      if (value === 'CE') {
        return { ...prev, display: '0', isResult: false, hasError: false }
      }

      // ── BORRAR ÚLTIMO CARÁCTER (⌫) ──
      if (value === '⌫') {
        if (prev.isResult) return { ...prev, display: '0', expression: '', isResult: false }
        const newDisplay = prev.display.length > 1 ? prev.display.slice(0, -1) : '0'
        return { ...prev, display: newDisplay }
      }

      // ── CAMBIO DE SIGNO (+/-) ──
      if (value === '+/-') {
        // if: tiene signo negativo → lo quita; else → lo añade
        if (prev.display.startsWith('-')) {
          return { ...prev, display: prev.display.slice(1) }
        } else {
          return { ...prev, display: '-' + prev.display }
        }
      }

      // ── CALCULAR (=) ──
      if (value === '=') {
        // try...catch → eval() puede lanzar SyntaxError con expresiones inválidas
        try {
          const fullExpr = prev.isResult ? prev.display : prev.expression + prev.display
          const prepared = prepareExpression(fullExpr, prev.angleMode)
          // eval() → motor de cálculo de expresiones matemáticas
          // eslint-disable-next-line no-eval
          const result = eval(prepared) as number
          const formatted = formatResult(result)
          if (formatted.startsWith('Error')) {
            return { ...prev, display: formatted, hasError: true, isResult: true }
          }
          return { ...prev, display: formatted, expression: '', history: `${fullExpr} =`, isResult: true, hasError: false }
        } catch {
          return { ...prev, display: 'Error: Expresión inválida', hasError: true, isResult: true }
        }
      }

      // ── PORCENTAJE ──
      if (value === '%') {
        try {
          return { ...prev, display: String(parseFloat(prev.display) / 100), isResult: true }
        } catch {
          return { ...prev, display: 'Error', hasError: true }
        }
      }

      // ── CONSTANTES ──
      if (value === 'π' || value === 'e') {
        const constVal = value === 'π' ? String(Math.PI) : String(Math.E)
        return { ...prev, display: constVal, expression: '', isResult: true }
      }

      // ── FUNCIONES CIENTÍFICAS INMEDIATAS ──
      // try...catch → dominios inválidos (log de negativo, sqrt de negativo, etc.)
      const sciMap: Record<string, (n: number) => number> = {
        sin:  n => Math.sin(toRad(n, prev.angleMode)),
        cos:  n => Math.cos(toRad(n, prev.angleMode)),
        tan:  n => Math.tan(toRad(n, prev.angleMode)),
        log:  n => Math.log10(n),
        ln:   n => Math.log(n),
        sqrt: n => Math.sqrt(n),
        abs:  n => Math.abs(n),
      }
      if (sciMap[value]) {
        try {
          const num = parseFloat(prev.display)
          const formatted = formatResult(sciMap[value](num))
          return { ...prev, display: formatted, history: `${value}(${prev.display}) =`, isResult: true, hasError: formatted.startsWith('Error') }
        } catch {
          return { ...prev, display: 'Error', hasError: true }
        }
      }

      // ── POTENCIAS DIRECTAS ──
      if (value === 'x²') {
        try {
          return { ...prev, display: formatResult(Math.pow(parseFloat(prev.display), 2)), history: `(${prev.display})² =`, isResult: true }
        } catch { return { ...prev, display: 'Error', hasError: true } }
      }
      if (value === 'x³') {
        try {
          return { ...prev, display: formatResult(Math.pow(parseFloat(prev.display), 3)), history: `(${prev.display})³ =`, isResult: true }
        } catch { return { ...prev, display: 'Error', hasError: true } }
      }

      // ── INVERSO (1/x) ──
      if (value === '1/x') {
        try {
          const num = parseFloat(prev.display)
          if (num === 0) return { ...prev, display: 'Error: División por cero', hasError: true }
          return { ...prev, display: formatResult(1 / num), history: `1/${prev.display} =`, isResult: true }
        } catch { return { ...prev, display: 'Error', hasError: true } }
      }

      // ── FACTORIAL (x!) ──
      if (value === 'x!') {
        try {
          const num = parseInt(prev.display)
          if (num < 0 || num > 20) return { ...prev, display: 'Error: Fuera de rango', hasError: true }
          let fact = 1
          for (let i = 2; i <= num; i++) fact *= i
          return { ...prev, display: String(fact), history: `${num}! =`, isResult: true }
        } catch { return { ...prev, display: 'Error', hasError: true } }
      }

      // ── MEMORIA ──
      if (value === 'M+') return { ...prev, memory: prev.memory + parseFloat(prev.display) }
      if (value === 'M-') return { ...prev, memory: prev.memory - parseFloat(prev.display) }
      if (value === 'MR') return { ...prev, display: String(prev.memory), isResult: true }
      if (value === 'MC') return { ...prev, memory: 0 }

      // ── MODO DE ÁNGULO ──
      if (value === 'DEG') return { ...prev, angleMode: 'deg' }
      if (value === 'RAD') return { ...prev, angleMode: 'rad' }

      // ── OPERADORES ──
      const operators = ['+', '-', '*', '/', '^']
      if (operators.includes(value)) {
        const isLastOp = operators.includes(prev.expression.slice(-1))
        if (prev.isResult) {
          return { ...prev, expression: prev.display + value, display: '0', isResult: false }
        }
        if (isLastOp) {
          return { ...prev, expression: prev.expression.slice(0, -1) + value }
        }
        return { ...prev, expression: prev.expression + prev.display + value, display: '0' }
      }

      // ── PUNTO DECIMAL ──
      if (value === '.') {
        if (prev.display.includes('.')) return prev
        if (prev.isResult) return { ...prev, display: '0.', isResult: false }
        return { ...prev, display: prev.display + '.' }
      }

      // ── PARÉNTESIS ──
      if (value === '(' || value === ')') {
        if (prev.isResult) return { ...prev, expression: value, display: '0', isResult: false }
        return { ...prev, expression: prev.expression + prev.display + value, display: '0' }
      }

      // ── DÍGITOS (0–9) ──
      // if: display en "0" o viene de resultado → reemplaza
      // else: concatena el dígito
      if (prev.isResult || prev.display === '0') {
        return { ...prev, display: value, isResult: false }
      } else {
        return { ...prev, display: prev.display + value }
      }
    })
  }

  return { state, handleInput }
}

export default useCalculator
