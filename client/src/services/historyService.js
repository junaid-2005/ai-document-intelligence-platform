import axios from "axios";

import {
  getAccessToken,
} from "./supabase";

export const getHistory =
  async () => {
    const token =
      await getAccessToken();

    const response =
      await axios.get(
        "http://localhost:5000/api/history",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data.history;
  };