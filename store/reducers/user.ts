import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseUser, UserState } from '@/types/user.type';

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const user = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUserData(state, { payload }: PayloadAction<ResponseUser>) {
      state.user = payload;
      state.isAuth = true;
    },
    removeUserData(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUserData, removeUserData } = user.actions;
export default user.reducer;
