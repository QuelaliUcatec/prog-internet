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

  const loadType = (type) => {
    setLoading(true)
    setCurrentType(type)
    setViewMode('list') 
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(data => {
        const rawList = data.pokemon.slice(0, 20).map(p => p.pokemon)
        const promises = rawList.map(p => fetch(p.url).then(res => res.json()))
        return Promise.all(promises)
      })
      .then(results => {
        setPokemonList(results)
        setLoading(false)
      })
  }

  const goHome = () => {
    setSelectedPokemon(null)
    setPokemonList([])
    setViewMode('home')
    setSearchTerm('')
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