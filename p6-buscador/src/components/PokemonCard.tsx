import type { Pokemon } from '../types/pokemon';
import { TYPE_COLORS } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const image =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  const mainType = pokemon.types[0].type.name;
  const typeColor = TYPE_COLORS[mainType] || '#ffffff';

  const hp     = pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0;
  const attack = pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0;
  const speed  = pokemon.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0;
  const heightM  = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  return (
    <div
      onClick={() => onClick(pokemon)}
      className="group cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.04] flex flex-col"
      style={{
        width: '180px',
        height: '240px',
        backgroundColor: '#111111',
        border: '1px solid #2a2a2a',
        boxShadow: '0 4px 16px #00000050',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${typeColor}99, transparent)` }} />

      <span className="absolute bottom-1 right-2 text-6xl font-black select-none pointer-events-none"
        style={{ color: '#ffffff', opacity: 0.03, lineHeight: 1 }}>
        {String(pokemon.id).padStart(3, '0')}
      </span>

      <div className="flex flex-col h-full p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-white/30">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <div className="flex gap-1">
            {pokemon.types.map(({ type }) => (
              <span key={type.name}
                className="px-1.5 py-0.5 rounded-full text-[9px] font-bold capitalize text-white"
                style={{ backgroundColor: `${TYPE_COLORS[type.name]}aa` }}>
                {type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center flex-1">
          <img
            src={image}
            alt={pokemon.name}
            className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg"
            style={{ width: '90px', height: '90px' }}
            loading="lazy"
          />
        </div>

        <h3 className="text-center font-black capitalize text-sm mt-1 mb-0.5 truncate text-white"
          style={{ fontFamily: "'Georgia', serif" }}>
          {pokemon.name}
        </h3>

        <p className="text-center text-[9px] text-white/25 mb-2">
          {heightM}m · {weightKg}kg · Exp. base: {pokemon.base_experience}
        </p>

        <div className="flex justify-around py-1.5 rounded-xl"
          style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-white/25 uppercase tracking-wider">HP</span>
            <span className="text-xs font-black" style={{ color: '#ef4444' }}>{hp}</span>
          </div>
          <div className="w-px self-stretch" style={{ backgroundColor: '#2a2a2a' }} />
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-white/25 uppercase tracking-wider">ATK</span>
            <span className="text-xs font-black" style={{ color: typeColor }}>{attack}</span>
          </div>
          <div className="w-px self-stretch" style={{ backgroundColor: '#2a2a2a' }} />
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-white/25 uppercase tracking-wider">SPD</span>
            <span className="text-xs font-black" style={{ color: '#a78bfa' }}>{speed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}