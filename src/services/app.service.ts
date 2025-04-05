import { AxiosError } from "axios";
import OYABOO from "../helpers/axios";

const AppService = {
  addSecurityIDToMember: async (param: any) => {
    try {
      const response = await OYABOO.patch("/members/assign/securityId", param);
      return response.data;
    } catch (error: AxiosError | any) {
      return error?.response.data;
    }
  },
  allocateJacket: async (param: any) => {
    try {
      const response = await OYABOO.patch(
        "/members/agent/assign/jacket",
        param
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  addPOS: async (param: any) => {
    try {
      const response = await OYABOO.post("/pos", param);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  assignPos: async (param: any, posid: string) => {
    try {
      const response = await OYABOO.put(`/pos/${posid}`, param);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  addPhone: async (param: any) => {
    try {
      const response = await OYABOO.post("/phone", param);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  assignPhone: async (param: any, phoneid: string) => {
    try {
      const response = await OYABOO.put(`/phone/${phoneid}`, param);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllAgents: async (page: number, size: number) => {
    try {
      const response = await OYABOO.get(`/agent/page/${page}/size/${size}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AppService;
