import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Image as ImageIcon, Rocket, Info, Loader2, Satellite } from 'lucide-react';

/**
 * COMPONENTE PRINCIPAL: NASA Explorer
 * Este centro de control utiliza la API oficial de la NASA para:
 * 1. GET: Obtener la "Imagen Astronómica del Día" (APOD).
 * 2. GET con Parámetros: Buscar imágenes en el archivo de la NASA.
 */
export default function App() {
  // --- Estados de la Misión ---
  const [apod, setApod] = useState(null); // Imagen del día
  const [searchQuery, setSearchQuery] = useState(''); // Término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Resultados de búsqueda
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  // NOTA: En un entorno de producción, la API KEY se guarda en variables de entorno (.env)
  // 'DEMO_KEY' es gratuita pero tiene límites de uso.
  const NASA_API_KEY = 'DEMO_KEY'; 

  /**
   * EFECTO INICIAL: Obtener la imagen del día (APOD)
   * Se ejecuta una sola vez al cargar el componente.
   */
  useEffect(() => {
    const fetchApod = async () => {
      setLoading(true);
      try {
        // Petición GET básica a la API de la NASA
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        setApod(response.data);
      } catch (error) {
        console.error("Error conectando con la base terrestre (APOD):", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApod();
  }, []);

  /**
   * FUNCIÓN DE BÚSQUEDA: Consultar el archivo de imágenes de la NASA
   * Utiliza el endpoint de búsqueda con parámetros de consulta.
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setSearching(true);
    try {
      // Petición GET a la biblioteca de imágenes de la NASA (NASA Image and Video Library)
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`
      );
      // Extraemos solo los primeros 6 resultados para optimizar el rendimiento
      setSearchResults(response.data.collection.items.slice(0, 6));
    } catch (error) {
      console.error("Fallo en la búsqueda espacial:", error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      
      {/* --- Navegación Superior --- */}
      <nav className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Rocket className="text-blue-500 group-hover:rotate-45 transition-transform" />
            <span className="font-black tracking-widest text-xl uppercase">Nasa<span className="text-blue-500">Explorer</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1"><Satellite size={14}/> STATUS: CONNECTED</span>
            <span className="flex items-center gap-1 text-green-500 underline decoration-green-500/30">API: OPERATIONAL</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        
        {/* --- Sección APOD (Imagen del día) --- */}
        <section className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl">
          {loading ? (
            <div className="h-[500px] flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : apod && (
            <div className="grid lg:grid-cols-2">
              <div className="h-[300px] lg:h-[500px]">
                <img 
                  src={apod.url} 
                  alt={apod.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest w-fit border border-blue-500/20">
                  <ImageIcon size={12} /> Imagen del día
                </div>
                <h2 className="text-3xl font-bold leading-tight">{apod.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-6 italic">
                  "{apod.explanation}"
                </p>
                <div className="pt-4 flex items-center gap-4 text-xs font-mono text-zinc-500">
                  <span>FECHA: {apod.date}</span>
                  <span className="text-zinc-700">|</span>
                  <span>NASA JS-SYSTEM v2.5</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* --- Buscador de Archivos --- */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold uppercase tracking-tighter">Buscador de Archivos Cósmicos</h3>
            <p className="text-zinc-500 text-sm">Explora la inmensa base de datos de imágenes de misiones espaciales</p>
          </div>

          {/* Formulario de Búsqueda */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text"
                placeholder="Ej: Mars, Apollo 11, Galaxy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
            </div>
            <button 
              type="submit"
              disabled={searching}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {searching ? <Loader2 className="animate-spin" size={18} /> : "Explorar"}
            </button>
          </form>

          {/* Resultados de la Búsqueda */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((item, index) => (
              <div key={index} className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.links[0].href} 
                    alt={item.data[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm truncate uppercase tracking-tight">{item.data[0].title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <Info size={12} />
                    <span>NASA ID: {item.data[0].nasa_id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!searching && searchResults.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-600 font-mono text-sm">Esperando parámetros de búsqueda...</p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/5 py-10 mt-20 text-center">
        <p className="text-xs text-zinc-600 font-mono uppercase tracking-[0.3em]">
          Acceso Autorizado • Terminal NASA Open Data
        </p>
      </footer>
    </div>
  );
}
