import React, { FC } from 'react';
import styles from '@/components/Friends/Friends.module.scss';
import { setCoverImage } from '@/utils/setCoverImage';
import { IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import { FriendProps } from '@/components/Friends/Friend/Friend.props';
import { useTypedSelector } from '@/store/hooks';
import { RoomService } from '@/services/Room.service';

const Friend: FC<FriendProps> = ({ user }) => {
  const { user: currentUser } = useTypedSelector((state) => state.user);
  const { username, image, bio, id } = user;

  const handleJoinRoom = async () => {
    try {
      const response = await RoomService.joinRoom(id, currentUser.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Link href={`/messages/${id}`}>
            <SendIcon onClick={handleJoinRoom} />
          </Link>
        </IconButton>
      </div>
    </div>
  );
};

export default Friend;
