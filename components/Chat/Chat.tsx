import React, { FC, useEffect, useState } from 'react';
import { Room } from '../../store/types/room.type';
import { RoomService } from '@services/Room.service';
import Link from 'next/link';
import { Button } from '@mui/material';

interface RoomProps {
  room: Room;
}

const RoomComponent: FC<RoomProps> = ({ room }) => {
  return (
    <div key={room.id} style={{ marginBottom: 20 }}>
      <div> {room.name}</div>
      <div> {room.description}</div>
      <Link href={`/messages/${room.id}`}>
        <Button variant='contained' size='small'>
          join
        </Button>
      </Link>
    </div>
  );
};

const Chat = () => {
  const [rooms, setRooms] = useState<Room[] | null>(null);

  const getUserRooms = async () => {
    try {
      const rooms = await RoomService.findAllByUser();
      setRooms(rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserRooms();
  }, []);

  return (
    <div>
      {rooms &&
        !!Object.keys(rooms).length &&
        rooms.map((room) => <RoomComponent room={room} key={room.id} />)}
    </div>
  );
};

export default Chat;
