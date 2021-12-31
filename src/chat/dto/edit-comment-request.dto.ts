import { IsNotEmpty, IsNumber } from 'class-validator';

export class EditSentenceCommentRequest {
  @IsNotEmpty()
  message: string;

  @IsNumber()
  messageId: number;
}
