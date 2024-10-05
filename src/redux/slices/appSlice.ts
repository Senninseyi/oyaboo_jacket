import { createSlice } from "@reduxjs/toolkit";

interface IAppState {
  registerationTabs: number;
  membershipdata: IMembershipData;
}

const initialState: IAppState = {
  registerationTabs: 1,
  membershipdata: {
    member_id: "",
    security_id: "",
  },
};

const AppReducer = createSlice({
  initialState: initialState,
  name: "app",
  reducers: {
    setRegisterationTabs: (state, action) => {
      state.registerationTabs = action.payload;
    },
    updateMemberShipData: (state, action) => {
      state.membershipdata = action.payload;
    },
  },
});

export const { setRegisterationTabs, updateMemberShipData } =
  AppReducer.actions;
export default AppReducer.reducer;
