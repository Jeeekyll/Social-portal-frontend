import { Profile } from 'store/types/profile.type';

export interface FollowButtonProps {
  onFollowClick: (username: string) => Promise<void>;
  onUnfollowClick: (username: string) => Promise<void>;
  profile: Profile;
}
