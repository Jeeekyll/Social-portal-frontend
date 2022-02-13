import { Profile } from '@/types/profile.type';

export interface FollowButtonProps {
  profile: Profile;
  onChange: (profileDto: Profile) => void;
}
