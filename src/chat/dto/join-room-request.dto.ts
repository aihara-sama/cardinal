import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinRoomRequest {
  @IsNotEmpty()
  @ApiProperty()
  roomId: string;
}
