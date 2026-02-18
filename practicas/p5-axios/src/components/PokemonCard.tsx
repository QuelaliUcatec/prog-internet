import React from 'react';
import '../index.css';

// Nota los dos puntos (..) para subir un nivel
import type { PokemonBase } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonBase;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer rounded-xl bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-blue-50 border border-slate-200 flex flex-col items-center"
    >
      <div className="h-32 w-32 mb-4 flex items-center justify-center">
        <img 
          src={pokemon.imageUrl} 
          alt={pokemon.name}
          loading="lazy"
          className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      <h2 className="text-lg font-bold capitalize text-slate-700 group-hover:text-blue-600">
        {pokemon.name}
      </h2>
      
      <span className="text-xs text-slate-400 font-mono">
        #{pokemon.id.padStart(3, '0')}
      </span>
      
      <p className="mt-2 text-xs font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
         Ver detalles
      </p>
    </div>
  );
}