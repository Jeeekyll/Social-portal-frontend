import React, { FC, useEffect, useState } from 'react';
import { Profile as ProfileType } from '@store/types/profile.type';
import { ProfileProps } from './Profile.props';
import ProfileService from '@services/Profile.service';
import { useTypedSelector } from '@store/hooks';
import { setCoverImage } from '@utils/setCoverImage';
import FollowButton from '@components/ToggleButtons/FollowButton/FollowButton';
import styles from './Profile.module.scss';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Profile: FC<ProfileProps> = ({ username }) => {
  const router = useRouter();
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await ProfileService.findOne(username);
      setProfile(profile);
    };

    loadProfile();
  }, [username]);

  const onBackButtonClick = () => {
    router.back();
  };

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
              <FollowButton profile={profile} onChange={setProfile} />
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
      <Button variant='contained' onClick={onBackButtonClick}>
        Back
      </Button>
    </div>
  );
};

export default Profile;
