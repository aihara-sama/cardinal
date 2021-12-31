import { IsNumber } from 'class-validator';

export class DeleteSentenceCommentRequest {
  @IsNumber()
  messageId: number;
}
