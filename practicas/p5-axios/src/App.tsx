import React, { useEffect, useState } from 'react';
import './index.css';

import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
// Asegúrate de que esta ruta sea correcta según tu estructura
import type { PokemonBase } from './types/pokemon';

const PAGE_LIMIT = 20;
// 1. Definimos el límite oficial de la Pokédex
const MAX_POKEMON_ID = 1025;

export default function App() {
  const [pokemons, setPokemons] = useState<PokemonBase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonBase | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true); 
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`);
        const data = await response.json();
        
        const transformed = data.results
          .map((p: any) => {
            const id = p.url.split('/').filter(Boolean).pop();
            return {
              name: p.name,
              id,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            };
          })
          // 2. FILTRO CRÍTICO: Eliminamos cualquier ID que supere el 1025
          .filter((poke: any) => parseInt(poke.id) <= MAX_POKEMON_ID);

        setPokemons(transformed);
      } catch (e) {
        console.error("Error cargando lista", e);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }, [offset]); 

  const closeModal = () => setSelectedPokemon(null);

  const handleNext = () => {
    // 3. Bloqueo lógico: Si ya estamos en el límite, no avanzamos
    if (offset + PAGE_LIMIT >= MAX_POKEMON_ID) {
        return; 
    }
    setOffset((prev) => prev + PAGE_LIMIT);
  };
  
  const handlePrev = () => setOffset((prev) => Math.max(0, prev - PAGE_LIMIT));

  return (
    <div className="min-h-screen bg-slate-100 p-8 pb-20">
      <h1 className="mb-8 text-center text-4xl font-black text-slate-800 uppercase tracking-widest drop-shadow-sm">
        Poké-Gallery
      </h1>
      
      <div className="text-center mb-6 text-slate-500 font-medium">
        {/* Ajustamos el texto para que no muestre números locos al final */}
        Mostrando {offset + 1} - {Math.min(offset + PAGE_LIMIT, MAX_POKEMON_ID)}
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center font-bold text-xl text-slate-600 animate-pulse">
          Cargando Página...
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 animate-in fade-in duration-500">
          {pokemons.map((poke) => (
            <PokemonCard key={poke.id} pokemon={poke} onClick={() => setSelectedPokemon(poke)} />
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={offset === 0 || loading}
          className="rounded-full bg-white px-6 py-3 font-bold text-slate-700 shadow-md transition-all hover:bg-slate-50 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          ← Anterior
        </button>

        <button
          onClick={handleNext}
          // 4. Bloqueo visual: El botón se apaga si llegaríamos al final
          disabled={loading || offset + PAGE_LIMIT >= MAX_POKEMON_ID}
          className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Siguiente →
        </button>
      </div>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </div>
  );
}