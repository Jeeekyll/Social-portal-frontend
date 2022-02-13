import axios from 'axios';
import {
  ChangePasswordDto,
  ChangePasswordResponse,
  CreateUserDto,
  LoginUserDto,
  ResponseUser,
  UpdateUserDto,
  UserResponse,
} from '@/types/user.type';
import { Article, UserArticlesResponse } from '@/types/article.type';
import $api from './index';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export default class AuthService {
  static async register(createUserDto: CreateUserDto): Promise<ResponseUser> {
    const { data } = await axios.post<UserResponse>(`${api}/users`, {
      user: createUserDto,
    });
    return data.user;
  }

  static async login(loginUserDto: LoginUserDto): Promise<ResponseUser> {
    const { data } = await axios.post<UserResponse>(`${api}/users/login`, {
      user: loginUserDto,
    });
    return data.user;
  }

  static async checkAuth(): Promise<ResponseUser> {
    const { data } = await $api.get<UserResponse>(`${api}/user`);
    return data.user;
  }

  static async update(updateUserDto: UpdateUserDto): Promise<ResponseUser> {
    const { data } = await $api.put<UserResponse>(`${api}/user`, {
      user: updateUserDto,
    });
    return data.user;
  }

  static async uploadAvatar(avatar: FormData): Promise<ResponseUser> {
    const { data } = await $api.put<UserResponse>(`${api}/user/avatar`, avatar);
    return data.user;
  }

  static async deleteAvatar(): Promise<ResponseUser> {
    const { data } = await $api.delete<UserResponse>(`${api}/user/avatar`);
    return data.user;
  }

  static async changePassword(
    changePasswordDto: ChangePasswordDto
  ): Promise<boolean> {
    const { data } = await $api.post<ChangePasswordResponse>(
      `${api}/user/password`,
      changePasswordDto
    );
    return data.data;
  }

  static async findArticles(): Promise<Article[]> {
    const { data } = await $api.get<UserArticlesResponse>(
      `${api}/user/articles`
    );
    return data.articles;
  }
}
