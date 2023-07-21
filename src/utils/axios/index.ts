import axios from "axios";
import { VideoData } from "../typs/typs";

// "X-RapidAPI-Key": "f4188f8a2amsh47b921ca10e7781p1fb2f2jsn93d0c561067e",
// "X-RapidAPI-Key": "457ba1a63dmshd20f707affb07e9p18a273jsnfe1ebb102f7b",
// "X-RapidAPI-Key": "156fb64704msh8eb64d58e119b7ap1dc31ajsn9fab8b3a16e3",
export const instance = axios.create({
  baseURL: "https://yt-api.p.rapidapi.com/",
  timeout: 10000,
  params: {
    // lang: "ru",
    maxResults: 30,
  },
  headers: {
    "X-RapidAPI-Key": "156fb64704msh8eb64d58e119b7ap1dc31ajsn9fab8b3a16e3",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});

export const fetchData = async (url: string): Promise<any> => {
  const response = await instance.get(url);
  const data = response.data;
  return data;
};
