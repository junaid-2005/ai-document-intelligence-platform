import axios from "axios";
import { getAccessToken } from "./supabase";

const API = "http://localhost:5000/api/history";

export const getHistory = async () => {
  const token = await getAccessToken();

  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.history || [];
};
