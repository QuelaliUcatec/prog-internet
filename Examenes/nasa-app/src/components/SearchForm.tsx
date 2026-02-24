import { useState } from 'react'
import { saveSearch } from '../services/nasaService'

function SearchForm() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      const res = await saveSearch(query)
      setResult(`Busqueda guardada con ID: ${res.id}`)
    } catch (error) {
      setResult('Error al guardar')
    }
  }

  return (
    <div style={{
      border: '1px solid #1e3a5f',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0',
      background: '#111827',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: '#60a5fa' }}>Guardar Busqueda</h2>
      <input
        type="text"
        placeholder="Escribe algo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '10px',
          width: '70%',
          borderRadius: '6px',
          border: '1px solid #1e3a5f',
          background: '#0a0f1e',
          color: '#fff'
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          borderRadius: '6px',
          background: '#1d4ed8',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Guardar
      </button>
      {result && <p style={{ color: '#94a3b8', marginTop: '10px' }}>{result}</p>}
    </div>
  )
}

export default SearchForm