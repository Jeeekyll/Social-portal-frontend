import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateUserDto,
  LoginUserDto,
  ResponseUser,
  UpdateUserDto,
  UserState,
} from "store/types/user.type";
import AuthService from "services/AuthService";

export const checkAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const data = await AuthService.checkAuth();
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/Login",
  async (loginUserDto: LoginUserDto, { dispatch }) => {
    try {
      const data = await AuthService.login(loginUserDto);
      dispatch(setUserData(data));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const register = createAsyncThunk(
  "user/Register",
  async (createUserDto: CreateUserDto, { dispatch }) => {
    try {
      const data = await AuthService.register(createUserDto);
      dispatch(setUserData(data));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk(
  "user/Logout",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    dispatch(removeUserData());
    localStorage.removeItem("token");
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (updateUserDto: UpdateUserDto, { dispatch }) => {
    try {
      const user = await AuthService.update(updateUserDto);
      dispatch(setUserData(user));
    } catch (error) {
      console.log(error);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (avatar: FormData, { dispatch }) => {
    try {
      const user = await AuthService.uploadAvatar(avatar);
      dispatch(setUserData(user));
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  "user/deleteAvatar",
  async (_, { dispatch }) => {
    try {
      const user = await AuthService.deleteAvatar();
      dispatch(setUserData(user));
    } catch (error) {
      console.log(error);
    }
  }
);

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
    removeUserData(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
