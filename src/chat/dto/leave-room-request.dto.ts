import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LeaveRoomRequest {
  @IsNotEmpty()
  @ApiProperty()
  roomId: string;
}
