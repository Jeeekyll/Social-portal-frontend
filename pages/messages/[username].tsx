import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTypedSelector } from 'store/hooks';
import io, { Socket } from 'socket.io-client';
import { Room } from 'store/types/room.type';

const socketApi = process.env.NEXT_PUBLIC_DOMAIN_CHAT_API;

const MessagesSingle = () => {
  const { user } = useTypedSelector((state) => state.user);
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room>(null);

  const [message, setMessage] = useState<string>('');
  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSendMessageClick = () => {
    socket.current.emit('addMessage', {
      text: message,
      room: selectedRoom,
    });
  };

  const onRoomCreate = () => {
    socket.current.emit('createRoom', {
      name: name,
      description: desc,
    });
  };

  const onJoinRoomClick = (room) => {
    return () => {
      socket.current.emit('joinRoom', room);
      setSelectedRoom(room);
    };
  };

  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const socket = useRef<Socket>(null);

  useEffect(() => {
    socket.current = io(socketApi, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    socket.current.on('connect', () => {
      console.log('connected');
    });

    socket.current.on('getCreatedRoom', (response) => {
      setRooms((state) => [response, ...state]);
    });

    socket.current.on('rooms', (response) => {
      setRooms(response);
    });

    socket.current.on('messages', (response) => {
      console.log(response);
    });

    socket.current.on('getMessage', (response) => {
      console.log(response);
    });
  }, [socket]);

  return (
    <div style={{ margin: 100 }}>
      <div>single messages</div>
      <div>
        <input type='text' onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <input type='text' onChange={(e) => setDesc(e.target.value)} />
      </div>
      <button onClick={onRoomCreate}>Create</button>

      <div style={{ marginTop: 40 }}>
        {rooms &&
          rooms.map((room) => (
            <div key={room.id}>
              <div onClick={onJoinRoomClick(room)}>{room.name}</div>
              <div>{room.createdAt}</div>
              {selectedRoom && selectedRoom.id === room.id && (
                <>
                  <div>
                    <input type='text' onChange={onMessageChange} />
                  </div>
                  <button onClick={onSendMessageClick}>Send message</button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MessagesSingle;
