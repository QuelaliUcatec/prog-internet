import React, { useEffect, useState } from 'react';
import './index.css';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import type { PokemonBase } from './types/pokemon';

// --- CONFIGURACIÓN ---
const PAGE_LIMIT = 20;
const MAX_POKEMON_ID = 1025; 
// Para evitar problemas con Pokémon que aún no existen, limitamos a 1025 (último ID conocido).

// IDs de los "Favoritos" para la página de inicio
const HERO_IDS = [25, 6, 150, 448, 658, 133, 94, 384, 249, 493]; 

// Tipos en Español para el menú desplegable
const TYPE_OPTIONS = [// El valor 'val' es el que se usa para la API, 'label' es lo que se muestra al usuario
  { val: 'normal', label: 'Normal' },
  { val: 'fire', label: 'Fuego' },
  { val: 'water', label: 'Agua' },
  { val: 'grass', label: 'Planta' },
  { val: 'electric', label: 'Eléctrico' },
  { val: 'ice', label: 'Hielo' },
  { val: 'fighting', label: 'Lucha' },
  { val: 'poison', label: 'Veneno' },
  { val: 'ground', label: 'Tierra' },
  { val: 'flying', label: 'Volador' },
  { val: 'psychic', label: 'Psíquico' },
  { val: 'bug', label: 'Bicho' },
  { val: 'rock', label: 'Roca' },
  { val: 'ghost', label: 'Fantasma' },
  { val: 'dragon', label: 'Dragón' },
  { val: 'steel', label: 'Acero' },
  { val: 'fairy', label: 'Hada' },
];

// Fondos
const BG_GRADIENTS: Record<string, string> = {// Puedes ajustar estos colores a tu gusto
  home: 'bg-slate-100',
  fire: 'bg-gradient-to-br from-orange-50 to-red-100',
  water: 'bg-gradient-to-br from-blue-50 to-cyan-100',
  grass: 'bg-gradient-to-br from-green-50 to-lime-100',
  electric: 'bg-gradient-to-br from-yellow-50 to-amber-100',
  psychic: 'bg-gradient-to-br from-purple-50 to-fuchsia-100',
  default: 'bg-slate-100'
};

export default function App() {// --- ESTADOS PRINCIPALES ---
  const [view, setView] = useState<'home' | 'type-grid' | 'search'>('home');// Para controlar qué vista se muestra: inicio, tipo o búsqueda
  const [selectedType, setSelectedType] = useState<string>('');// Para saber qué tipo está seleccionado (si es que hay alguno) y así mostrar el fondo correcto.
  const [searchQuery, setSearchQuery] = useState('');// Para controlar el valor del input de búsqueda y mostrarlo en el título de resultados.

  const [pokemons, setPokemons] = useState<PokemonBase[]>([]);// Lista de Pokémon que se muestran actualmente en pantalla, ya sea por tipo o por búsqueda.
  const [loading, setLoading] = useState(false);// Para mostrar un estado de carga mientras se obtienen los datos de la API.
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(0);// Para controlar la página actual cuando se muestra la vista de tipo. Se reinicia a 0 cada vez que se selecciona un nuevo tipo.
  const [typeTotalList, setTypeTotalList] = useState<any[]>([]);// Al seleccionar un tipo, la API devuelve una lista completa de Pokémon de ese tipo (con nombre y URL). Guardamos esa lista completa aquí para luego paginarla localmente sin tener que volver a llamar a la API cada vez que cambiamos de página.

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonBase | null>(null);// Para controlar qué Pokémon se muestra en el modal. Si es null, el modal está cerrado. Si tiene un valor, el modal se abre mostrando los detalles de ese Pokémon.

  // --- 1. CARGAR HOME PAGE ---
  const loadHome = async () => {// Cargamos los Pokémon "favoritos" definidos en HERO_IDS para la página de inicio. Esto se hace al cargar la app por primera vez y también al hacer clic en el logo.
    setLoading(true);// Activamos el estado de carga mientras obtenemos los datos.
    setView('home');// Cambiamos a la vista de inicio.
    setSelectedType('');// Reiniciamos el tipo seleccionado para que el fondo vuelva al normal.
    setSearchQuery(''); // Reiniciamos la búsqueda para que el input quede vacío.
    try {
      const promises = HERO_IDS.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json()));
      const results = await Promise.all(promises);
      setPokemons(results.map(normalizePokemonData));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. CARGAR POR TIPO (CON FILTRO 1025) ---
  const loadByType = async (type: string) => {
    setLoading(true);
    setView('type-grid');
    setSelectedType(type);
    setCurrentPage(0);
    setSearchQuery('');
    
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      
      // FILTRO CRÍTICO:
      // La API devuelve una lista de { pokemon: { name, url } }
      // Extraemos el ID de la URL y si es > 1025, lo ignoramos.
      const validPokemons = data.pokemon
        .map((p: any) => p.pokemon)
        .filter((p: any) => {// Extraemos el ID de la URL para validar que no sea mayor a 1025, la => se hace para evitar problemas con Pokémon que aún no existen.
           const parts = p.url.split('/');
           const id = parseInt(parts[parts.length - 2]); // obtener ID de la URL
           return id <= MAX_POKEMON_ID;
        });

      setTypeTotalList(validPokemons);
      
      // Cargar primera página
      await fetchPageForType(validPokemons, 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchPageForType = async (fullList: any[], page: number) => {
    const start = page * PAGE_LIMIT;
    const end = start + PAGE_LIMIT;
    const slice = fullList.slice(start, end);

    const promises = slice.map(async (p: any) => {
        const res = await fetch(p.url);
        return res.json();
    });
    
    const results = await Promise.all(promises);
    setPokemons(results.map(normalizePokemonData));
  };

  // --- 3. BUSCADOR (Validando ID) ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Si el usuario escribe un número mayor a 1025, no buscar.
    const potentialId = parseInt(searchQuery);
    if (!isNaN(potentialId) && potentialId > MAX_POKEMON_ID) {
        alert("¡Ese Pokémon aún no existe! El límite es 1025.");
        return;
    }

    setLoading(true);
    setView('search');
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      if (!res.ok) throw new Error('No encontrado');
      const data = await res.json();

      // Doble verificación del ID recibido
      if (data.id > MAX_POKEMON_ID) {
         throw new Error('Fuera de rango');
      }

      setPokemons([normalizePokemonData(data)]);
    } catch (error) {
      setPokemons([]); 
    } finally {
      setLoading(false);
    }
  };

  const normalizePokemonData = (data: any): PokemonBase => ({
    id: data.id.toString(),
    name: data.name,
    imageUrl: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map((t: any) => t.type.name),
  });// Esta función toma la respuesta cruda de la API y la transforma en el formato que usamos en nuestra app (PokemonBase). Esto nos permite tener un control total sobre qué datos usamos y cómo los nombramos, además de evitar problemas si la API cambia su estructura.

  useEffect(() => {
    if (view === 'type-grid' && typeTotalList.length > 0) {
        setLoading(true);
        fetchPageForType(typeTotalList, currentPage).then(() => setLoading(false));
    }
  }, [currentPage]);// Cada vez que cambiamos de página en la vista de tipo, cargamos los datos correspondientes a esa página. Esto se hace localmente usando la lista completa que guardamos en typeTotalList, sin necesidad de volver a llamar a la API para obtener la lista completa cada vez.

  useEffect(() => { loadHome(); }, []);// Al cargar la app por primera vez, mostramos la página de inicio con los Pokémon favoritos.

  const currentBg = (view === 'type-grid' && selectedType) 
    ? (BG_GRADIENTS[selectedType] || BG_GRADIENTS.default)
    : BG_GRADIENTS.home;

  return (
    <div className={`min-h-screen p-8 transition-colors duration-700 ${currentBg}`}>
      
      {/* HEADER */}
      <header className="mx-auto max-w-6xl mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="text-center md:text-left cursor-pointer" onClick={loadHome}>
          <h1 className="text-4xl font-black text-slate-800 uppercase tracking-widest drop-shadow-sm">
            Poké<span className="text-blue-600">Galery</span>
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-widest mt-1">COLECCIÓN DE CARTAS</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Selector de Tipo (Labels en Español) */}
          <select 
            value={selectedType} // El valor del selector se controla con selectedType, que se actualiza al cambiar el tipo. Esto permite que el selector muestre el tipo actualmente seleccionado y también que podamos resetearlo al cargar el home.
            onChange={(e) => loadByType(e.target.value)}// Al cambiar el tipo, cargamos la vista de tipo correspondiente.
            className="px-4 py-2 rounded-lg border-2 border-slate-200 bg-white font-bold text-slate-600 focus:border-blue-500 focus:outline-none uppercase"
          >
            <option value="" disabled>Filtrar por Tipo</option>
            {TYPE_OPTIONS.map(t => (// Mostramos las opciones del selector usando la lista TYPE_OPTIONS, que tiene los valores para la API y las etiquetas en español. Esto hace que el código sea más limpio y fácil de mantener.
                <option key={t.val} value={t.val}>{t.label}</option>// El valor que se envía a la función loadByType es el valor 'val' de cada tipo, que es el que la API espera. La etiqueta que se muestra al usuario es 'label', que está en español.
            ))}
          </select>

          <form onSubmit={handleSearch} className="flex">
            <input 
              type="text" 
              placeholder="Buscar (ej. Pikachu)..."
              value={searchQuery}// El valor del input de búsqueda se controla con searchQuery, que se actualiza al escribir. Esto permite mostrar el texto que el usuario está escribiendo y también resetearlo al cargar el home.
              onChange={(e) => setSearchQuery(e.target.value)}// Al enviar el formulario, se ejecuta la función handleSearch, que maneja la lógica de búsqueda. El valor que se busca es el contenido de searchQuery, que puede ser un nombre o un ID.
              className="px-4 py-2 rounded-l-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none w-full md:w-48"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-lg font-bold hover:bg-blue-700 transition">
              ⌕
            </button>
          </form>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-8 border-b-2 border-slate-200 pb-2 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-slate-700 uppercase">
                {view === 'home' && " Salón de la Fama"}
                {view === 'type-grid' && `Catálogo: ${TYPE_OPTIONS.find(t => t.val === selectedType)?.label || selectedType}`}
                {view === 'search' && `Resultados de: ${searchQuery}`}
            </h2>
            {view === 'type-grid' && (
                <span className="text-sm font-mono text-slate-500">
                    Pág {currentPage + 1} / {Math.ceil(typeTotalList.length / PAGE_LIMIT)}
                </span>
            )}
        </div>

        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 rounded-xl bg-slate-200/50 border-2 border-slate-200"></div>
              ))}
           </div>
        ) : (
           <>
             {pokemons.length === 0 ? (
                 <div className="text-center py-20 text-slate-400 font-bold text-xl">
                    No encontramos ningún Pokémon con esos datos.
                 </div>
             ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {pokemons.map((poke) => (
                    <PokemonCard 
                        key={poke.id} 
                        pokemon={poke} 
                        onClick={() => setSelectedPokemon(poke)} 
                    />
                    ))}
                </div>
             )}
           </>
        )}

        {/* PAGINACIÓN */}
        {view === 'type-grid' && !loading && pokemons.length > 0 && (
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="rounded-full bg-white px-6 py-3 font-bold text-slate-700 shadow-md hover:bg-slate-50 disabled:opacity-50"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={(currentPage + 1) * PAGE_LIMIT >= typeTotalList.length}
              className="rounded-full bg-slate-800 px-6 py-3 font-bold text-white shadow-md hover:bg-black disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>
        )}

      </div>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
}