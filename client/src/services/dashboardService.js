import axios from "axios";
import { getAccessToken } from "./supabase";

const API = `${import.meta.env.VITE_API_URL}/dashboard`;

export const getDashboardStats = async () => {
  const token = await getAccessToken();

  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
