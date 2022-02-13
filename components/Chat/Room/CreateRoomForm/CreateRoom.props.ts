import { Room } from 'types/room.type';

export interface CreateRoomProps {
  addRoom: (room: Room) => void;
}
