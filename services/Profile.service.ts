import { Profile, ProfileResponse } from '../store/types/profile.type';
import $api from './index';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export default class ProfileService {
  static async findOne(username: string): Promise<Profile> {
    const { data } = await $api.get<ProfileResponse>(
      `${api}/profiles/${username}`
    );
    return data.profile;
  }
}
