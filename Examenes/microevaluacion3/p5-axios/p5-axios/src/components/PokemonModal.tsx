import React, { useEffect, useState } from 'react';
import type { PokemonBase } from '../types/pokemon';
import '../index.css';

interface PokemonModalProps {//creamos una interfaz para definir las props que recibirá el componente PokemonModal
  pokemon: PokemonBase;//recibirá un objeto pokemon de tipo PokemonBase
  onClose: () => void;//recibirá una función onClose que se ejecutará cuando se cierre el modal
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {//definimos el componente PokemonModal que recibe las props pokemon y onClose
  const [details, setDetails] = useState<any>(null);//creamos un estado details para almacenar los detalles del pokemon, inicialmente es null
  const [loading, setLoading] = useState(true);//creamos un estado loading para indicar si se están cargando los detalles del pokemon, inicialmente es true

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const resMain = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`);//hacemos una petición a la API de Pokémon para obtener los detalles del pokemon usando su ID
        const dataMain = await resMain.json();//obtenemos los detalles principales del pokemon, como habilidades, altura y peso

        const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`);//hacemos otra petición a la API de Pokémon para obtener los detalles de la especie del pokemon usando su ID
        const dataSpecies = await resSpecies.json();//obtenemos los detalles de la especie del pokemon, como su descripción en diferentes idiomas
        
        // Buscar descripción en español ('es')
        const entry = dataSpecies.flavor_text_entries.find((e: any) => e.language.name === 'es');//buscamos la descripción en español dentro de los entries de flavor_text_entries, que es un array que contiene las descripciones en diferentes idiomas. Usamos el método find para encontrar el entry que tenga el idioma 'es'.
        
        setDetails({
            abilities: dataMain.abilities,
            height: dataMain.height,
            weight: dataMain.weight,
            description: entry ? entry.flavor_text.replace(/[\f\n]/g, ' ') : "No hay descripción en español disponible."
        });//actualizamos el estado details con las habilidades, altura, peso y descripción del pokemon. La descripción se obtiene del entry encontrado, si existe, y se le quitan los caracteres de salto de línea y form feed para que se vea mejor en el modal. Si no se encuentra una descripción en español, se muestra un mensaje indicando que no hay descripción disponible.

      } catch (e) {//si ocurre un error durante las peticiones a la API, lo mostramos en la consola
        console.error(e);
      } finally {
        setLoading(false);
      }//finalmente, indicamos que ya no se están cargando los detalles del pokemon
    };
    fetchDetails();//hacemos llamada a la funcion anterior para obtener los detalles del pokemon cuando el componente cambia
  }, [pokemon]);//el efecto se ejecuta cada vez que el pokemon cambia, es decir, cada vez que se abre el modal con un pokemon diferente

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl animate-in zoom-in-95 flex flex-col md:flex-row">
        
        <div className="relative flex w-full md:w-1/2 flex-col items-center justify-center bg-slate-100 p-8">
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br from-blue-200 to-purple-200`}></div>
            <img 
                src={pokemon.imageUrl} 
                alt={pokemon.name} 
                className="relative z-10 h-64 w-64 object-contain drop-shadow-2xl"
            />
        </div>

        <div className="relative w-full md:w-1/2 p-8">
            <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-800">✕</button>
            
            <h2 className="text-3xl font-black capitalize text-slate-800 mb-1">{pokemon.name}</h2>
            <p className="text-slate-400 font-mono text-sm mb-6">ID: #{pokemon.id.padStart(4, '0')}</p>

            {loading ? (//si se están cargando los detalles del pokemon, mostramos un mensaje de carga
                <div className="py-10 text-center text-slate-500 font-medium">Leyendo datos de la Pokédex...</div>//si no se están cargando los detalles del pokemon, mostramos la información obtenida de la API
            ) : (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Descripción</h3>
                        <p className="text-sm leading-relaxed text-slate-600 italic border-l-4 border-blue-500 pl-3">
                            "{details.description}"
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Habilidades</h3>
                        <div className="flex flex-wrap gap-2">
                            {details.abilities.map((a: any) => (
                                <span key={a.ability.name} className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium capitalize text-slate-700">
                                    {a.ability.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded bg-slate-50 p-3 text-center">
                            <span className="block text-xs font-bold text-slate-400">Altura</span>
                            <span className="text-lg font-bold text-slate-700">{details.height / 10} m</span>
                        </div>
                        <div className="rounded bg-slate-50 p-3 text-center">
                            <span className="block text-xs font-bold text-slate-400">Peso</span>
                            <span className="text-lg font-bold text-slate-700">{details.weight / 10} kg</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}