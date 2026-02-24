# NASA App

Aplicacion web desarrollada en React con TypeScript que consume servicios GET y POST de la NASA API.

## Tecnologias utilizadas

- React 18
- TypeScript
- Vite
- Axios

## Requisitos previos

- Node.js v18 o superior
- npm v9 o superior
- API Key de NASA (obtener en https://api.nasa.gov)

## Instalacion

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/nasa-app.git
cd nasa-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura tu API Key en `src/services/nasaService.ts`:
```ts
const API_KEY = 'TU_API_KEY_AQUI'
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre el navegador en `http://localhost:5173`

## Estructura del proyecto

- src/components/Apod.tsx - Imagen astronomica del dia (GET)
- src/components/MarsPhotos.tsx - Fotos del rover Curiosity en Marte (GET)
- src/components/NasaGallery.tsx - Explorador de imagenes NASA (GET)
- src/components/SearchForm.tsx - Formulario para guardar busquedas (POST)
- src/services/nasaService.ts - Configuracion y llamadas a la API
- src/App.tsx - Componente principal
- src/main.tsx - Punto de entrada



## nasaService.ts

Archivo central de servicios. Define la API Key y la URL base, y exporta todas las funciones que realizan peticiones HTTP usando Axios.

```ts
import axios from 'axios'

const API_KEY = 'TU_API_KEY'
const BASE_URL = 'https://api.nasa.gov'
```

### getApod()

Peticion GET que obtiene la imagen astronomica del dia desde el endpoint `/planetary/apod`. Retorna un objeto con titulo, descripcion, url de la imagen y fecha.

```ts
export const getApod = async () => {
  const res = await axios.get(`${BASE_URL}/planetary/apod?api_key=${API_KEY}`)
  return res.data
}
```

### getMarsPhotos()

Peticion GET que obtiene fotos tomadas por el rover Curiosity en el sol marciano 1000. Retorna los primeros 10 resultados del arreglo de fotos usando `.slice(0, 10)`.

```ts
export const getMarsPhotos = async () => {
  const res = await axios.get(`${BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
  return res.data.photos.slice(0, 10)
}
```

### searchNasaImages(query: string)

Peticion GET a la biblioteca multimedia de la NASA. Recibe un termino de busqueda como parametro y retorna los primeros 10 resultados que coincidan con ese termino.

```ts
export const searchNasaImages = async (query: string) => {
  const res = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
  return res.data.collection.items.slice(0, 10)
}
```

### saveSearch(query: string)

Peticion POST que simula guardar una busqueda usando JSONPlaceholder. Envia el termino ingresado como titulo y retorna el objeto creado con el ID asignado por el servidor.

```ts
export const saveSearch = async (query: string) => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: query,
    body: 'Busqueda NASA',
    userId: 1
  })
  return res.data
}
```


## Apod.tsx

Componente que muestra la imagen astronomica del dia. Define una interfaz `ApodData` con los campos esperados de la respuesta. Usa `useEffect` para llamar a `getApod()` al montarse y `useState` para almacenar el resultado. Mientras carga muestra un mensaje de espera. Una vez obtenida la data renderiza el titulo, fecha, imagen cuadrada de 300x300px centrada y descripcion completa.

```tsx
interface ApodData {
  title: string
  explanation: string
  url: string
  date: string
}

function Apod() {
  const [data, setData] = useState<ApodData | null>(null)

  useEffect(() => {
    getApod().then((res) => setData(res))
  }, [])

  if (!data) return <p>Cargando...</p>

  return (
    <div>
      <h2>Imagen del Dia</h2>
      <h3>{data.title}</h3>
      <p>{data.date}</p>
      <img src={data.url} alt={data.title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      <p>{data.explanation}</p>
    </div>
  )
}
```


## MarsPhotos.tsx

Componente estilo Pokedex que muestra 10 fotos del rover Curiosity. Define una interfaz `Photo` con los campos id, img_src, earth_date, rover y camera. Maneja dos estados: `photos` para el arreglo de fotos y `selected` para la foto activa. Al hacer clic en una miniatura actualiza el estado `selected` y la consola lateral muestra la imagen ampliada con todos sus detalles.

```tsx
interface Photo {
  id: number
  img_src: string
  earth_date: string
  rover: { name: string }
  camera: { full_name: string }
}

function MarsPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selected, setSelected] = useState<Photo | null>(null)

  useEffect(() => {
    getMarsPhotos().then((res) => setPhotos(res))
  }, [])

  // Al hacer clic en una foto:
  onClick={() => setSelected(photo)}

  // La consola muestra:
  <p>> ID: {selected.id}</p>
  <p>> Fecha: {selected.earth_date}</p>
  <p>> Rover: {selected.rover.name}</p>
  <p>> Camara: {selected.camera.full_name}</p>
}
```



## NasaGallery.tsx

Explorador principal de la biblioteca NASA. Maneja cuatro estados: `query` para el texto de busqueda, `results` para los resultados, `selected` para el elemento activo y `loading` para mostrar el estado de carga. Incluye 10 botones de busqueda rapida predefinidos y un campo de texto con soporte para buscar al presionar Enter. Al seleccionar un resultado la consola lateral muestra imagen, titulo, fecha, ID NASA, keywords y descripcion completa.

```tsx
const QUICK_SEARCHES = [
  'Tierra', 'Luna', 'Sol', 'Marte', 'Jupiter',
  'Saturno', 'Galaxia', 'Orion', 'Cometa', 'Nebulosa'
]

const handleSearch = async (q?: string) => {
  const searchQuery = q || query
  if (!searchQuery) return
  setLoading(true)
  const res = await searchNasaImages(searchQuery.replace(/[^\w\s]/gi, '').trim())
  setResults(res)
  setSelected(null)
  setLoading(false)
}

// Busqueda al presionar Enter:
onKeyDown={(e) => e.key === 'Enter' && handleSearch()}

// La consola muestra:
<p>> Titulo: {selected.data[0].title}</p>
<p>> Fecha: {selected.data[0].date_created?.slice(0, 10)}</p>
<p>> ID NASA: {selected.data[0].nasa_id}</p>
<p>> Keywords: {selected.data[0].keywords.slice(0, 5).join(', ')}</p>
<p>> Descripcion: {selected.data[0].description}</p>
```


## SearchForm.tsx

Componente que implementa el servicio POST. Maneja dos estados: `query` para el texto ingresado y `result` para la respuesta del servidor. La funcion `handleSubmit` ejecuta `saveSearch()` dentro de un bloque try/catch. Si la peticion es exitosa muestra el ID retornado. Si ocurre un error muestra un mensaje de fallo.

```tsx
function SearchForm() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      const res = await saveSearch(query)
      setResult(`Busqueda guardada con ID: ${res.id}`)
    } catch (error) {
      setResult('Error al guardar')
    }
  }
}
```



## App.tsx

Componente raiz que organiza la aplicacion. Maneja el estado `showSearch` para controlar la visibilidad del explorador. Al presionar el boton Busqueda alterna entre mostrar y ocultar el componente NasaGallery. Renderiza los componentes en este orden: header, NasaGallery (si esta activo), Apod, MarsPhotos y SearchForm.

```tsx
function App() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div>
      <div>
        <h1>Aplicacion de la NASA</h1>
        <button onClick={() => setShowSearch(!showSearch)}>
          Busqueda
        </button>
      </div>

      {showSearch && <NasaGallery />}
      <Apod />
      <MarsPhotos />
      <SearchForm />
    </div>
  )
}
```


## Servicios consumidos

- GET `api.nasa.gov/planetary/apod` - Imagen astronomica del dia
- GET `api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos` - Fotos del rover en Marte
- GET `images-api.nasa.gov/search` - Busqueda en biblioteca NASA
- POST `jsonplaceholder.typicode.com/posts` - Simulacion de guardado de busqueda


## Autor
Alvaro Sahonero
