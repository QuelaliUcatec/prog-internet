// src/components/PokemonCard.jsx
function PokemonCard({ pokemon, onClick, typeColor }) {
  if (!pokemon) return null;

  const mainType = pokemon.types[0].type.name;
  const hp = pokemon.stats[0].base_stat;
  const mainAbility = pokemon.abilities[0]?.ability.name.replace('-', ' ') || "Habilidad Especial";
  const attackDamage = pokemon.stats[1].base_stat;

  return (
    <div 
      className={`card card-type-${mainType}`} 
      onClick={onClick}
      style={{ '--type-color': typeColor }} 
    >
      <div className="card-inner">
        {/* Cabecera: Fase y HP */}
        <div className="card-header-tcg">
          <span className="card-stage">Básico</span>
          <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>
          <div className="hp-container">
            <small>HP</small>
            <span className="hp-value">{hp}</span>
            <span className={`energy-icon energy-${mainType}`}></span>
          </div>
        </div>
        
        {/* Ilustración con gradiente dinámico */}
        <div className="card-img-container">
          <div className="img-bg-glow" style={{ background: `radial-gradient(circle, #fff 0%, ${typeColor}66 100%)` }}></div>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name} 
          />
        </div>

        {/* Info Box: Longitud y Peso (Opcional para realismo) */}
        <div className="card-stats-line">
          Pokémon {mainType}. Longitud: {pokemon.height / 10}m, Peso: {pokemon.weight / 10}kg
        </div>

        {/* Sección de Ataque */}
        <div className="card-info-tcg">
          <div className="ability-section">
            <div className="attack-row">
              <div className="energy-cost">
                <span className={`energy-icon energy-${mainType} small`}></span>
                <span className={`energy-icon energy-normal small`}></span>
              </div>
              <p className="ability-name">{mainAbility.toUpperCase()}</p>
              <span className="attack-damage">{attackDamage}</span>
            </div>
            <p className="ability-text">
              Inflige daño masivo al oponente. Si el Pokémon defensor ya tiene daño, este ataque hace 20 más.
            </p>
          </div>

          {/* Pie de carta: Debilidades y Retirada */}
          <div className="card-footer-tcg">
            <div className="footer-stat">
              <span>Debilidad</span>
              <div className="energy-icon energy-fire"></div>
            </div>
            <div className="footer-stat">
              <span>Resistencia</span>
              <div className="energy-icon energy-grass"></div>
            </div>
            <div className="footer-stat">
              <span>Retirada</span>
              <div className="energy-icon energy-normal"></div>
            </div>
          </div>
          
          <div className="card-id-mark">
            #{pokemon.id.toString().padStart(3, '0')}/151 ★
          </div>
        </div>
      </div>
      {/* Capas de brillo holográfico */}
      <div className="holo-sheen"></div>
      <div className="holo-sparkles"></div>
    </div>
  );
}

export default PokemonCard;