import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSentenceCommentRequest {
  @IsNotEmpty()
  message: string;

  @IsNumber()
  sentenceId: number;
}
