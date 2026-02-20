import { useState, useEffect, useRef } from 'react';
import type { Pokemon } from '../types/pokemon';
import { fetchPokemonDetail } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard';
import PokemonModal from '../components/PokemonModal';

const TOTAL_POKEMON = 898;
const CARDS_COUNT = 10;

function getRandomIds(count: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * TOTAL_POKEMON) + 1);
  }
  return Array.from(ids);
}

export default function PokedexPage() {
  const [pokemonList, setPokemonList]         = useState<Pokemon[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [shuffling, setShuffling]             = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const isFetching = useRef(false);

  async function loadRandom(isRefresh: boolean) {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      if (isRefresh) setShuffling(true);
      else setLoading(true);
      const ids = getRandomIds(CARDS_COUNT);
      const results = await Promise.all(ids.map((id) => fetchPokemonDetail(id)));
      setPokemonList(results);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setShuffling(false);
      isFetching.current = false;
    }
  }

  useEffect(() => { loadRandom(false); }, []); // eslint-disable-line

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>

      <header className="pt-10 pb-4 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff88' }} />
          <h1 className="text-4xl font-black tracking-[0.25em] uppercase text-white"
            style={{ fontFamily: "'Georgia', serif" }}>
            Pokédex
          </h1>
          <div className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff88' }} />
        </div>
        <p className="text-white/20 text-xs tracking-widest uppercase mt-1">
          {CARDS_COUNT} pokémon aleatorios · {TOTAL_POKEMON} disponibles
        </p>
      </header>

      <main className="pb-16 px-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: '#ffffff44', borderTopColor: '#ffffff' }} />
            <p className="text-white/30 text-xs tracking-widest uppercase">Cargando...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Recuadro contenedor */}
            <div
              className="mx-auto mt-6 p-6 rounded-3xl"
              style={{
                maxWidth: '820px',
                backgroundColor: '#161616',
                border: '1px solid #2a2a2a',
                boxShadow: '0 8px 32px #00000060',
              }}
            >
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, 180px)',
                  justifyContent: 'center',
                }}
              >
                {pokemonList.map((pokemon, index) => (
                  <div
                    key={pokemon.id}
                    style={{
                      animation: 'fadeInUp 0.35s ease forwards',
                      animationDelay: `${index * 50}ms`,
                      opacity: 0,
                    }}
                  >
                    <PokemonCard pokemon={pokemon} onClick={setSelectedPokemon} />
                  </div>
                ))}
              </div>
            </div>

            {/* Botón */}
            <div className="flex flex-col items-center mt-8 gap-2">
              <button
                onClick={() => loadRandom(true)}
                disabled={shuffling}
                className="px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  color: '#ffffff',
                  boxShadow: '0 2px 12px #00000060',
                }}
              >
                {shuffling ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin inline-block"
                      style={{ borderColor: '#ffffff44', borderTopColor: '#ffffff' }} />
                    Cargando...
                  </span>
                ) : (
                  '↺  Otros 10 aleatorios'
                )}
              </button>
            </div>
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
}