import { IsNumber } from 'class-validator';

export class FindSentenceCommentRequest {
  @IsNumber()
  sentenceId: number;
}
