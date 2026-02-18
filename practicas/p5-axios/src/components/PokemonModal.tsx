import React, { useEffect, useState } from 'react';
// AGREGA "type" AQUÍ
import type { PokemonBase } from '../types/pokemon';
import '../index.css';

interface PokemonModalProps {
  pokemon: PokemonBase;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const [description, setDescription] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`);
        const data = await res.json();
        const entry = data.flavor_text_entries.find((e: any) => e.language.name === 'es');
        setDescription(entry ? entry.flavor_text.replace(/\f/g, ' ') : "Sin descripción disponible en español.");
      } catch (e) {
        setDescription("No se pudo cargar la descripción.");
      } finally {
        setLoadingDetails(false);
      }
    };
    fetchDetails();
  }, [pokemon]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 font-bold transition-colors"
        >
          ✕
        </button>

        <div className="bg-blue-600 p-6 text-center text-white relative overflow-hidden">
             <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
             <h2 className="relative z-10 text-3xl font-bold capitalize tracking-wide">{pokemon.name}</h2>
             <p className="relative z-10 opacity-80 font-mono text-sm">#{pokemon.id.padStart(3, '0')}</p>
        </div>

        <div className="p-8 flex flex-col items-center pt-0">
          <div className="-mt-24 mb-6 relative z-10">
             <img 
               src={pokemon.imageUrl} 
               alt={pokemon.name} 
               className="h-56 w-56 object-contain drop-shadow-2xl filter"
             />
          </div>
          
          {/* <div className="min-h-[80px] w-full flex items-center justify-center text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
            {loadingDetails ? (
              <div className="flex gap-2 items-center text-slate-400 font-medium">
                 <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500"></div>
                 Cargando datos...
              </div>
            ) : (
              <p className="text-slate-700 leading-relaxed italic">
                "{description}"
              </p>
            )}
          </div> */}
          
          <div className="min-h-20 w-full flex items-center justify-center text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
            {loadingDetails ? (
              <div className="flex gap-2 items-center text-slate-400 font-medium">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500"></div>
                  Cargando datos...
              </div>
            ) : (
              <p className="text-slate-700 leading-relaxed italic">
                "{description}"
              </p>
            )}
          </div>






        </div>
      </div>
    </div>
  );
}