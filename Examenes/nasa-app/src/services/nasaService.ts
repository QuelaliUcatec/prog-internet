import axios from 'axios'

const API_KEY = 'hcomSuLvjFPvdmTZlIg5JOuW1OkgZHl9ADIcC0CJ'
const BASE_URL = 'https://api.nasa.gov'

export const getApod = async () => {
  const res = await axios.get(`${BASE_URL}/planetary/apod?api_key=${API_KEY}`)
  return res.data
}

export const getMarsPhotos = async () => {
  const res = await axios.get(`${BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
  return res.data.photos.slice(0, 10)
}

export const getAsteroids = async () => {
  const res = await axios.get(`${BASE_URL}/neo/rest/v1/feed?api_key=${API_KEY}`)
  return res.data
}

export const saveSearch = async (query: string) => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: query,
    body: 'Búsqueda NASA',
    userId: 1
  })
  return res.data
}
// GET - Buscar imágenes por tema
export const searchNasaImages = async (query: string) => {
  const res = await axios.get(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
  return res.data.collection.items.slice(0, 10)
}