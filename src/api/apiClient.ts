import axios from "axios";

const apiClient = (token?: string | undefined) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return instance;
};

export default apiClient;
