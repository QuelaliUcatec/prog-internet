import axios from 'axios';

const API_KEY = 'mwIaFm4OR7KunerJsGNCsEO98LYbQ1tdIQlouics'; 
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export const getNasaData = async () => {
  const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
  return response.data;
};

// Esta es la función para el POST que faltaba
export const postTestData = async (payload: any) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', payload);
  return response.data;
};