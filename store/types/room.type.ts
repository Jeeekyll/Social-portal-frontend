import { Message } from './message.type';

export interface Room {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomsResponse {
  data: Room[];
}

export interface CreateRoomResponse {
  data: Room;
}

export type RoomSingle = Room & { messages: Message[] };

export interface RoomResponse {
  data: RoomSingle;
}

export interface CreateRoomDto {
  name: string;
  description?: string;
}
