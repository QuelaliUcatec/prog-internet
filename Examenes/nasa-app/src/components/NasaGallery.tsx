import { useState } from 'react'
import { searchNasaImages } from '../services/nasaService'

interface NasaItem {
  data: { title: string; description: string; date_created: string; nasa_id: string; keywords: string[] }[]
  links: { href: string }[]
}

const QUICK_SEARCHES = [
  'Tierra', 'Luna', 'Sol', 'Marte', 'Jupiter',
  'Saturno', 'Galaxia', 'Orion', 'Cometa', 'Nebulosa'
]

function NasaGallery() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NasaItem[]>([])
  const [selected, setSelected] = useState<NasaItem | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (q?: string) => {
    const searchQuery = q || query
    if (!searchQuery) return
    setLoading(true)
    const res = await searchNasaImages(searchQuery.replace(/[^\w\s]/gi, '').trim())
    setResults(res)
    setSelected(null)
    setLoading(false)
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
      <h2 style={{ color: '#60a5fa' }}>Explorador NASA</h2>

      {/* BUSQUEDAS RAPIDAS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
        {QUICK_SEARCHES.map((item) => (
          <button
            key={item}
            onClick={() => handleSearch(item)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: '#0a0f1e',
              color: '#60a5fa',
              border: '1px solid #1e3a5f',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* BUSCADOR */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Busca cualquier tema espacial..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
          onClick={() => handleSearch()}
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
          Buscar
        </button>
      </div>

      {loading && <p style={{ color: '#94a3b8' }}>Cargando...</p>}

      {/* GRID + CONSOLA */}
      {results.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* GRID DE IMAGENES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {results.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelected(item)}
                style={{
                  border: selected === item ? '2px solid #60a5fa' : '1px solid #1e3a5f',
                  borderRadius: '8px',
                  padding: '6px',
                  background: '#0d1b2a',
                  cursor: 'pointer'
                }}
              >
                {item.links && (
                  <img src={item.links[0].href} alt={item.data[0].title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                )}
                <p style={{ color: '#94a3b8', fontSize: '10px', margin: '4px 0' }}>{item.data[0].title}</p>
              </div>
            ))}
          </div>

          {/* CONSOLA */}
          <div style={{
            background: '#0a0f1e',
            borderRadius: '10px',
            padding: '15px',
            border: '2px solid #1e3a5f',
            color: '#60a5fa',
            fontFamily: 'monospace',
            fontSize: '13px',
            overflowY: 'auto',
            maxHeight: '500px'
          }}>
            {selected ? (
              <>
                {selected.links && (
                  <img src={selected.links[0].href} alt="selected" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px', border: '1px solid #1e3a5f' }} />
                )}
                <p>{'>'} <span style={{ color: '#94a3b8' }}>Titulo:</span> {selected.data[0].title}</p>
                <p>{'>'} <span style={{ color: '#94a3b8' }}>Fecha:</span> {selected.data[0].date_created?.slice(0, 10)}</p>
                <p>{'>'} <span style={{ color: '#94a3b8' }}>ID NASA:</span> {selected.data[0].nasa_id}</p>
                {selected.data[0].keywords && (
                  <p>{'>'} <span style={{ color: '#94a3b8' }}>Keywords:</span> {selected.data[0].keywords.slice(0, 5).join(', ')}</p>
                )}
                <p style={{ marginTop: '10px' }}>{'>'} <span style={{ color: '#94a3b8' }}>Descripcion:</span></p>
                <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>{selected.data[0].description}</p>
              </>
            ) : (
              <p style={{ color: '#1e3a5f' }}>{'>'} Selecciona una imagen para ver su informacion...</p>
            )}
          </div>

        </div>
      )}
    </div>
  )
}

export default NasaGallery