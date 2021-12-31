import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TranslateSentenceRequest {
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
