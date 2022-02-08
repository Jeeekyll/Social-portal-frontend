import $api from '@/services/index';
import {
  CreateRoomDto,
  CreateRoomResponse,
  Room,
  RoomResponse,
  RoomSingle,
  RoomsResponse,
} from 'store/types/room.type';

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export class RoomService {
  static async findAll(): Promise<Room[]> {
    const { data } = await $api.get<RoomsResponse>(`${api}/rooms`);
    return data.data;
  }

  static async findAllMessages(roomId: number | string): Promise<RoomSingle> {
    const { data } = await $api.get<RoomResponse>(`${api}/rooms/${roomId}`);
    return data.data;
  }

  static async joinRoom(roomId: number, userId: number): Promise<any> {
    const { data } = await $api.post<any>(`${api}/rooms/${userId}`, {
      roomId,
      userId,
    });
    return data.data;
  }

  static async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const { data } = await $api.post<CreateRoomResponse>(
      `${api}/rooms`,
      createRoomDto
    );
    return data.data;
  }

  // static async findAllByUser(): Promise<Room[]> {
  //   const { data } = await $api.get<RoomsResponse>(`${api}/rooms`);
  //   return data.data;
  // }
}
