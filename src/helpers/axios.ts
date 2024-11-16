import axios from "axios";
import { store } from "../redux/store";

const setAuthToken = async () => {
  const token = store.getState().auth.token;
  if (token) {
    return token;
  }
  return null;
};

const OYABOO = axios.create({
  baseURL: "https://firstcarek.net/oyaboo/v1",
  headers: {
    Accept: "application/json",
  },
});

OYABOO.interceptors.request.use(async (config) => {
  const token = await setAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default OYABOO;
