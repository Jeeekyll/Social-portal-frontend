import React, { FC } from 'react';
import styles from '@components/Friends/Friends.module.scss';
import { setCoverImage } from '@utils/setCoverImage';
import { IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import { FriendProps } from '@components/Friends/Friend/Friend.props';

const Friend: FC<FriendProps> = ({ user }) => {
  const { username, image, bio } = user;

  return (
    <div className={styles.followings__item}>
      <div className={styles.followings__item_cover}>
        <img src={setCoverImage(image)} alt='' />
      </div>
      <div>
        <Typography
          variant='body1'
          gutterBottom
          className={styles.followings__item_username}
        >
          {username}
        </Typography>

        <div className={styles.followings__item_bio}>
          {bio || 'Data not specified'}
        </div>
      </div>

      <div className={styles.followings__item__actions}>
        <IconButton size='small'>
          <Link href={`/profile/${username}`}>
            <OpenInNewIcon />
          </Link>
        </IconButton>

        <IconButton size='small'>
          <Link href={`/messages/${username}`}>
            <SendIcon />
          </Link>
        </IconButton>
      </div>
    </div>
  );
};

export default Friend;
