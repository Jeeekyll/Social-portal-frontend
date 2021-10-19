import axios from "axios";
import {
  CreateUserDto,
  LoginUserDto,
  ResponseUser,
} from "../store/types/user.type";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

interface RegisterUserResponse {
  user: ResponseUser;
}

interface LoginUserResponse {
  user: ResponseUser;
}

export default class AuthService {
  static async register(createUserDto: CreateUserDto): Promise<ResponseUser> {
    const { data } = await axios.post<RegisterUserResponse>(`${api}/users`, {
      user: createUserDto,
    });
    return data.user;
  }

  static async login(loginUserDto: LoginUserDto): Promise<ResponseUser> {
    const { data } = await axios.post<LoginUserResponse>(`${api}/users/login`, {
      user: loginUserDto,
    });
    return data.user;
  }
}
