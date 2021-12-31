import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReplySentenceCommentRequest {
  @IsNotEmpty()
  message: string;

  @IsNumber()
  messageId: number;
}
