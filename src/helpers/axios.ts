import axios from "axios";
import { store } from "../redux/store";
import { showErrorNotifcation } from "../components/inappnotifications/error";
import { updateUserToken } from "../redux/slices/authSlice";

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

const ErrorMessage = (message: any) => {
  showErrorNotifcation(message);
};

OYABOO.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // network error
    if (err.code === "ERR_NETWORK") {
      console.log(err.code);

      showErrorNotifcation(`Network error ${err.code}`);
    }

    if (err.response.status === 400) {
      ErrorMessage(err.response.data.message);
      return;
    }

    if (err.response.status === 401) {
      if (err.response.data.message === "Access Denied") {
        showErrorNotifcation(err.response.data.message);
        store.dispatch(updateUserToken(null));
      }
    }

    if (err.response.status === 404) {
      ErrorMessage(err.response.data.message);
    }

    if (err.response.status === 409) {
      ErrorMessage(err.response.data.message);
    }

    if (err.response.status === 500) {
      ErrorMessage(err.response.data.message);
    }
  }
);

export default OYABOO;
