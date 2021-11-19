import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTypedSelector } from 'store/hooks';
import { Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { socket } from '../../context/socket';
import { RoomService } from '@services/Room.service';
import { RoomSingle } from '../../store/types/room.type';
import { Message } from '../../store/types/message.type';

const MessagesSingle = () => {
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

  // useEffect(() => {
  //
  // },
  //       [socket]);

  return (
    <div style={{ margin: 100 }}>
      <div>Room page</div>
      <Button onClick={() => router.back()}>Back</Button>
      {room && !!Object.keys(room).length && (
        <>
          <div>Room description</div>
          <div>{room.name}</div>
          <div>{room.description}</div>
          <Divider />
          {room.messages &&
            room.messages.map((message) => (
              <div key={message.id} style={{ marginBottom: 10 }}>
                <div>{message.text}</div>
                <div>{message.createdAt}</div>
                <div>{message.user.username}</div>
                <Divider />
              </div>
            ))}
        </>
      )}
      <input type='text' value={message} onChange={onMessageChange} />
      <button onClick={handleMessageSend}>send</button>
    </div>
  );
};

export default MessagesSingle;
