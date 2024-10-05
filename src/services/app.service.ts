import OYABOO from "../helpers/axios";

const AppService = {
  addSecurityIDToMember: async (param: any) => {
    try {
      const response = await OYABOO.patch("/members/assign/securityId", param);
      return response.data;
    } catch (error) {
      console.log(error);
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
};

export default AppService;
