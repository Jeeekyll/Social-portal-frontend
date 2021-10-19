export interface ResponseUser {
  id: number;
  email: string;
  bio: string;
  image: string;
  password: string;
  token: string;
}

export interface User {
  id: number;
  email: string;
  bio: string;
  image: string;
}

export interface UserState {
  user: User | null;
  isAuth: boolean;
}

export type CreateUserDto = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};
