import axios from "axios";
import { getAccessToken } from "./supabase";

const API = `${import.meta.env.VITE_API_URL}/search`;

export const searchDocuments = async (query) => {
  const token = await getAccessToken();

  const { data } = await axios.get(
    `${API}?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.results;
};
