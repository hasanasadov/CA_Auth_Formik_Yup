import { BASE_URL } from "../constants";
import axios from "axios";

export async function register(data) {
  return await axios.post(`${BASE_URL}/register`, data);
}

export async function login(data) {
  return await axios.post(`${BASE_URL}/login`, data);
}

export async function getCurrentUser(token) {
  return await axios.get(`${BASE_URL}/current-user`, {
    headers: {
      Authorization: token,
    },
  });
}
