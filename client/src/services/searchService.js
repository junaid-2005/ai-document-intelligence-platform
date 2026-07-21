import axios from "axios";

import {
  getAccessToken,
} from "./supabase";

export const searchDocuments =
  async (query) => {

    const token =
      await getAccessToken();

    const response =
      await axios.get(
        `http://localhost:5000/api/search?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data.results;
  };