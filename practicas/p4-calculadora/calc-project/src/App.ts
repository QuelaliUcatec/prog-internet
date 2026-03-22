// ============================================================
// App.ts — Componente raíz
// React.createElement() puro — sin JSX ni .tsx
// ============================================================

import React from 'react'
import Calculator from './components/Calculator'

const ce = React.createElement

const App: React.FC = () => ce(Calculator, null)

export default App
