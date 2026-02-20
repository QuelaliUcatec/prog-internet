import { useState } from 'react'
import PokemonCard from './components/PokemonCard'
import PokemonKardex from './components/PokemonKardex'
import './App.css'

const typeColors = {
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
  grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
  ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
  rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', steel: '#B7B7CE',
  fairy: '#D685AD'
};

const typeTranslations = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
  grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', steel: 'Acero',
  fairy: 'Hada'
};

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('home') 
  const [currentType, setCurrentType] = useState('') 
  const [searchTerm, setSearchTerm] = useState('')

  // --- ESTADOS PARA PAGINACIÓN ---
  const [allUrls, setAllUrls] = useState([]) 
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const handleSearch = (e) => {
    e.preventDefault()
    if(!searchTerm) return;
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then(res => {
        if (!res.ok) throw new Error('No encontrado')
        return res.json()
      })
      .then(pokemon => {
        setSelectedPokemon(pokemon) 
        setSearchTerm('')
        setLoading(false) 
      })
      .catch(() => {
        alert("Pokémon no encontrado")
        setLoading(false)
      })
  }

  // Función para cargar los detalles de una página específica
  const fetchPageData = (page, urls) => {
    setLoading(true)
    // Calculamos el rango usando: 
    // $inicio = (página - 1) \times cantidad$
    // $fin = inicio + cantidad$
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const slice = urls.slice(start, end)

    const promises = slice.map(p => fetch(p.pokemon.url).then(res => res.json()))
    
    Promise.all(promises).then(results => {
      setPokemonList(results)
      setLoading(false)
      setCurrentPage(page)
    })
  }

  const loadType = (type) => {
    setLoading(true)
    setCurrentType(type)
    setViewMode('list') 

    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(data => {
        setAllUrls(data.pokemon) // lista completa de este tipo
        fetchPageData(1, data.pokemon) // Carga primera página
      })
  }

  const changePage = (direction) => {
    const nextPage = currentPage + direction
    fetchPageData(nextPage, allUrls)
  }

  const goHome = () => {
    setSelectedPokemon(null)
    setPokemonList([])
    setViewMode('home')
    setSearchTerm('')
    setCurrentPage(1)
    setAllUrls([])
  }

  return (
    <div className="container">
      {selectedPokemon && (
        <div className="kardex-wrapper">
          <PokemonKardex pokemon={selectedPokemon} onBack={() => setSelectedPokemon(null)} />
        </div>
      )}

      <div className={`main-content ${selectedPokemon ? 'blurred' : ''}`}>
        <div className="main-header">
          <h1 onClick={goHome} style={{cursor: 'pointer'}}>POKÉDEX</h1>
          <form onSubmit={handleSearch} className="search-box">
            <input 
              type="text" 
              placeholder="Busca a tu pokémon favorito aquí..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>

        <div className="content-area">
          {loading ? (
            <div className="loading">Cargando datos...</div>
          ) : viewMode === 'home' ? (
            <div className="types-grid">
              {Object.keys(typeColors).map(type => (
                <div 
                  key={type} 
                  className="type-card"
                  style={{ background: `linear-gradient(135deg, ${typeColors[type]} 0%, rgba(0,0,0,0.6) 150%)` }}
                  onClick={() => loadType(type)}
                >
                  <img 
                    src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`} 
                    alt={type} 
                    className="type-icon"
                  />
                  <span>{typeTranslations[type].toUpperCase()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="results-header">
                <button onClick={goHome} className="back-btn">🏠 Volver al Inicio</button>
                <h2>Tipo: {typeTranslations[currentType]?.toUpperCase()}</h2>
                
                {/* --- CONTROLES DE PAGINACIÓN --- */}
                <div className="pagination-controls">
                  <button 
                    onClick={() => changePage(-1)} 
                    disabled={currentPage === 1}
                    className="page-btn"
                  >
                    ⬅ Anterior
                  </button>
                  <span className="page-info">Página {currentPage} de {Math.ceil(allUrls.length / itemsPerPage)}</span>
                  <button 
                    onClick={() => changePage(1)} 
                    disabled={currentPage * itemsPerPage >= allUrls.length}
                    className="page-btn"
                  >
                    Siguiente ➡
                  </button>
                </div>
              </div>

              <div className="pokemon-grid">
                {pokemonList.map(pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => setSelectedPokemon(pokemon)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App