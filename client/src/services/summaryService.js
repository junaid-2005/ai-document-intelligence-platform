import axios from "axios";
import { getAccessToken } from "./supabase";

const API = "http://localhost:5000/api/summary";

export const generateSummary = async (documentId) => {
  const token = await getAccessToken();

  const { data } = await axios.post(
    `${API}/${documentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};
