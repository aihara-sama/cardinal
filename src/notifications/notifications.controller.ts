import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotificationsService } from './notifications.service';
import { Session as Sess } from 'express-session';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getMyNotifications(@Session() session: Sess) {
    return this.notificationsService.getNotificationsByUserId(session.user.id);
  }
}
