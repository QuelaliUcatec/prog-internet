import { useState, useEffect } from 'react';
import { getNasaData, postTestData } from './services/nasaService';

export default function App() {
  const [nasaItems, setNasaItems] = useState<any[]>([]);
  const [postResponse, setPostResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    getNasaData()
      .then((data) => {
        setNasaItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePost = async (item: any) => {
    setIsPosting(true);
    try {
      const result = await postTestData(item);
      setPostResponse(result);
      setTimeout(() => {
        document.getElementById('registry-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Sync Error", error);
    } finally {
      setIsPosting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0b0d17] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        <p className="text-blue-400 font-mono text-sm tracking-widest animate-pulse">ESTABLISHING NASA CONNECTION...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0d17] text-white p-6 md:p-12 font-sans">
      <header className="text-center mb-20">
        <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent italic uppercase">
          Nasa Explorer
        </h1>
        <p className="text-blue-500 tracking-[0.4em] text-xs mt-4 font-bold uppercase">Deep Space Data Retrieval System</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {nasaItems.map((item, index) => (
          <div key={index} className="group bg-[#11141d] rounded-3xl overflow-hidden border border-gray-800 hover:border-blue-500/40 transition-all duration-500 flex flex-col shadow-2xl">
            <div className="relative h-72 overflow-hidden">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141d] to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-6">
                <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-500/30 uppercase tracking-tighter">
                  {item.date}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <h2 className="text-xl font-bold mb-4 line-clamp-1 group-hover:text-blue-400 transition-colors">{item.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-3 mb-8 flex-grow leading-relaxed italic">
                {item.explanation}
              </p>
              
              <button 
                onClick={() => handlePost(item)}
                disabled={isPosting}
                className="w-full bg-[#1c212c] hover:bg-blue-600 text-white py-4 rounded-2xl text-xs font-bold transition-all border border-gray-700 hover:border-blue-400 uppercase tracking-widest disabled:opacity-50"
              >
                {isPosting ? 'Syncing...' : 'Add to Logbook'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {postResponse && (
        <section id="registry-section" className="mt-32 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-20 duration-1000">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur opacity-20"></div>
            
            <div className="relative bg-[#0d1117] border border-gray-800 rounded-[2rem] overflow-hidden shadow-3xl">
              <div className="bg-[#161b22] px-8 py-4 border-b border-gray-800 flex justify-between items-center">
                <div className="flex gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
                </div>
                <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2 uppercase tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Link Established: JSON_SERVER_01
                </div>
              </div>

              <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">Registry File</h3>
                    <p className="text-blue-500 font-mono text-xs">STORAGE CONFIRMATION SUCCESSFUL</p>
                  </div>

                  <div className="space-y-5">
                    {[
                      { label: "Registry ID", value: `#${postResponse.registry_id}`, color: "text-blue-400" },
                      { label: "Astronomical Object", value: postResponse.galactic_title, color: "text-white" },
                      { label: "Sync Date", value: new Date().toLocaleDateString(), color: "text-gray-400" },
                      { label: "Network Status", value: "CREATED (HTTP 201)", color: "text-green-400" }
                    ].map((row, i) => (
                      <div key={i} className="flex flex-col border-b border-gray-800 pb-3">
                        <span className="text-[9px] font-mono text-gray-600 uppercase mb-1">{row.label}</span>
                        <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                    <p className="text-[11px] text-blue-300 leading-relaxed font-mono">
                      LOG_SYSTEM: Metadata for object "{postResponse.galactic_title}" has been encapsulated and transmitted to the central exploration node.
                    </p>
                  </div>
                </div>

                <div className="relative group/json">
                  <div className="absolute top-4 right-6 text-[9px] text-gray-600 font-mono uppercase tracking-widest z-10">Data Source</div>
                  <div className="bg-[#05070a] rounded-2xl p-8 border border-gray-800 h-full max-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-gray-800">
                    <pre className="text-blue-400/80 font-mono text-xs leading-relaxed">
                      {JSON.stringify(postResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="mt-32 pb-10 text-center">
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.5em]">
          Data Source: NASA Open APIs &bull; Terminal: Gemini v3 &bull; 2026
        </p>
      </footer>
    </div>
  );
}