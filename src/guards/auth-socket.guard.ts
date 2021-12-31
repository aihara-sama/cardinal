import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthSocketGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToWs().getClient<Socket>().request;
    if (!request.session.user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
