import type { Pokemon } from "../types/pokemon";
import "./PokemonModal.css";

interface Props {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonModal = ({ pokemon, onClose }: Props) => {
  const getStat = (name: string) =>
    pokemon.stats.find(stat => stat.stat.name === name)?.base_stat ?? 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ✖
        </button>

        <h2 className="pokemon-name">{pokemon.name}</h2>

        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="modal-image"
        />

        <div className="pokemon-types">
          {pokemon.types.map(type => (
            <span key={type.type.name} className={`type ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="stats">
          <p>❤️ HP: {getStat("hp")}</p>
          <p>⚔️ Attack: {getStat("attack")}</p>
          <p>🛡️ Defense: {getStat("defense")}</p>
          <p>⚡ Speed: {getStat("speed")}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;

const getColorByType = (type: string) => {
  switch (type) {
    case "fire":
      return "#f08030";
    case "water":
      return "#6890f0";
    case "grass":
      return "#78c850";
    case "electric":
      return "#f8d030";
    case "poison":
      return "#a040a0";
    default:
      return "#a8a878";
  }
};

