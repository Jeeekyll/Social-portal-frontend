import React, { FC, useCallback, useEffect, useState } from 'react';
import { Room } from '../../store/types/room.type';
import { RoomService } from '@services/Room.service';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import CreateRoomForm from '@components/Chat/Room/CreateRoomForm/CreateRoomForm';
import cn from 'classnames';
import styles from './Chat.module.scss';
import { useTypedSelector } from '../../store/hooks';
import SendIcon from '@mui/icons-material/Send';

const Chat: FC = () => {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const { isAuth } = useTypedSelector((state) => state.user);

  const getUserRooms = async () => {
    try {
      const rooms = await RoomService.findAll();
      setRooms(rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoomCreate = useCallback(
    (room: Room) => {
      setRooms((state) => [room, ...state]);
    },
    [rooms]
  );

  useEffect(() => {
    getUserRooms();
  }, []);

  return (
    <div className={cn(styles['chat'])}>
      <Typography
        variant='h4'
        gutterBottom
        component='div'
        className={cn(styles['chat__title'])}
      >
        Chat rooms
      </Typography>
      {isAuth && (
        <>
          <CreateRoomForm addRoom={handleRoomCreate} />
          <div className={styles.followings__items}>
            {rooms &&
              !!Object.keys(rooms).length &&
              rooms.map((room) => (
                <div className={styles.followings__item} key={room.id}>
                  <div>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={styles.followings__item_username}
                    >
                      {room.name}
                    </Typography>

                    <div className={styles.followings__item_bio}>
                      {room.description || 'Data not specified'}
                    </div>
                  </div>

                  <div className={styles.followings__item__actions}>
                    <IconButton size='small'>
                      <Link href={`/chat/${room.id}`}>
                        <SendIcon />
                      </Link>
                    </IconButton>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
