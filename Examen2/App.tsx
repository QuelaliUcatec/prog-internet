import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Loader2, Zap, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Send, Bot, Sparkles } from 'lucide-react';

// --- CONFIGURACIÓN Y CONSTANTES ---

const POKEMON_ENTRIES = [
  1, 2, 4, 5, 7, 8, 10, 11, 23, 24, 26, 280, 281, 475, 696, 142, 120, 
  374, 375, 371, 372, 656, 657, 255, 256, 129, 92, 93, 101, 16, 17, 
  387, 388, 447, 443, 444, 220, 221, 252, 253, 393, 394, 96,
  'charizard', 'pikachu', 'gardevoir', 'seviper', 'heracross', 'tyrantrum', 
  'snorlax', 'eevee', 'starmie', 'metagross', 'salamence', 'greninja', 
  'blaziken', 'gyarados', 'gengar', 'voltorb', 'pidgeot', 'torterra',
  'kyogre', 'groudon', 'regigigas', 'mewtwo', 'lugia', 'ho-oh',
  'arceus', 'darkrai', 'cresselia', 'rayquaza', 'lucario', 'garchomp',
  'scizor', 'mamoswine', 'sceptile', 'empoleon', 'zapdos', 'articuno', 
  'moltres', 'venusaur', 'blastoise', 'hypno', 'butterfree'
];

const ITEMS_PER_PAGE = 12;

const TYPE_COLORS = {
  fire: '#ef4444', water: '#3b82f6', grass: '#22c55e', electric: '#eab308',
  psychic: '#ec4899', ice: '#06b6d4', dragon: '#8b5cf6', dark: '#475569',
  fairy: '#f472b6', normal: '#94a3b8', fighting: '#f97316', flying: '#818cf8',
  poison: '#a855f7', ground: '#d97706', rock: '#b45309', bug: '#84cc16',
  ghost: '#6366f1', steel: '#64748b'
};

const TYPE_TRANSLATIONS = {
  'fuego': 'fire', 'agua': 'water', 'planta': 'grass', 'electrico': 'electric',
  'eléctrico': 'electric', 'psiquico': 'psychic', 'psíquico': 'psychic',
  'hielo': 'ice', 'dragon': 'dragon', 'dragón': 'dragon', 'siniestro': 'dark',
  'oscuro': 'dark', 'hada': 'fairy', 'normal': 'normal', 'lucha': 'fighting',
  'volador': 'flying', 'veneno': 'poison', 'tierra': 'ground', 'roca': 'rock',
  'bicho': 'bug', 'fantasma': 'ghost', 'acero': 'steel'
};

// --- COMPONENTES ---

const PokemonCard = ({ pokemon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`group relative bg-zinc-900 border border-white/5 rounded-3xl p-5 flex flex-col transition-all duration-500 ${isExpanded ? 'ring-2 ring-blue-600 scale-[1.02] z-20 shadow-[0_0_40px_rgba(37,99,235,0.2)]' : 'hover:border-blue-500/40 hover:-translate-y-2'} animate-in fade-in slide-in-from-bottom-5 h-fit`}>
      <div className="flex justify-between items-start mb-3">
        <span className="font-mono text-[10px] text-zinc-500 tracking-widest font-black italic">
          #{pokemon.id.toString().padStart(4, '0')}
        </span>
        <div className="flex gap-1">
          {pokemon.types.map((t) => (
            <span 
              key={t.type.name} 
              className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-white tracking-wider"
              style={{ backgroundColor: TYPE_COLORS[t.type.name] || '#333' }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center py-6 bg-black/40 rounded-2xl mb-4 group-hover:bg-blue-600/5 transition-colors overflow-hidden border border-white/5">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name} 
          className="w-36 h-36 z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] font-black text-5xl uppercase pointer-events-none select-none italic -rotate-12">
          {pokemon.name}
        </div>
      </div>

      <h3 className="font-black text-2xl capitalize text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tighter">
        {pokemon.name}
      </h3>
      
      <div className="relative mb-4">
        <p className={`text-xs text-zinc-400 leading-relaxed transition-all duration-300 text-justify ${isExpanded ? 'line-clamp-none opacity-100' : 'line-clamp-2 opacity-60'}`}>
          {pokemon.description}
        </p>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-blue-500 hover:text-blue-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all bg-blue-500/5 px-3 py-1.5 rounded-full border border-blue-500/20"
        >
          {isExpanded ? (
            <>Cerrar <ChevronUp size={14} /></>
          ) : (
            <>Ver Datos <ChevronDown size={14} /></>
          )}
        </button>
      </div>

      <div className="space-y-3 mb-4 text-xs font-bold">
        <div className="flex justify-between text-zinc-600 uppercase tracking-tighter">
          <span>Nivel de Energía</span>
          <span className="text-blue-500">{pokemon.base_experience || 100} PX</span>
        </div>
        <div className="w-full bg-black h-2 rounded-full border border-white/5 p-[2px]">
          <div 
            className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
            style={{ width: `${Math.min((pokemon.base_experience / 340) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-auto border-t border-white/5 pt-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[9px] text-zinc-600 uppercase font-black mb-2">Vulnerabilidad</p>
            <div className="flex flex-wrap gap-1">
              {pokemon.weaknesses.slice(0, 3).map(w => (
                <span key={w} className="text-[9px] border border-red-500/40 text-red-500 px-1.5 py-0.5 rounded-md uppercase font-black">
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-zinc-600 uppercase font-black mb-2">Mutación</p>
            <p className={`text-[10px] font-black tracking-widest ${pokemon.hasMega ? 'text-pink-500 animate-pulse' : 'text-zinc-800'}`}>
              {pokemon.hasMega ? '✦ MEGA EV' : 'NORMAL'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente PokeChatBot
 * Ahora utiliza una lista dinámica de URLs para asegurar la conexión con la IA.
 */
const PokeChatBot = ({ isOpen, onClose, pokemonData }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Vínculo neuronal establecido! Soy el Nexo de IA. Tengo acceso a tu Pokédex. ¿En qué Pokémon deseas profundizar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /**
   * Lógica de envío de mensajes con manejo de múltiples endpoints (APIs).
   */
  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const contextData = pokemonData.map(p => ({
      nombre: p.name,
      tipos: p.types.map(t => t.type.name).join(', '),
      id: p.id
    })).slice(0, 50);

    const systemPrompt = `Eres el Nexo de IA de esta Pokédex futurista. 
    CONTEXTO ACTUAL: ${JSON.stringify(contextData)}.
    Responde en Español, con estilo técnico y avanzado. Usa Markdown.`;

    // --- INTEGRACIÓN DE MÚLTIPLES URLS DE API ---
    // Definimos los endpoints disponibles para mayor resiliencia
    const apiEndpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=`
    ];

    let success = false;
    let finalBotResponse = "";

    // Intentamos conectar con las APIs disponibles
    for (const baseUrl of apiEndpoints) {
      if (success) break;

      try {
        const apiKey = ""; // Se inyecta automáticamente por el entorno
        const response = await fetch(`${baseUrl}${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (response.ok) {
          const result = await response.json();
          finalBotResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (finalBotResponse) success = true;
        }
      } catch (error) {
        console.warn(`Fallo en endpoint: ${baseUrl}`);
      }
    }

    if (success) {
      setMessages(prev => [...prev, { role: 'bot', text: finalBotResponse }]);
    } else {
      setMessages(prev => [...prev, { role: 'bot', text: "Error de enlace: Todas las terminales de IA están fuera de línea. Intente más tarde." }]);
    }
    
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8 pointer-events-none">
      <div className="w-full max-w-lg h-[85vh] sm:h-[680px] bg-black border border-blue-600/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col pointer-events-auto overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="bg-zinc-900/80 border-b border-white/5 p-6 flex justify-between items-center relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/40 rounded-2xl flex items-center justify-center">
              <Bot className="text-blue-500" size={28} />
            </div>
            <div>
              <h2 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                SISTEMA NEXO <Sparkles size={14} className="text-yellow-500 animate-pulse" />
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase tracking-widest">Enlace Multi-API Activo</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white hover:bg-white/5 p-2.5 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-black custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3`}>
              <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-[13px] shadow-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none border border-blue-400/20' 
                  : 'bg-zinc-900 text-zinc-200 border border-white/5 rounded-tl-none font-sans whitespace-pre-wrap'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 p-5 rounded-3xl rounded-tl-none border border-white/5 flex gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-zinc-900/50 backdrop-blur-xl border-t border-white/5">
          <div className="relative flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Consultar red de datos..."
              className="flex-1 bg-black border border-zinc-800 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-20 text-white p-4 rounded-2xl transition-all"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueEntries = Array.from(new Set(POKEMON_ENTRIES));
        const promises = uniqueEntries.map(async (idOrName) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
            if (!res.ok) return null;
            const data = await res.json();
            const speciesRes = await fetch(data.species.url);
            const speciesData = await speciesRes.json();

            const weaknessSet = new Set();
            for (const t of data.types) {
              const typeInfo = await fetch(t.type.url).then(r => r.json());
              typeInfo.damage_relations.double_damage_from.forEach(w => weaknessSet.add(w.name));
            }

            const descriptions = speciesData.flavor_text_entries
              .filter(e => e.language.name === 'es')
              .map(e => e.flavor_text.replace(/[\n\f]/g, ' '));
            const finalDesc = [...new Set(descriptions)].slice(0, 3).join(' ') || "Sin descripción disponible.";
            const hasMega = speciesData.varieties.some(v => v.pokemon.name.includes('-mega'));

            return { ...data, description: finalDesc, weaknesses: Array.from(weaknessSet), hasMega };
          } catch (e) { return null; }
        });
        const results = await Promise.all(promises);
        setPokemonList(results.filter(p => p !== null).sort((a, b) => a.id - b.id));
        setLoading(false);
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  const filteredPokemon = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return pokemonList;
    return pokemonList.filter(p => {
      const matchesName = p.name.toLowerCase().includes(term);
      const matchesId = p.id.toString().includes(term);
      const translatedType = TYPE_TRANSLATIONS[term] || term;
      const matchesType = p.types.some(t => t.type.name.toLowerCase() === translatedType);
      return matchesName || matchesId || matchesType;
    });
  }, [searchTerm, pokemonList]);

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPokemon.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredPokemon]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans pb-20 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5 group cursor-pointer">
            <div className="w-14 h-14 bg-blue-700 rounded-3xl rotate-6 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                REACCIÓN <span className="text-blue-600">POKÉDEX</span>
              </h1>
              <span className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase italic">Sistema Multi-API v4.0</span>
            </div>
          </div>

          <div className="relative w-full max-w-lg group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
            <input 
              type="text" 
              placeholder="Nombre o tipo..."
              className="w-full bg-zinc-900/40 border border-zinc-800 text-white rounded-[2rem] py-4 pl-14 pr-6 outline-none text-sm focus:ring-2 focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-56">
            <Loader2 className="w-20 h-20 text-blue-600 animate-spin mb-4" />
            <p className="text-[10px] tracking-[0.6em] text-blue-500 animate-pulse uppercase font-black">Escaneando Red...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {currentData.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
            </div>

            {totalPages > 1 && (
              <div className="mt-24 flex items-center justify-center gap-6">
                <button 
                  onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo(0,0); }}
                  disabled={currentPage === 1}
                  className="p-5 rounded-3xl bg-zinc-900 border border-white/5 text-white disabled:opacity-10 hover:bg-blue-700 transition-all"
                >
                  <ChevronLeft size={28} />
                </button>
                <div className="px-8 py-4 bg-blue-600/5 border border-blue-600/30 rounded-3xl text-blue-500 font-black text-xl italic">
                  {currentPage} / {totalPages}
                </div>
                <button 
                  onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0,0); }}
                  disabled={currentPage === totalPages}
                  className="p-5 rounded-3xl bg-zinc-900 border border-white/5 text-white disabled:opacity-10 hover:bg-blue-700 transition-all"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-12 right-12 w-20 h-20 bg-blue-600 rounded-[2rem] shadow-[0_15px_60px_rgba(37,99,235,0.6)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 z-50 border-[4px] border-black"
      >
        <Zap className="text-white w-8 h-8 fill-current" />
      </button>

      <PokeChatBot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        pokemonData={pokemonList}
      />
    </div>
  );
}