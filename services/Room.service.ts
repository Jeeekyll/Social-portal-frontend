import $api from '@services/index';
import {
  Room,
  RoomResponse,
  RoomSingle,
  RoomsResponse,
} from '../store/types/room.type';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export class RoomService {
  static async findAllByUser(): Promise<Room[]> {
    const { data } = await $api.get<RoomsResponse>(`${api}/rooms`);
    return data.data;
  }

  static async findAllMessages(roomId: number | string): Promise<RoomSingle> {
    const { data } = await $api.get<RoomResponse>(`${api}/rooms/${roomId}`);
    return data.data;
  }
}
