import axios from "axios";
import { getAccessToken } from "./supabase";

const API = "http://localhost:5000/api/documents";

export const uploadPdfToBackend = async (file) => {
  const token = await getAccessToken();

  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post(`${API}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getDocuments = async () => {
  const token = await getAccessToken();

  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.documents || [];
};

export const deleteDocument = async (id) => {
  const token = await getAccessToken();

  const { data } = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
