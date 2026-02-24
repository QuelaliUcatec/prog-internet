import { useEffect, useState } from 'react'
import { getMarsPhotos } from '../services/nasaService'

interface Photo {
  id: number
  img_src: string
  earth_date: string
  rover: { name: string }
  camera: { full_name: string }
}

function MarsPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selected, setSelected] = useState<Photo | null>(null)

  useEffect(() => {
    getMarsPhotos().then((res) => setPhotos(res))
  }, [])

  if (!photos.length) return <p style={{ color: '#94a3b8' }}>Cargando fotos de Marte...</p>

  return (
    <div style={{
      border: '1px solid #1e3a5f',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0',
      background: '#111827',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: '#60a5fa' }}>Fotos de Marte</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* GRID DE FOTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelected(photo)}
              style={{
                border: selected?.id === photo.id ? '2px solid #60a5fa' : '1px solid #1e3a5f',
                borderRadius: '8px',
                padding: '6px',
                background: '#0d1b2a',
                cursor: 'pointer'
              }}
            >
              <img src={photo.img_src} alt="Mars" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
              <p style={{ color: '#94a3b8', fontSize: '10px', margin: '4px 0' }}>{photo.earth_date}</p>
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
          maxHeight: '400px'
        }}>
          {selected ? (
            <>
              <img src={selected.img_src} alt="selected" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px', border: '1px solid #1e3a5f' }} />
              <p>{'>'} <span style={{ color: '#94a3b8' }}>ID:</span> {selected.id}</p>
              <p>{'>'} <span style={{ color: '#94a3b8' }}>Fecha:</span> {selected.earth_date}</p>
              <p>{'>'} <span style={{ color: '#94a3b8' }}>Rover:</span> {selected.rover.name}</p>
              <p>{'>'} <span style={{ color: '#94a3b8' }}>Camara:</span> {selected.camera.full_name}</p>
            </>
          ) : (
            <p style={{ color: '#1e3a5f' }}>{'>'} Selecciona una foto para ver su información...</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default MarsPhotos