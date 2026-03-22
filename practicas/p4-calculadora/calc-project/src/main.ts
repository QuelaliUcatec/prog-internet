// ============================================================
// main.ts — Punto de entrada de la aplicación
// Monta React 19 en el DOM con createElement — sin JSX ni .tsx
// ============================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

const ce = React.createElement

const rootElement = document.getElementById('root')!

// ReactDOM.createRoot → API moderna de React 18/19
ReactDOM.createRoot(rootElement).render(
  ce(React.StrictMode, null, ce(App, null))
)
