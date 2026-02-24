import { useState, useEffect } from 'react';
// Asegúrate de que la ruta sea exacta a tu archivo
import { getNasaData, postTestData } from './services/nasaService'; 

export default function App() {
  const [nasaData, setNasaData] = useState<any>(null);
  const [postResponse, setPostResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNasaData()
      .then((data: any) => {
        setNasaData(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePost = async () => {
    const payload = {
      title: nasaData?.title,
      description: "Datos enviados desde mi buscador",
      date_sent: new Date().toISOString()
    };
    try {
      const result = await postTestData(payload);
      setPostResponse(result);
    } catch (error) {
      console.error("Error en el POST", error);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0b0d17] flex items-center justify-center text-white text-2xl font-bold">Explorando el cosmos...</div>;

  return (
    <div className="min-h-screen bg-[#0b0d17] text-white p-8 flex flex-col items-center font-sans">
      <h1 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">NASA API Explorer</h1>

      {nasaData && (
        <div className="max-w-3xl bg-[#161b22] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          <img src={nasaData.url} alt={nasaData.title} className="w-full h-96 object-cover" />
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-2 text-blue-300">{nasaData.title}</h2>
            <p className="text-gray-500 text-sm mb-4 uppercase tracking-widest">{nasaData.date}</p>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">{nasaData.explanation}</p>
            
            <button 
              onClick={handlePost}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Simular Envío de Datos (POST)
            </button>
          </div>
        </div>
      )}

      {postResponse && (
        <div className="max-w-3xl w-full mt-10 p-6 bg-black/40 border border-green-500/30 rounded-2xl backdrop-blur-md">
          <h3 className="text-green-400 font-mono mb-4 text-lg">✓ Respuesta JSON del Servidor:</h3>
          <pre className="text-green-300 text-sm overflow-x-auto font-mono bg-black/20 p-4 rounded-lg">
            {JSON.stringify(postResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}