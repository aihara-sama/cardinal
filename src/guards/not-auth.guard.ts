import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class NotAuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (request.session.user) {
      throw new BadRequestException('You must logout first');
    }
    return true;
  }
}
