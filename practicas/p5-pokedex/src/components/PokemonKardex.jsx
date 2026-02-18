// src/components/PokemonKardex.jsx

const typeColors = {
  NORMAL: '#A8A77A',
  FUEGO: '#EE8130',
  AGUA: '#6390F0',
  ELECTRICO: '#F7D02C',
  HIERBA: '#7AC74C',
  HIELO: '#96D9D6',
  PELEA: '#C22E28',
  VENENO: '#A33EA1',
  TIERRA: '#E2BF65',
  VOLADOR: '#A98FF3',
  PSIQUICO: '#F95587',
  INSECTO: '#A6B91A',
  ROCA: '#B6A136',
  FANTASMA: '#735797',
  DRAGON: '#6F35FC',
  METAL: '#B7B7CE',
  HADA: '#D685AD',
};

function PokemonKardex({ pokemon, onBack }) {
  return (
    <div className="kardex-container">
      <button onClick={onBack}>← Volver al listado</button>
      
      <div className="kardex-content">
        {/* Lado Izquierdo: Imagen y Nombre */}
        <div className="kardex-header">
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name} 
            className="kardex-img"
          />
          <h2>{pokemon.name.toUpperCase()}</h2>
        </div>

        {/* Lado Derecho: Stats y Tipos */}
        <div className="kardex-stats">
          <h3>Estadísticas Base</h3>
          <ul>
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name}>
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
          
          <h3>Tipos</h3>
          <div className="types">
            {pokemon.types.map(t => (
              <span 
                key={t.type.name} 
                className="type-badge"
                style={{ 
                  backgroundColor: typeColors[t.type.name] || '#777',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginRight: '5px',
                  textTransform: 'capitalize'
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonKardex