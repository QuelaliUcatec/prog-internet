import axios from 'axios';

const API_KEY = 'mwIaFm4OR7KunerJsGNCsEO98LYbQ1tdIQlouics'; 
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export const getNasaData = async () => {
  const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&count=6`);
  return response.data;
};

export const postTestData = async (item: any) => {
  const payload = {
    registry_id: Math.floor(Math.random() * 900000) + 100000,
    galactic_title: item.title,
    file_link: item.url,
    observation_date: item.date,
    short_explanation: item.explanation.substring(0, 120) + "...",
    metadata: {
      terminal_id: "GEMINI-V3-STATION",
      status: "Synced",
      encryption: "AES-256-SPACE",
      priority: "Alpha Explorer"
    },
    system_log: "Request successfully sent to backup server."
  };
  
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', payload);
  return response.data;
};