import { User } from './user.type';

export type Profile = Omit<User, 'email'> & { following: boolean };

export interface ProfileResponse {
  profile: Profile;
}

export interface FollowersResponse {
  users: User[];
}
