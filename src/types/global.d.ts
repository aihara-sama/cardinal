import { Session } from 'express-session';
import { Stream } from 'stream';
import { User } from '.prisma/client';

declare module 'http' {
  interface IncomingMessage {
    session: Session;
  }
}

declare module 'express-session' {
  interface Session {
    user?: User;
  }
}
