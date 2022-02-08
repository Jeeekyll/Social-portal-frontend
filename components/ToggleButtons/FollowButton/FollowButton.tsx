import React, { FC, memo } from 'react';
import { FollowButtonProps } from '@/components/ToggleButtons/FollowButton/FollowButton.props';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import styles from './FollowButton.module.scss';
import ProfileService from '@/services/Profile.service';

const FollowButton: FC<FollowButtonProps> = ({ profile, onChange }) => {
  const handleFollow = async () => {
    try {
      const user = await ProfileService.follow(profile.username);
      onChange(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const user = await ProfileService.unfollow(profile.username);
      onChange(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {profile.following ? (
        <div onClick={handleUnfollow} className={styles.follow}>
          <PersonAddDisabledIcon />
          <span>unfollow</span>
        </div>
      ) : (
        <div onClick={handleFollow} className={styles.follow}>
          <PersonAddIcon />
          <span>follow</span>
        </div>
      )}
    </>
  );
};

export default memo(FollowButton);
