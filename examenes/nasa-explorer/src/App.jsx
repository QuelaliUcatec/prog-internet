import { useState, useEffect } from 'react';
import Card from './components/Card';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('Mars');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Estado para la telemetría (para que los números no parpadeen locamente)
  const [telemetry, setTelemetry] = useState({
    sector: "000-ALPHA",
    coords: "0.0000N / 0.0000W"
  });

  const searchNasa = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`);
      const json = await response.json();
      
      const results = json.collection.items.slice(0, 9).map(item => ({
        title: item.data[0].title,
        url: item.links[0].href,
        explanation: item.data[0].description,
        date: item.data[0].date_created.split('T')[0]
      }));
      
      setData(results);
      // Actualizamos telemetría al buscar
      setTelemetry({
        sector: `${Math.floor(Math.random() * 999)}-${['ALPHA', 'GAMMA', 'OMEGA'][Math.floor(Math.random()*3)]}`,
        coords: `${(Math.random() * 90).toFixed(4)}N / ${(Math.random() * 180).toFixed(4)}W`
      });
    } catch (error) {
      console.error("Error en la busqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchNasa('Nebula');
  }, []);

  return (
    <div className="app-container">
      {/* --- NUEVA BARRA DE TELEMETRÍA --- */}
      <div className="telemetry-bar">
        <span>{`> ESTATUS: CONEXIÓN ESTABLE`}</span>
        <span>{`> SECTOR: ${telemetry.sector}`}</span>
        <span>{`> COORD: ${telemetry.coords}`}</span>
        <span className="live-pulse">● LIVE FEED</span>
      </div>

      <header className="header">
        <h1 className="logo">OBSERVATORIO <span>NASA</span></h1>   
        <p className="subtitle">SISTEMA DE EXPLORACIÓN DE DATOS DE ESPACIO PROFUNDO</p>
      </header>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Ej: Mars, Orion, Apollo..." 
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchNasa(query)}
        />
        <button className="btn-primary" onClick={() => searchNasa(query)}>
          EXPLORAR
        </button>
      </div>

      {loading ? (
        <div className="loader">ESCANEANDO EL SECTOR CÓSMICO...</div>
      ) : (
        <main className="grid">
          {data.map((item, index) => (
            <Card key={index} item={item} onOpen={() => setSelectedItem(item)} />
          ))}
        </main>
      )}

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default App;