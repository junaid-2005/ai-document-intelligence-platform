import axios from "axios";
import { getAccessToken } from "./supabase";

const API = `${import.meta.env.VITE_API_URL}/chat`;

export const askDocument = async (documentId, question, replyTo = null) => {
  const token = await getAccessToken();

  const { data } = await axios.post(
    `${API}/${documentId}`,
    {
      question,
      replyTo,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    answer: data.answer,
    retrievedChunks: data.retrievedChunks,
  };
};
