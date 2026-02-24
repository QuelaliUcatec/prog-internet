import { useState, useEffect, useMemo } from 'react'

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string } }
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  description?: string;
}

export default function App() {
  const [allPokemonRefs, setAllPokemonRefs] = useState<{name: string, url: string}[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  
  const [typeFilter, setTypeFilter] = useState('');
  const [letterFilter, setLetterFilter] = useState('');

  const itemsPerPage = 12;
  const types = ['fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon'];

  // 1. Initial Load: Fetch master list of names and URLs (IDs 1-386)
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=386')
      .then(res => res.json())
      .then(data => setAllPokemonRefs(data.results));
  }, []);

  const fetchDescription = async (id: number): Promise<string> => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const data = await res.json();
      const entry = data.flavor_text_entries.find((e: any) => e.language.name === 'en');
      return entry ? entry.flavor_text.replace(/[\f\n\r]/gm, " ") : "No description available.";
    } catch { return "Data error."; }
  };

  // 2. Smart Loading Logic: Filters and Pagination
  useEffect(() => {
    const updateDisplay = async () => {
      setLoading(true);
      
      // Filter the master list based on global search filters
      let filteredRefs = allPokemonRefs.filter(p => {
        const matchesLetter = letterFilter === '' || p.name.startsWith(letterFilter.toLowerCase());
        return matchesLetter;
      });

      // Paginate the filtered results
      const offset = page * itemsPerPage;
      const paginatedRefs = filteredRefs.slice(offset, offset + itemsPerPage);

      const detailedData = await Promise.all(
        paginatedRefs.map(async (p: any) => {
          const pokemonRes = await fetch(p.url);
          const pokemonData = await pokemonRes.json();
          const description = await fetchDescription(pokemonData.id);
          return { ...pokemonData, description };
        })
      );

      // Apply type filtering after retrieving details
      const finalData = typeFilter === '' 
        ? detailedData 
        : detailedData.filter(p => p.types.some(t => t.type.name === typeFilter));

      setDisplayedPokemons(finalData);
      if (finalData.length > 0) setSelected(finalData[0]);
      setLoading(false);
    };

    if (allPokemonRefs.length > 0) updateDisplay();
  }, [allPokemonRefs, page, letterFilter, typeFilter]);

  // Reset page to 0 when filters are changed
  useEffect(() => { setPage(0); }, [letterFilter, typeFilter]);

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4 font-mono">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl max-h-[95vh] lg:h-[88vh]">
        
        {/* LEFT PANEL: DETAILS */}
        <div className="flex-1 lg:flex-[0.7] bg-[#a5a5d6] border-[5px] border-black rounded-[40px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
          <div className="bg-[#c6c6e7] border-b-[5px] border-black p-3 text-center shrink-0">
            <h1 className="text-lg font-black italic uppercase tracking-widest">Information System</h1>
          </div>
          <div className="p-6 flex flex-col flex-1 space-y-4 overflow-y-auto scrollbar-hide">
            <div className="bg-[#d6e7ef] border-[5px] border-black rounded-3xl aspect-square w-full max-w-[240px] mx-auto flex items-center justify-center shadow-inner relative shrink-0">
              {selected && <img src={selected.sprites.other['official-artwork'].front_default} className="w-[85%] h-[85%] object-contain drop-shadow-md" alt="art" />}
            </div>
            <div className="bg-[#9090b0] border-[4px] border-black rounded-2xl p-4 shadow-inner">
              <div className="flex justify-between items-start mb-2 border-b-2 border-black/30 pb-1">
                <h2 className="text-2xl font-black italic uppercase leading-none text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] truncate">{selected?.name || "---"}</h2>
                <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded">#{selected?.id.toString().padStart(3, '0')}</span>
              </div>
              <p className="text-[11px] font-bold leading-tight text-black/80">{selected?.description}</p>
            </div>
            <div className="bg-[#c6c6e7] border-[4px] border-black rounded-2xl p-4 flex-1">
              <h3 className="text-[10px] font-black uppercase mb-3 italic opacity-60">Base Attributes</h3>
              {selected?.stats.map(s => (
                <div key={s.stat.name} className="flex items-center gap-3 mb-1.5">
                  <span className="text-[8px] font-black w-16 uppercase">{s.stat.name.replace('special-', 'S.')}</span>
                  <div className="flex-1 h-2.5 bg-black/10 border-2 border-black overflow-hidden shadow-inner">
                    <div className="h-full bg-black transition-all duration-500" style={{ width: `${(s.base_stat / 200) * 100}%` }}></div>
                  </div>
                  <span className="text-[8px] font-black w-6 text-right">{s.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: STORAGE BOX */}
        <div className="flex-1 lg:flex-[1.3] bg-[#f7ebd6] border-[5px] border-black rounded-[40px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col overflow-hidden">
          
          <div className="grid grid-cols-2 gap-4 mb-4 shrink-0">
            <div className="flex flex-col">
              <label className="text-[8px] font-black uppercase mb-1 ml-2 text-black/60">Global Search (First Letter)</label>
              <input 
                maxLength={1}
                placeholder="A-Z"
                value={letterFilter}
                onChange={(e) => setLetterFilter(e.target.value)}
                className="bg-[#a5c6e7] border-[3px] border-black rounded-xl p-2 text-[10px] font-black uppercase text-center outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-y-0.5 focus:shadow-none transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[8px] font-black uppercase mb-1 ml-2 text-black/60">Type Filter</label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-[#f7d6a5] border-[3px] border-black rounded-xl p-2 text-[10px] font-black uppercase cursor-pointer outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <option value="">All Types</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-[#c6e7ce] border-[4px] border-black rounded-2xl p-2 flex justify-between items-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
            <button onClick={() => setPage(p => Math.max(0, p-1))} className="font-black px-4 hover:scale-125 cursor-pointer disabled:opacity-20" disabled={page === 0}>◀</button>
            <span className="font-black italic uppercase tracking-[0.2em] text-sm">
              {letterFilter ? `Results for "${letterFilter}"` : `Box ${page + 1}`}
            </span>
            <button onClick={() => setPage(p => p+1)} className="font-black px-4 hover:scale-125 cursor-pointer disabled:opacity-20" disabled={displayedPokemons.length < itemsPerPage}>▶</button>
          </div>

          <div className="bg-[#8cb5a5] border-[5px] border-black rounded-[32px] p-6 relative flex-1 min-h-0 overflow-y-auto">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 0)', backgroundSize: '16px 16px' }}></div>
              
              {loading ? (
                 <div className="h-full flex items-center justify-center font-black animate-pulse uppercase text-black/40">Syncing database...</div>
              ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 relative z-10 h-full">
                   {displayedPokemons.map((p) => (
                     <div 
                       key={p.id}
                       onMouseEnter={() => setSelected(p)}
                       className={`aspect-square bg-white border-[3px] border-black rounded-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] 
                         ${selected?.id === p.id ? 'bg-[#f7d6a5] scale-110 shadow-none translate-x-[3px] translate-y-[3px]' : ''}`}
                     >
                       <img src={p.sprites.front_default} className="w-[85%] h-[85%] pixelated" alt={p.name} />
                     </div>
                   ))}
                   {displayedPokemons.length === 0 && (
                     <div className="col-span-full text-center py-20 font-black uppercase text-black/40 italic">No matches found in the registry</div>
                   )}
                 </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}