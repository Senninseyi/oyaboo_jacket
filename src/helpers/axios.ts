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
  baseURL: "https://api.tsaro.kaduna.firstcarek.net/tsaro-kaduna/v1",
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor
OYABOO.interceptors.request.use(async (config) => {
  const token = await setAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
OYABOO.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Example: Handle 401 Unauthorized
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        // Optionally, dispatch a logout action or redirect to login
      }

      if (error.response.status === 400) {
        // console.error(error.response);
        // Optionally, dispatch a logout action or redirect to login
      }

      // Example: Handle 500 Internal Server Error
      if (error.response.status === 500) {
        console.error("Server error! Please try again later.");
        console.error(error.response);
      }
    } else if (error.request) {
      // Handle no response from server
      console.error("No response received from server.");
    } else {
      // Handle other errors
      console.error("Error:", error.message);
    }

    // Optionally, return a rejected promise to propagate the error
    return Promise.reject(error);
  }
);

export default OYABOO;
