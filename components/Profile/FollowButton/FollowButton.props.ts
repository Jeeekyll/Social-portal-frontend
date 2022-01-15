import { Profile } from 'store/types/profile.type';
import { Dispatch, SetStateAction } from 'react';

export interface FollowButtonProps {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
}
