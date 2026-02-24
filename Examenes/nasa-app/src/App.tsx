import { useState } from 'react'
import Apod from './components/Apod'
import MarsPhotos from './components/MarsPhotos'
import SearchForm from './components/SearchForm'
import NasaGallery from './components/NasaGallery'

function App() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div style={{
      width: '100%',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #0a0f1e, #0d1b2a, #111827)',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#111827',
        padding: '15px 20px',
        borderRadius: '10px',
        border: '1px solid #1e3a5f',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: '#60a5fa', margin: 0 }}>
          Aplicación de la NASA
        </h1>
        <button
          onClick={() => setShowSearch(!showSearch)}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            background: '#1d4ed8',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Busqueda
        </button>
      </div>

      {showSearch && <NasaGallery />}
      <Apod />
      <MarsPhotos />
      <SearchForm />
    </div>
  )
}

export default App