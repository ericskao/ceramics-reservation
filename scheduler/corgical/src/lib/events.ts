import axios from "axios";
import { API_URL } from "./api";

axios.defaults.withCredentials = true;

export function getEvent(id: string) {
  return axios.get(`${API_URL}/events/${id}.json`, { withCredentials: true });
}
