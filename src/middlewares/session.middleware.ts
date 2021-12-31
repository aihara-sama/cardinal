import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import { PrismaService } from 'src/database/prisma.service';

export const sessionMiddleware = (prisma: PrismaService) =>
  expressSession({
    cookie: {
      maxAge: +process.env.SESSION_MAX_AGE,
      secure: false,
    },

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: +process.env.SESSION_CHECK_PERIOD,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  });
