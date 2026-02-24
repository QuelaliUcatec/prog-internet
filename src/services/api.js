const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

// Rutas de conexión (Endpoints)
const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=12`;
const MOCK_API = 'https://jsonplaceholder.typicode.com/posts';

// GET: Obtiene imágenes aleatorias
export const fetchNasaData = async () => {
  const res = await fetch(NASA_URL);
  return await res.json();
};

// GET: Traductor automático (Inglés a Español)
export const translateText = async (text) => {
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`);
    const data = await res.json();
    return data.responseData.translatedText;
  } catch {
    return "Error al traducir. Texto original: " + text;
  }
};

// POST: Simulación de guardado
export const saveFavoritePost = async (item) => {
  const res = await fetch(MOCK_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return await res.json();
};