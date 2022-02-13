import React, {
  ChangeEvent,
  FC,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useTypedSelector } from '@/store/hooks';
import { RoomSingle } from '@/types/room.type';
import { socket } from 'context/socket';
import { RoomService } from '@/services/Room.service';
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
    socket.emit('SERVER@MESSAGE:CREATE', {
      text: message,
      room,
      user,
    });
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

    socket.emit('SERVER@ROOM:JOIN', {
      roomId: router.query.id,
    });
  }, [router.query.id]);

  useEffect(() => {
    socket.on('CLIENT@ROOM:LEAVE', (response) => {
      console.log(response);
    });

    socket.on('CLIENT@MESSAGE:GET', (response) => {
      console.log(response);
      setRoom((state) => ({
        ...state,
        messages: [...state.messages, response],
      }));
    });
  }, [socket]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

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
