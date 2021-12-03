import { Room } from 'store/types/room.type';

export interface CreateRoomProps {
  addRoom: (room: Room) => void;
}
