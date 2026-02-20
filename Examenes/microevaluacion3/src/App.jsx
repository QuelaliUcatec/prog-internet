import { useEffect, useState } from "react";

const typeColors = {
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-600",
  electric: "bg-yellow-400 text-black",
  poison: "bg-purple-600",
  bug: "bg-lime-600",
  normal: "bg-gray-400",
  flying: "bg-indigo-300 text-black",
  ground: "bg-amber-700",
  fairy: "bg-pink-300 text-black",
  fighting: "bg-red-800",
  psychic: "bg-pink-500",
  rock: "bg-stone-600",
  steel: "bg-gray-400",
  ice: "bg-cyan-300 text-black",
  ghost: "bg-purple-800",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-500",
};

const BOX_SIZE = 30;

export default function Pokedex() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentBox, setCurrentBox] = useState(0);
  const [boxPokemon, setBoxPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // 1. Cargar la lista completa de Pokémon (Nombres y URLs)
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        setAllPokemon(data.results);
        setLoading(false);
      });
  }, []);

  // 2. Cargar detalles cuando cambia la caja o la lista inicial
  useEffect(() => {
    if (allPokemon.length === 0) return;

    const fetchBoxDetails = async () => {
      setLoading(true);
      const start = currentBox * BOX_SIZE;
      const end = start + BOX_SIZE;
      const slice = allPokemon.slice(start, end);

      const promises = slice.map((p) => fetch(p.url).then((res) => res.json()));
      const results = await Promise.all(promises);

      setBoxPokemon(results);
      setLoading(false);
    };

    fetchBoxDetails();
  }, [currentBox, allPokemon]);

  const totalBoxes = Math.ceil(allPokemon.length / BOX_SIZE);

  return (
    <div className="h-screen w-screen bg-[#202020] text-white p-4 font-['Press_Start_2P'] flex flex-col overflow-hidden">
      {/* Contenedor Principal estilo Ventana - Full Height */}
      <div className="flex-1 w-full bg-[#e0e0e0] p-2 rounded-lg shadow-[0_0_0_4px_#505050] text-black flex flex-col overflow-hidden">

        {/* Encabezado Azul - Fixed Height */}
        <div className="bg-[#4860b0] text-white p-4 mb-2 rounded-t-lg shadow-inner flex justify-between items-center border-b-4 border-[#283058] shrink-0">
          <h1 className="text-xl md:text-2xl drop-shadow-md">POKEMON STORAGE</h1>
          <div className="text-xs md:text-sm">
            BOX {currentBox + 1}/{totalBoxes}
          </div>
        </div>

        {/* Contenido Principal - Flex Grow */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">
          {/* Columna Izquierda: Grid de la Caja - Scrollable */}
          <div className="flex-1 bg-[#f8f8f8] p-4 rounded border-4 border-[#808080] shadow-inner relative flex flex-col overflow-hidden">
            {/* Navegación de Caja - Fixed within Grid Container */}
            <div className="flex justify-between items-center mb-4 bg-[#d0d0d0] p-2 rounded border-2 border-white shadow shrink-0">
              <button
                onClick={() => setCurrentBox(prev => Math.max(0, prev - 1))}
                disabled={currentBox === 0}
                className="px-4 py-2 bg-[#f0f0f0] border-b-4 border-r-4 border-gray-400 active:border-0 hover:bg-white disabled:opacity-50 text-xs"
              >
                &lt; PREV
              </button>
              <span className="text-xs font-bold">BOX {currentBox + 1}</span>
              <button
                onClick={() => setCurrentBox(prev => Math.min(totalBoxes - 1, prev + 1))}
                disabled={currentBox === totalBoxes - 1}
                className="px-4 py-2 bg-[#f0f0f0] border-b-4 border-r-4 border-gray-400 active:border-0 hover:bg-white disabled:opacity-50 text-xs"
              >
                NEXT &gt;
              </button>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center text-xs animate-pulse">
                ACCESSING PC...
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {boxPokemon.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPokemon(p)}
                      className={`
                        cursor-pointer bg-white p-2 rounded border-2 aspect-square
                        ${selectedPokemon?.id === p.id ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}
                        flex flex-col items-center justify-center relative group transition-transform active:scale-95
                      `}
                    >
                      <span className="absolute top-1 left-2 text-[8px] text-gray-500">#{p.id}</span>
                      <img
                        src={p.sprites.front_default}
                        alt={p.name}
                        className="w-20 h-20 object-contain pixelated rendering-pixelated"
                      />
                      <div className="w-full bg-gray-800 text-white text-[8px] text-center py-1 truncate px-1 mt-1">
                        {p.name.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha: Detalles del Pokémon Seleccionado - Fixed Width/Scrollable on mobile */}
          <div className="w-full lg:w-96 bg-[#a0a8b0] p-1 rounded border-4 border-[#606060] shadow-xl flex flex-col shrink-0 h-48 lg:h-auto overflow-hidden">
            <div className="bg-[#e8e8e8] flex-1 border-2 border-[#808080] p-4 flex flex-col items-center shadow-inner relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {selectedPokemon ? (
                <>
                  <div className="w-full bg-[#303030] text-green-400 p-2 text-center text-xs mb-4 font-mono border-2 border-gray-500 rounded shrink-0">
                    INFO SCANNING...
                  </div>

                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 mb-4 shadow-inner shrink-0">
                    <img
                      src={selectedPokemon.sprites.front_default}
                      alt={selectedPokemon.name}
                      className="w-32 h-32 object-contain pixelated rendering-pixelated"
                    />
                  </div>

                  <h2 className="text-sm font-bold mb-2 shrink-0">
                    No.{String(selectedPokemon.id).padStart(3, '0')}
                  </h2>
                  <h3 className="text-xl text-[#303840] mb-4 capitalize font-bold shrink-0">{selectedPokemon.name}</h3>

                  <div className="flex gap-2 mb-6 flex-wrap justify-center shrink-0">
                    {selectedPokemon.types.map(t => (
                      <span key={t.type.name} className={`px-2 py-1 text-[10px] text-white rounded shadow border border-black/20 uppercase ${typeColors[t.type.name]}`}>
                        {t.type.name}
                      </span>
                    ))}
                  </div>

                  <div className="w-full space-y-3 bg-white p-4 rounded border border-gray-400 shadow-sm shrink-0">
                    {selectedPokemon.stats.map(s => (
                      <div key={s.stat.name} className="flex justify-between items-center text-[10px]">
                        <span className="uppercase text-gray-600 w-24 truncate">{s.stat.name.replace('-', ' ')}</span>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                          <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                            />
                          </div>
                          <span className="w-8 text-right font-bold">{s.base_stat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center space-y-4 opacity-50">
                  <div className="w-24 h-24 border-4 border-dashed border-gray-400 rounded-full animate-spin-slow" />
                  <p className="text-xs leading-6">
                    SELECT A POKEMON<br />TO SEE DATA
                  </p>
                </div>
              )}
            </div>

            <div className="h-12 bg-[#4860b0] mt-1 flex items-center justify-center text-white text-xs border-t-4 border-[#283058] shrink-0">
              <span>P5-AXIOS OS v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
