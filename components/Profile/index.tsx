import React, { FC, useEffect, useState } from 'react';
import { Profile as ProfileType } from 'store/types/profile.type';
import { ProfileProps } from './Profile.props';
import ProfileService from '../../services/Profile.service';
import { useTypedSelector } from '../../store/hooks';
import { Button } from '@mui/material';

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

  const handleFollow = () => {
    console.log('follow');
  };

  const handleUnfollow = () => {
    console.log('unfollow');
  };

  useEffect(() => {
    if (!username) return;

    getProfile(username);
  }, [username]);

  return (
    <div className='container' style={{ marginTop: 100 }}>
      {isAuth ? (
        <>
          {profile && Object.keys(profile).length > 0 && (
            <div>
              <div>{profile.username}</div>
              <div>{profile.bio || 'Data not specified'}</div>
              <div>{profile.image}</div>

              {profile.id !== user.id && (
                <Button
                  variant='contained'
                  onClick={profile.following ? handleUnfollow : handleFollow}
                >
                  {profile.following ? 'Follow' : 'Unfollow'}
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <div>You must login </div>
      )}
    </div>
  );
};

export default Profile;
