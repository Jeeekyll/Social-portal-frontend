export interface User {
  id: number;
  email: string;
  bio: string;
  image: string;
  username: string;
}

export type ResponseUser = User & { token: string };

export interface UserState {
  user: User | null;
  isAuth: boolean;
}

export type CreateUserDto = Pick<User, 'username' | 'email'> & {
  password: string;
};

export type LoginUserDto = Omit<CreateUserDto, 'username'>;

export type UpdateUserDto = CreateUserDto & { bio?: string };

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};

export interface UserResponse {
  user: ResponseUser;
}

export interface ChangePasswordResponse {
  data: boolean;
}
