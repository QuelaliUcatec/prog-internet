import { useEffect, useState } from 'react'
import { getApod } from '../services/nasaService'

interface ApodData {
  title: string
  explanation: string
  url: string
  date: string
}

function Apod() {
  const [data, setData] = useState<ApodData | null>(null)

  useEffect(() => {
    getApod().then((res) => setData(res))
  }, [])

  if (!data) return <p style={{ color: '#94a3b8' }}>Cargando...</p>

  return (
    <div style={{
      border: '1px solid #1e3a5f',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0',
      background: '#111827',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: '#60a5fa' }}>Imagen del Día</h2>
      <h3 style={{ color: '#fff' }}>{data.title}</h3>
      <p style={{ color: '#94a3b8' }}>{data.date}</p>
      <img
        src={data.url}
        alt={data.title}
        style={{
          width: '300px',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '8px',
          display: 'block',
          margin: '0 auto',
          border: '2px solid #1e3a5f'
        }}
      />
      <p style={{ color: '#94a3b8', marginTop: '10px', lineHeight: '1.6' }}>{data.explanation}</p>
    </div>
  )
}

export default Apod