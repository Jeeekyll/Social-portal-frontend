import $api from '@services/index';
import { Room, RoomResponse } from '../store/types/room.type';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export class RoomService {
  static async findAllByUser(): Promise<Room[]> {
    const { data } = await $api.get<RoomResponse>(`${api}/rooms`);
    return data.data;
  }
}
