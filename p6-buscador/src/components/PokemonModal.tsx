import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';
import { TYPE_COLORS } from '../types/pokemon';

interface EvolutionStep {
  name: string;
  id: number;
  image: string;
}

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

function flattenChain(chain: any): EvolutionStep[] {
  const steps: EvolutionStep[] = [];
  let current = chain;
  while (current) {
    const id = parseInt(current.species.url.split('/').filter(Boolean).pop());
    steps.push({
      name: current.species.name,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    });
    current = current.evolves_to?.[0] ?? null;
  }
  return steps;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStep[]>([]);
  const [loadingEvo, setLoadingEvo]         = useState(true);

  const image =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  const mainType  = pokemon.types[0].type.name;
  const typeColor = TYPE_COLORS[mainType] || '#ffffff';
  const heightM   = (pokemon.height / 10).toFixed(1);
  const weightKg  = (pokemon.weight / 10).toFixed(1);
  const MAX_STAT  = 255;

  useEffect(() => {
    async function loadEvolution() {
      try {
        setLoadingEvo(true);
        const speciesRes  = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
        const speciesData = await speciesRes.json();
        const evoRes      = await fetch(speciesData.evolution_chain.url);
        const evoData     = await evoRes.json();
        setEvolutionChain(flattenChain(evoData.chain));
      } catch {
        setEvolutionChain([]);
      } finally {
        setLoadingEvo(false);
      }
    }
    loadEvolution();
  }, [pokemon.id]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundColor: '#111111',
          border: '1px solid #2a2a2a',
          boxShadow: '0 0 40px #00000080',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${typeColor}, transparent)` }} />

        {/* Encabezado */}
        <div className="relative p-6 pb-4 flex items-center gap-5">
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all">
            ✕
          </button>

          <div className="w-28 h-28 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}>
            <img src={image} alt={pokemon.name} className="w-24 h-24 object-contain drop-shadow-xl" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold text-white/30">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
            <h2 className="text-2xl font-black capitalize text-white tracking-wide leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}>
              {pokemon.name}
            </h2>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {pokemon.types.map(({ type }) => (
                <span key={type.name}
                  className="px-3 py-0.5 rounded-full text-xs font-bold capitalize text-white"
                  style={{ backgroundColor: `${TYPE_COLORS[type.name]}aa` }}>
                  {type.name}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              <div>
                <p className="text-[10px] text-white/30">Altura</p>
                <p className="text-sm font-bold text-white">{heightM} m</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30">Peso</p>
                <p className="text-sm font-bold text-white">{weightKg} kg</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30">Exp. base</p>
                <p className="text-sm font-bold text-white">{pokemon.base_experience}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="px-6 pb-6 space-y-5 max-h-80 overflow-y-auto custom-scroll">

          {/* Evoluciones */}
          <div>
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">
              Cadena de Evolución
            </h3>
            {loadingEvo ? (
              <div className="flex justify-center py-3">
                <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: '#ffffff30', borderTopColor: '#ffffff' }} />
              </div>
            ) : evolutionChain.length <= 1 ? (
              <p className="text-white/25 text-sm italic">Este Pokémon no evoluciona.</p>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                {evolutionChain.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
                      style={{
                        backgroundColor: step.id === pokemon.id ? '#222222' : '#1a1a1a',
                        border: `1px solid ${step.id === pokemon.id ? typeColor + '60' : '#2a2a2a'}`,
                      }}>
                      <img src={step.image} alt={step.name} className="w-10 h-10 object-contain" />
                      <span className="text-[11px] capitalize text-white/60 font-medium">{step.name}</span>
                    </div>
                    {index < evolutionChain.length - 1 && (
                      <span className="text-white/20 text-lg">→</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Habilidades */}
          <div>
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">
              Habilidades
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <span key={ability.name}
                  className="px-3 py-1 rounded-lg text-sm capitalize text-white"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${is_hidden ? '#2a2a2a' : typeColor + '40'}`,
                  }}>
                  {ability.name}
                  {is_hidden && <span className="text-white/25 text-xs ml-1">(oculta)</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">
              Estadísticas Base
            </h3>
            <div className="space-y-2">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="flex items-center gap-3">
                  <span className="text-[11px] text-white/30 w-20 text-right capitalize">
                    {STAT_NAMES[stat.name] || stat.name}
                  </span>
                  <span className="text-sm font-black w-7 text-white">{base_stat}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#2a2a2a' }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(base_stat / MAX_STAT) * 100}%`,
                        backgroundColor: base_stat >= 100 ? '#4ade80' : base_stat >= 60 ? typeColor : '#ef4444',
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}