import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { linkedSocketUsers } from 'src/chat/linked-socket-users';

@Injectable()
export class ChatRoomJoinedGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const me = ctx.switchToWs().getClient<Socket>().request.session.user;
    if (!linkedSocketUsers[me.id]?.roomId) throw new ForbiddenException();
    return true;
  }
}
