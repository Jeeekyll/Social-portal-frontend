import React, { useEffect, useState } from 'react';
import { User } from 'store/types/user.type';
import ProfileService from 'services/Profile.service';
import { useTypedSelector } from 'store/hooks';
import styles from './Friends.module.scss';
import { Typography } from '@mui/material';
import Friend from '@components/Friends/Friend/Friend';

const Friends = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchFollowingsUsers = async () => {
    try {
      const users = await ProfileService.findFollowings();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuth) return;

    fetchFollowingsUsers();
  }, [isAuth]);

  return (
    <div className={styles.followings__container}>
      <Typography
        variant='h5'
        gutterBottom
        component='div'
        className={styles.followings__title}
      >
        Friends
      </Typography>
      <div className={styles.followings__items}>
        {users &&
          users.length > 0 &&
          users.map((user) => <Friend key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default Friends;
