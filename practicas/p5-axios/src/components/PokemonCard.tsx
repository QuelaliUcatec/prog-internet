import React from 'react';
import type { PokemonBase } from '../types/pokemon';

const TYPE_TRANSLATIONS: Record<string, string> = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', grass: 'Planta',
  electric: 'Eléctrico', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', steel: 'Acero',
  fairy: 'Hada', dark: 'Siniestro'
};//Creamos la constante --- para traducir los tipos, es un objeto que muestra el tipo en ingles y su traducción al español. el record es regla de typescript para definir un objeto con claves de tipo string y valores de tipo string.
//la constante traduce los nombres de los tipos de pokemon del ingles al español, para mostrarlo en la carta de pokemon. cada clave es el nombre del tipo en ingles y su valor es la traducción al español. por ejemplo, 'fire' se traduce como 'Fuego', 'water' se traduce como 'Agua', etc.

const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-500 border-orange-600 shadow-orange-200',
  water: 'bg-blue-500 border-blue-600 shadow-blue-200',
  grass: 'bg-green-500 border-green-600 shadow-green-200',
  electric: 'bg-yellow-400 border-yellow-500 shadow-yellow-200',
  psychic: 'bg-purple-500 border-purple-600 shadow-purple-200',
  ice: 'bg-cyan-300 border-cyan-400 shadow-cyan-200',
  dragon: 'bg-indigo-600 border-indigo-700 shadow-indigo-300',
  dark: 'bg-slate-800 border-slate-900 shadow-slate-400',
  fairy: 'bg-pink-400 border-pink-500 shadow-pink-200',
  normal: 'bg-slate-400 border-slate-500 shadow-slate-200',
  fighting: 'bg-red-700 border-red-800 shadow-red-300',
  flying: 'bg-sky-300 border-sky-400 shadow-sky-200',
  poison: 'bg-violet-600 border-violet-700 shadow-violet-300',
  ground: 'bg-amber-600 border-amber-700 shadow-amber-300',
  rock: 'bg-stone-600 border-stone-700 shadow-stone-300',
  bug: 'bg-lime-500 border-lime-600 shadow-lime-200',
  ghost: 'bg-purple-800 border-purple-900 shadow-purple-400',
  steel: 'bg-slate-500 border-slate-600 shadow-slate-300',
};// Creamos la constante TYPE_COLORS para darle color a los tipos, es un objeto que relaciona el tipo en inglés con sus estilos visuales. El Record<string, string> es la regla de TypeScript para definir un objeto con claves de tipo string y valores de tipo string.
// La constante asigna los colores representativos de cada tipo de Pokémon para diseñar la carta de Pokémon (color de fondo, borde y sombra usando clases de Tailwind CSS). Cada clave es el nombre del tipo en inglés y su valor son las clases de diseño. Por ejemplo, 'fire' aplica un fondo naranja ('bg-orange-500'), 'water' aplica tonos azules, etc.

interface PokemonCardProps {
  pokemon: PokemonBase;
  onClick: () => void;
}// Creamos la interfaz PokemonCardProps para definir los datos (props) que necesita recibir el componente de la carta del Pokémon. Una 'interface' es una regla de TypeScript que dicta la forma exacta que debe tener un objeto.
// Esta interfaz exige que al crear una carta se le pasen dos cosas: 'pokemon', que debe contener la información del Pokémon (siguiendo la estructura PokemonBase), y 'onClick', que es una función vacía (() => void) que se ejecutará cuando el usuario haga clic en la carta, ideal para abrir sus detalles.

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const mainType = pokemon.types[0] || 'normal';// Obtenemos el tipo principal del Pokémon (el primero en su lista) para definir el color principal de su carta. Si por alguna razón el dato viene vacío, le asignamos 'normal' por defecto (usando || 'normal').
  const themeClass = TYPE_COLORS[mainType] || TYPE_COLORS['normal'];// Usamos el tipo principal para obtener las clases de color correspondientes de la constante TYPE_COLORS. Si el tipo no se encuentra en la constante, se asigna el tema de 'normal' como respaldo.



  return (
     <div 
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border-4 bg-white transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl ${themeClass.split(' ')[1]} ${themeClass.split(' ')[2]}`}// Creamos el componente PokemonCard que recibe las props definidas en la interfaz. El componente es un div que actúa como la carta del Pokémon, con varias clases de Tailwind CSS para su diseño y efectos visuales. 
      //Usamos el símbolo $ junto con llaves ${} dentro de comillas invertidas (backticks ` `) para inyectar código JavaScript directamente adentro de un texto. 
      // En este caso, nos permite mezclar las clases fijas de Tailwind (como 'group relative bg-white') con clases dinámicas o variables (como los colores del borde y sombra que extraemos de themeClass).
    >
      <div className={`absolute inset-0 opacity-10 ${themeClass.split(' ')[0]}`} />

      {/* Cabecera */}
      <div className="relative flex items-center justify-between bg-slate-100/80 px-3 py-1 backdrop-blur-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 truncate">
          {pokemon.name}
        </h2>
        <span className="font-mono text-xs font-bold text-slate-500">
          HP {Math.floor(Math.random() * 50) + 50}
        </span>
      </div>

      {/* Imagen */}
      <div className="relative z-10 m-2 flex h-48 items-center justify-center rounded bg-white/50 shadow-inner">
        <div className={`absolute h-32 w-32 rounded-full opacity-20 blur-2xl ${themeClass.split(' ')[0]}`}></div>
        <img 
          src={pokemon.imageUrl} 
          alt={pokemon.name}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
        />
      </div>

      {/* Pie de carta traducido */}
      <div className="relative p-3 pt-0">
        <div className="mb-2 flex justify-center gap-2">
           {pokemon.types.map(t => (
             <span key={t} className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm ${TYPE_COLORS[t]?.split(' ')[0] || 'bg-slate-400'}`}>
               {TYPE_TRANSLATIONS[t] || t}
             </span>
           ))}
        </div>
        
        <div className="flex justify-between items-center mt-3 border-t border-slate-200 pt-2">
            <span className="text-xs font-mono text-slate-400">#{pokemon.id}</span>
            <p className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
               VER CARTA
            </p>
        </div>
      </div>
    </div>
  );
}