import { useState } from 'react';
import PokemonCard from './components/PokemonCard';
import PokemonKardex from './components/PokemonKardex';
import './App.css';

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
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('home');
  const [currentType, setCurrentType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [allUrls, setAllUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // --- LÓGICA DE AUDIO Y VOZ ---
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.1; 
    utterance.pitch = 0.8; 
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (type) => {
    const sounds = {
      beep: 'https://www.soundjay.com/buttons/sounds/button-16.mp3',
      scan: 'https://www.soundjay.com/buttons/sounds/button-3.mp3'
    };
    const audio = new Audio(sounds[type]);
    audio.volume = 0.1; // Volumen suave para el hover
    audio.play().catch(() => {});
  };

  // --- LÓGICA DE BÚSQUEDA Y CARGA ---
  const itemsPerPage = 20;
  const totalPages = Math.ceil(allUrls.length / itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setLoading(true);
    speak(`Iniciando escaneo de ${searchTerm}`);
    playSound('scan');

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then(res => {
        if (!res.ok) throw new Error('No encontrado');
        return res.json();
      })
      .then(pokemon => {
        setSelectedPokemon(pokemon);
        speak(`Datos encontrados: ${pokemon.name}. Tipo ${pokemon.types[0].type.name}`);
        setSearchTerm('');
        setLoading(false);
      })
      .catch(() => {
        speak("Error de conexión: Sujeto no identificado");
        alert("Pokémon no encontrado");
        setLoading(false);
      });
  };

  const fetchPageData = (page, urls) => {
    setLoading(true);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slice = urls.slice(start, end);
    const promises = slice.map(p => fetch(p.pokemon.url).then(res => res.json()));

    Promise.all(promises).then(results => {
      setPokemonList(results);
      setLoading(false);
      setCurrentPage(page);
    });
  };

  const loadType = (type) => {
    setLoading(true);
    setCurrentType(type);
    setViewMode('list');
    speak(`Accediendo a la base de datos de tipo ${typeTranslations[type]}`);

    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(data => {
        setAllUrls(data.pokemon);
        fetchPageData(1, data.pokemon);
      });
  };

  const goHome = () => {
    setSelectedPokemon(null);
    setPokemonList([]);
    setViewMode('home');
    setSearchTerm('');
    setCurrentPage(1);
    setAllUrls([]);
    window.speechSynthesis.cancel();
  };

  return (
    <div className="container">
      <div className="crt-overlay"></div>

      {selectedPokemon && (
        <div className="kardex-wrapper animate-in">
          <PokemonKardex 
            pokemon={selectedPokemon} 
            onBack={() => {
              setSelectedPokemon(null);
              window.speechSynthesis.cancel();
            }} 
          />
        </div>
      )}

      <div className={`main-content ${selectedPokemon ? 'blurred' : ''}`}>
        <div className="main-header">
          <h1 
            onClick={goHome} 
            onMouseEnter={() => playSound('beep')} 
            className="logo-glitch" 
            data-text="POKÉDEX"
          >
            POKÉDEX
          </h1>

          <div className="scanner-advanced-container">
            <div className="radar-leds">
              <div className="led led-red" title="Filtro de Alto Nivel" onClick={() => { playSound('beep'); speak("Modo combate."); }}></div>
              <div className="led led-blue" title="Escáner Evolutivo" onClick={() => { playSound('beep'); speak("Escáner evolutivo."); }}></div>
              <div className="led led-green" title="Registros" onClick={() => { playSound('beep'); speak("Accediendo a registros."); }}></div>
            </div>

            <div className="scanner-frame">
              <div className="scanner-line"></div> 
              <form onSubmit={handleSearch} className="search-box-modern">
                <div className="search-input-wrapper">
                  <span className="search-decorator">SCAN_ID:</span>
                  <input
                    type="text"
                    placeholder="IDENTIFICAR POKÉMON..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button type="submit" className="scan-btn" onMouseEnter={() => playSound('beep')}>SCAN</button>
              </form>
            </div>
          </div>
        </div>

        <div className="content-area">
          {loading ? (
            <div className="loading-glitch">
              <div className="loader-pokeball"></div>
              <p className="glitch-text" data-text="IDENTIFICANDO...">IDENTIFICANDO...</p>
            </div>
          ) : viewMode === 'home' ? (
            <div className="types-grid">
              {Object.keys(typeColors).map(type => (
                <div 
                  key={type} 
                  className="type-card"
                  style={{ 
                    background: `radial-gradient(circle at top left, ${typeColors[type]} 0%, rgba(0,0,0,0.85) 120%)`,
                    '--accent-color': typeColors[type]
                  }}
                  onMouseEnter={() => playSound('beep')} // <--- SONIDO AL PASAR EL MOUSE
                  onClick={() => loadType(type)}
                >
                  <div className="icon-wrapper">
                    <img 
                      src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`} 
                      alt={type} 
                      className="type-icon"
                    />
                  </div>
                  <span>{typeTranslations[type].toUpperCase()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="results-container">
              <div className="hud-top-bar">
                <button 
                  onClick={goHome} 
                  onMouseEnter={() => playSound('beep')} 
                  className="home-icon-btn"
                >
                  🏠
                </button>
                <div className="type-badge-display" style={{ '--type-color': typeColors[currentType] }}>
                  <img src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${currentType}.svg`} alt={currentType} className="badge-icon" />
                  <span className="badge-text">{typeTranslations[currentType]?.toUpperCase()}</span>
                </div>
                <div className="pagination-controls mini">
                  <button 
                    onMouseEnter={() => playSound('beep')} 
                    onClick={() => fetchPageData(currentPage - 1, allUrls)} 
                    disabled={currentPage === 1}
                  >
                    ←
                  </button>
                  <div className="page-info">{currentPage} / {totalPages}</div>
                  <button 
                    onMouseEnter={() => playSound('beep')} 
                    onClick={() => fetchPageData(currentPage + 1, allUrls)} 
                    disabled={currentPage >= totalPages}
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="pokemon-grid">
                {pokemonList.map(pokemon => (
                  <PokemonCard 
                    key={pokemon.id} 
                    pokemon={pokemon} 
                    typeColor={typeColors[pokemon.types[0].type.name]} 
                    onClick={() => {
                      setSelectedPokemon(pokemon);
                      playSound('beep');
                    }} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>   
  );
}

export default App;