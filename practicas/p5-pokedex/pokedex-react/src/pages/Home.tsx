import { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import Filters from "../components/Filters";
import type { Pokemon } from "../types/pokemon";

const Home = () => {
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [minAttack, setMinAttack] = useState(0);
  const [minDefense, setMinDefense] = useState(0);
  const [minSpeed, setMinSpeed] = useState(0);

  const { pokemons, loading } = usePokemon(page);

  const getStat = (pokemon: Pokemon, statName: string) =>
    pokemon.stats.find(stat => stat.stat.name === statName)?.base_stat ?? 0;

  const filteredPokemons = pokemons.filter(pokemon =>
    getStat(pokemon, "attack") >= minAttack &&
    getStat(pokemon, "defense") >= minDefense &&
    getStat(pokemon, "speed") >= minSpeed
  );

  return (
    <div className="container">
      <h2>Página {page + 1}</h2>

      <Filters
        minAttack={minAttack}
        minDefense={minDefense}
        minSpeed={minSpeed}
        setMinAttack={setMinAttack}
        setMinDefense={setMinDefense}
        setMinSpeed={setMinSpeed}
      />

      {loading && <p>Cargando...</p>}

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => setSelectedPokemon(pokemon)}
          >
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          ⬅ Anterior
        </button>
        <button onClick={() => setPage(page + 1)} style={{ marginLeft: "8px" }}>
          Siguiente ➡
        </button>
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default Home;
