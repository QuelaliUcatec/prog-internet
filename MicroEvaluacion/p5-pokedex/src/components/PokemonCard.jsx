// src/components/PokemonCard.jsx
function PokemonCard({ pokemon, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name} 
      />
      <h3>{pokemon.name}</h3>
      <p>#{pokemon.id}</p>
    </div>
  )
}

export default PokemonCard