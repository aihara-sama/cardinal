import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateSentenceRequest {
  @IsString()
  @ApiProperty()
  ru: string;

  @IsString()
  @ApiProperty()
  en: string;

  @IsInt({
    each: true,
  })
  @ApiProperty()
  tagIds: number[];
}
