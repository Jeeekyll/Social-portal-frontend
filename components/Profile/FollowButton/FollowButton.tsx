import React, { FC, memo } from 'react';
import { FollowButtonProps } from '@components/Profile/FollowButton/FollowButton.props';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import styles from './FollowButton.module.scss';

const FollowButton: FC<FollowButtonProps> = ({
  profile,
  onUnfollowClick,
  onFollowClick,
}) => {
  return (
    <>
      {profile.following ? (
        <div
          onClick={() => onUnfollowClick(profile.username)}
          className={styles.follow}
        >
          <PersonAddDisabledIcon />
          <span>unfollow</span>
        </div>
      ) : (
        <div
          onClick={() => onFollowClick(profile.username)}
          className={styles.follow}
        >
          <PersonAddIcon />
          <span>follow</span>
        </div>
      )}
    </>
  );
};

export default memo(FollowButton);
