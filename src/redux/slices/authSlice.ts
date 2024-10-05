import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  username: string;
  password: string;
  user_data: any;
  token: string | unknown;
}

const initialState: IAuthState = {
  username: "",
  password: "",

  user_data: null,

  token: null,
};

const AuthReducer = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    updateUserToken: (state, action) => {
      state.token = action.payload;
    },
    updateUserData: (state, action) => {
      state.user_data = action.payload;
    },
  },
});

export const { updateUserToken, updateUserData } = AuthReducer.actions;
export default AuthReducer.reducer;
