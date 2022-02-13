import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@/services/Auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '@/types/user.type';
import { removeUserData, setUserData } from '@/store/reducers/user';

const UserActions = {
  CHECK_AUTH: 'user/CheckAuth',
  LOGIN: 'user/Login',
  REGISTER: 'user/Register',
  LOGOUT: 'user/Logout',
  UPDATE: 'user/Update',
  UPDATE_AVATAR: 'user/UpdateAvatar',
  DELETE_AVATAR: 'user/DeleteAvatar',
};

export const checkAuth = createAsyncThunk(
  UserActions.CHECK_AUTH,
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
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
  UserActions.LOGIN,
  async (loginUserDto: LoginUserDto, { dispatch }) => {
    try {
      const data = await AuthService.login(loginUserDto);
      dispatch(setUserData(data));
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const register = createAsyncThunk(
  UserActions.REGISTER,
  async (createUserDto: CreateUserDto, { dispatch }) => {
    try {
      const data = await AuthService.register(createUserDto);
      dispatch(setUserData(data));
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk(
  UserActions.LOGOUT,
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    dispatch(removeUserData());
    localStorage.removeItem('token');
  }
);

export const updateUser = createAsyncThunk(
  UserActions.UPDATE_AVATAR,
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
  UserActions.UPDATE_AVATAR,
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
  UserActions.DELETE_AVATAR,
  async (_, { dispatch }) => {
    try {
      const user = await AuthService.deleteAvatar();
      dispatch(setUserData(user));
    } catch (error) {
      console.log(error);
    }
  }
);
