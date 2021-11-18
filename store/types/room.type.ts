export interface Room {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomResponse {
  data: Room[];
}
