import axios from "axios";
import { getAccessToken } from "./supabase";

const API = "http://localhost:5000/api/dashboard";

export const getDashboardStats = async () => {
  const token = await getAccessToken();

  const { data } = await axios.get(`${API}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
