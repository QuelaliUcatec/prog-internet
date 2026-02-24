import { useState, useEffect } from 'react';
import { fetchNasaData, saveFavoritePost, translateText } from './services/api';
import './App.css'; 

function App() {
  const [data, setData] = useState([]); // Lista de imágenes
  const [loading, setLoading] = useState(true); // Pantalla de carga
  const [selectedItem, setSelectedItem] = useState(null); // Imagen abierta
  const [info, setInfo] = useState(""); // Texto en español

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchNasaData();
    setData(result.filter(item => item.media_type === 'image'));
    setLoading(false);
  };

  // Función para abrir detalle y traducir automáticamente
  const handleOpen = async (item) => {
    setSelectedItem(item);
    setInfo("Traduciendo datos estelares...");
    const translated = await translateText(item.explanation);
    setInfo(translated);
  };

  // Función POST para guardar
  const handleSave = async (item, e) => {
    e.stopPropagation();
    try {
      await saveFavoritePost(item);
      alert("Registro guardado en la base de datos (POST exitoso)");
    } catch {
      alert("Error en la conexión");
    }
  };

  if (loading) return <h2 className="loading">Sintonizando señal de la NASA...</h2>;

  return (
    <main>
      <header className="header">
        <h1>Observador de la NASA</h1>
        <button className="refresh-btn" onClick={loadData}>Escanear Nuevo Cuadrante</button>
      </header>

      <section className="grid">
        {data.map((item, index) => (
          <article key={index} className="card" onClick={() => handleOpen(item)}>
            <img src={item.url} alt={item.title} />
            <div className="card-body">
              <h3>{item.title}</h3>
              <button className="post-btn" onClick={(e) => handleSave(item, e)}>Guardar (POST)</button>
            </div>
          </article>
        ))}
      </section>

      {/* VENTANA DE INFORMACIÓN (MODAL) */}
      {selectedItem && (
        <div className="overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedItem(null)}>✖</button>
            <img src={selectedItem.url} alt={selectedItem.title} />
            <div className="modal-info">
              <h2>{selectedItem.title}</h2>
              <p className="date">Fecha: {selectedItem.date}</p>
              <div className="text-container">
                <p>{info}</p> 
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;