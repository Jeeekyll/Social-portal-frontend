import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseUser, UserState } from "../types/user.type";

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserData(state, { payload }: PayloadAction<ResponseUser>) {
      state.user = payload;
      state.isAuth = true;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
