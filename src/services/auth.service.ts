import OYABOO from '../helpers/axios';

const AuthService = {
  login: async (param: any) => {
    try {
      const response = await OYABOO.post('/authenticate', param);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthService
