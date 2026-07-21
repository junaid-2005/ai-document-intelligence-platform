import axios from "axios";
import { getAccessToken } from "./supabase";

export const askDocument = async (documentId, question, replyTo = null) => {
  const token = await getAccessToken();

  const { data } = await axios.post(
    `http://localhost:5000/api/chat/${documentId}`,
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

  let answer = data.answer;
  let retrievedChunks = data.retrievedChunks ?? 0;

  if (answer && typeof answer === "object") {
    retrievedChunks = answer.retrievedChunks ?? retrievedChunks;

    answer = answer.answer ?? JSON.stringify(answer);
  }

  return {
    answer: typeof answer === "string" ? answer : String(answer),
    retrievedChunks,
  };
};
