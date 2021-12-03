import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTypedSelector } from 'store/hooks';
import { RoomSingle } from 'store/types/room.type';
import { socket } from 'context/socket';
import { RoomService } from '@services/Room.service';
import { Button, TextField, Typography } from '@mui/material';
import cn from 'classnames';
import styles from './Room.module.scss';
import { formatDistanceToNow } from 'date-fns';

const Room: FC = () => {
  const router = useRouter();

  const { user, isAuth } = useTypedSelector((state) => state.user);
  const [room, setRoom] = useState<RoomSingle | null>(null);
  const [message, setMessage] = useState('');

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    socket.emit('addMessage', { text: message, room, user });
    setMessage('');
  };

  const getRoomMessages = async () => {
    try {
      const room = await RoomService.findAllMessages(router.query.id as string);
      setRoom(room);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!router.query?.id) return;
    getRoomMessages();
  }, [router]);

  useEffect(() => {
    if (!isAuth) return;

    socket.on('getMessage', (response) => {
      setRoom((state) => ({
        ...state,
        messages: [...state.messages, response],
      }));
    });

    socket.emit('joinRoom', { roomId: router.query.id, user });
  }, [socket, isAuth, router.query.id]);

  const onBackButtonClick = () => {
    router.back();
  };

  return (
    <div className={cn(styles['room'])}>
      {room && !!Object.keys(room).length && (
        <>
          <div className={cn(styles['room__header'])}>
            <div>
              <Typography variant='h6'>{room.name}</Typography>
              <Typography variant='body1'>{room.description}</Typography>
            </div>
            <Button onClick={onBackButtonClick}>Back</Button>
          </div>
          {room.messages &&
            room.messages.map((message) => (
              <div className={cn(styles['message'])} key={message.id}>
                <div>{message.text}</div>
                <div className={cn(styles['message__info'])}>
                  <div>{formatDistanceToNow(new Date(message.createdAt))}</div>
                  <div>{message.user.username}</div>
                </div>
              </div>
            ))}
        </>
      )}
      <div className={cn(styles['message__actions'])}>
        <TextField
          label='Message'
          value={message}
          onChange={onMessageChange}
          className={cn(styles['message__actions_input'])}
        />
        <Button
          onClick={handleMessageSend}
          variant='contained'
          className={cn(styles['message__actions_submit'])}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Room;
