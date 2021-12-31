import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  ClientSocketEvents,
  GatewayEvents,
} from '../enums/gateway-events.enum';

@Catch(HttpException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exception filter');

    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();
    client
      // .to(`${client.id}`)
      .emit(ClientSocketEvents.Error, exception.getResponse());
  }
}
