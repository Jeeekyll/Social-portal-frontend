import React, { FC, useCallback, useEffect, useState } from 'react';
import { Profile as ProfileType } from 'store/types/profile.type';
import { ProfileProps } from './Profile.props';
import ProfileService from 'services/Profile.service';
import { useTypedSelector } from 'store/hooks';
import { setCoverImage } from 'utils/setCoverImage';
import FollowButton from 'components/Profile/FollowButton/FollowButton';
import styles from './Profile.module.scss';
import { Typography } from '@mui/material';

const Profile: FC<ProfileProps> = ({ username }) => {
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const getProfile = async (username: string) => {
    try {
      const profile = await ProfileService.findOne(username);
      setProfile(profile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = useCallback(async (username: string) => {
    try {
      const profile = await ProfileService.follow(username);
      setProfile(profile);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUnfollow = useCallback(async (username: string) => {
    try {
      const profile = await ProfileService.unfollow(username);
      setProfile(profile);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    getProfile(username);
  }, [username]);

  return (
    <div className={styles.profile__container}>
      {profile && Object.keys(profile).length > 0 && (
        <div>
          <img
            className={styles.profile__cover}
            src={setCoverImage(profile.image)}
            alt='profile-image'
            style={{ marginBottom: 25 }}
          />

          <div className={styles.profile__item}>
            <Typography variant='h6' component='div'>
              Name:
            </Typography>
            <div>{profile.username}</div>
            {user && profile.id !== user.id && isAuth && (
              <FollowButton
                onFollowClick={handleFollow}
                onUnfollowClick={handleUnfollow}
                profile={profile}
              />
            )}
          </div>
          <div className={styles.profile__item}>
            <Typography variant='h6' component='div'>
              Bio:
            </Typography>
            <div>{profile.bio || 'Data not specified'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
