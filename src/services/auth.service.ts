import { AxiosError, AxiosResponse } from "axios";
import OYABOO from "../helpers/axios";

const AuthService = {
  login: async (param: any) => {
    try {
      const response: AxiosResponse = await OYABOO.post("/authenticate", param);
      return response.data;
    } catch (error: AxiosError | any) {
      return error?.response.data;
    }
  },
};

export default AuthService;
