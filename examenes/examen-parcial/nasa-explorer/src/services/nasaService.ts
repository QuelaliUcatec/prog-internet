import axios from "axios";

const BASE_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "404yf39ZejrJ5znmf1RTA1Wd1YbzfnKCsr4w0Gnh";

export interface NasaImage {
  title: string;
  date: string;
  url: string;
  explanation: string;
  media_type: string;
}

export interface LogbookResponse {
  id: number;
}

export const getNasaImages = async (): Promise<NasaImage[]> => {
  const response = await axios.get<NasaImage[]>(
    `${BASE_URL}?api_key=${API_KEY}&count=6`
  );
  return response.data;
};

export const saveToLogbook = async (item: NasaImage): Promise<LogbookResponse> => {
  const payload = {
    registry_id: Math.floor(Math.random() * 100000),
    title: item.title,
    date: item.date,
    status: "Saved",
  };
  const response = await axios.post<LogbookResponse>(
    "https://jsonplaceholder.typicode.com/posts",
    payload
  );
  return response.data;
};