import axios from "axios";

const apiClient = (token: string | undefined) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

export default apiClient;
