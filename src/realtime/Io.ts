import { Server } from 'socket.io';

export const io = (app: any) => new Server(app);
