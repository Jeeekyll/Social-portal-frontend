import React, { useEffect, useState } from 'react';
import { User } from 'store/types/user.type';
import ProfileService from 'services/Profile.service';
import { useTypedSelector } from 'store/hooks';
import styles from './Friends.module.scss';
import { IconButton, Typography } from '@mui/material';
import { setCoverImage } from '@utils/setCoverImage';
import SendIcon from '@mui/icons-material/Send';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';

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
          users.map((user) => (
            <div key={user.id} className={styles.followings__item}>
              <div className={styles.followings__item_cover}>
                <img src={setCoverImage(user.image)} alt='' />
              </div>
              <div>
                <Typography
                  variant='body1'
                  gutterBottom
                  className={styles.followings__item_username}
                >
                  {user.username}
                </Typography>

                <div className={styles.followings__item_bio}>
                  {user.bio || 'Data not specified'}
                </div>
              </div>

              <div className={styles.followings__item__actions}>
                <IconButton size='small'>
                  <Link href={`/profile/${user.username}`}>
                    <OpenInNewIcon />
                  </Link>
                </IconButton>
                <IconButton size='small'>
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Friends;
