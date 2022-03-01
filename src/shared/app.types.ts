import { Server } from 'socket.io';
export interface IAppContext {
  authToken: string | undefined;
  socket: Server;
}
