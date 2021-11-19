import React from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_DOMAIN_CHAT_API);
export const SocketContext = React.createContext(null);
