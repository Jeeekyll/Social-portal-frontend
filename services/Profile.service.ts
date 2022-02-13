import {
  FollowersResponse,
  Profile,
  ProfileResponse,
} from '../types/profile.type';
import $api from './index';
import { User } from '../types/user.type';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export default class ProfileService {
  static async findOne(username: string): Promise<Profile> {
    const { data } = await $api.get<ProfileResponse>(
      `${api}/profiles/${username}`
    );
    return data.profile;
  }

  static async follow(username: string): Promise<Profile> {
    const { data } = await $api.post<ProfileResponse>(
      `${api}/profiles/${username}/follow`
    );
    return data.profile;
  }

  static async unfollow(username: string): Promise<Profile> {
    const { data } = await $api.delete<ProfileResponse>(
      `${api}/profiles/${username}/follow`
    );
    return data.profile;
  }

  static async findFollowings(): Promise<User[]> {
    const { data } = await $api.get<FollowersResponse>(
      `${api}/profiles/following`
    );
    return data.users;
  }
}
