import React from 'react'
import SearchPredictive from './components/SearchPredictive'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <main className="container mx-auto">
        <SearchPredictive />
      </main>

      {/* Footer / Info */}
      <footer className="fixed bottom-6 w-full text-center text-slate-400 text-sm pointer-events-none">
        <p>Presiona <kbd className="font-sans border border-slate-200 px-1 rounded bg-white">Ctrl</kbd> + <kbd className="font-sans border border-slate-200 px-1 rounded bg-white">k</kbd> para enfocar (maqueta)</p>
      </footer>
    </div>
  )
}

export default App
