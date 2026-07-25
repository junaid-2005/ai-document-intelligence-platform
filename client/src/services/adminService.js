import axios from "axios";
import { getAccessToken } from "./supabase";

const API = `${import.meta.env.VITE_API_URL}/admin`;

export const getAdminDashboard = async () => {
  const token = await getAccessToken();

  const { data } = await axios.get(`${API}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
