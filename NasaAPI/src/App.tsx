import { useState, useEffect } from 'react';
// Importamos solo el tipo para cumplir con verbatimModuleSyntax
import type { NasaItem } from './types';

function App() {
  const [query, setQuery] = useState('Nebulosa');
  const [images, setImages] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- TRADUCTOR MANUAL (Local y rápido) ---
  const traducirABusqueda = (texto: string) => {
    const diccionario: Record<string, string> = {
      "marte": "mars", "tierra": "earth", "jupiter": "jupiter",
      "saturno": "saturn", "sol": "sun", "luna": "moon", 
      "nebulosa": "nebula", "galaxia": "galaxy", "estrellas": "stars",
      "agujero negro": "black hole", "universo": "universe"
    };
    return diccionario[texto.toLowerCase().trim()] || texto;
  };

  // --- SERVICIO GET: Obtener datos de la NASA ---
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    const searchTerm = traducirABusqueda(query);

    try {
      const res = await fetch(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`);
      const data = await res.json();
      const items = data.collection.items.slice(0, 9);

      if (items.length === 0) {
        setError(`No se encontraron resultados para "${query}".`);
        setImages([]);
        return;
      }

      const formatted: NasaItem[] = items.map((item: any) => ({
        nasa_id: item.data[0].nasa_id,
        title: item.data[0].title,
        description: item.data[0].description?.substring(0, 180) + '...',
        imageUrl: item.links[0].href,
        date: new Date(item.data[0].date_created).toLocaleDateString('es-ES')
      }));

      setImages(formatted);
    } catch (err) {
      setError("Error de conexión con la NASA.");
    } finally {
      setLoading(false);
    }
  };

  // --- SERVICIO POST: Guardar favorito (Simulado) ---
  const handleSave = async (item: NasaItem) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          nasa_id: item.nasa_id,
          savedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`🚀 ¡"${item.title}" guardado! ID de registro: ${result.id}`);
      }
    } catch (error) {
      alert("❌ Error al procesar el POST.");
    }
  };

  // Búsqueda inicial al cargar
  useEffect(() => { handleSearch(); }, []);

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 font-sans">
      {/* Fondo con gradiente Tailwind 4 */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#1e1b4b,#050814_60%)] -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-3xl font-black tracking-tighter text-blue-400 uppercase">
            Archivo <span className="text-white font-light">NASA</span>
          </h1>

          <form onSubmit={handleSearch} className="w-full md:w-96 relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3 px-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Buscar (ej: Galaxia, Marte...)"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-xl hover:bg-blue-500 transition-colors">
              🔍
            </button>
          </form>
        </div>
      </header>

      {/* Resultados */}
      <main className="max-w-6xl mx-auto p-8">
        {loading ? (
          <div className="flex flex-col items-center py-20 animate-pulse">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs font-mono text-blue-400 tracking-widest uppercase">Escaneando Cosmos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/10 border border-red-800/40 text-red-200 p-8 rounded-3xl text-center italic">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img) => (
              <div key={img.nasa_id} className="group bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all">
                <div className="h-52 overflow-hidden relative">
                  <img src={img.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={img.title} />
                  <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-[10px]">{img.date}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{img.title}</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-3 italic mb-4">{img.description}</p>
                  
                  <button 
                    onClick={() => handleSave(img)}
                    className="w-full bg-blue-600/10 hover:bg-blue-600 border border-blue-600/30 py-2 rounded-xl text-[10px] font-bold transition-all uppercase"
                  >
                    Guardar Favorito (POST)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;