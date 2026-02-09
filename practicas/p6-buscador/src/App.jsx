import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    const fetchSuggestions = async () => {
      try {
        const targetUrl = encodeURIComponent(`https://duckduckgo.com/ac/?q=${query}`)
        const res = await fetch(`https://api.allorigins.win/get?url=${targetUrl}`)
        if (!res.ok) throw new Error('Error en la consulta')
        const data = await res.json()
        const parsed = JSON.parse(data.contents) 
        setSuggestions(parsed)
      } catch (error) {
        console.error(error)
      }
    }
    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [query])

  const executeSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      window.open(`https://duckduckgo.com/?q=${encodeURIComponent(searchTerm)}`, '_blank')
    }
  }

  const handleSelect = (phrase) => {
    setQuery(phrase)
    setSuggestions([])
    executeSearch(phrase)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    executeSearch(query)
    setSuggestions([])
  }

  return (
    <div className="main-wrapper">
      <div className="container">
        {/* --- CABECERA --- */}
        <div className="temple-header">
          <h1>Zēteō <span>(ζητέω)</span></h1>
          <p>SI BIEN BUSCAS, ENCONTRARAS.</p>
          <div className="divider"></div>
        </div>

        {/* --- BUSCADOR --- */}
        <form onSubmit={handleSubmit} className="search-wrapper">
          <div className={`search-box ${suggestions.length > 0 ? 'open' : ''}`}>
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button 
                type="button" 
                className="clear-btn" 
                onClick={() => { setQuery(''); setSuggestions([]); }}
              >✖</button>
            )}
          </div>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSelect(item.phrase)}>
                  {item.phrase}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </div>
  )
}

export default App