import { User } from './user.type';

export interface Message {
  id: number;
  text: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  roomId: number;
  user: User;
}
