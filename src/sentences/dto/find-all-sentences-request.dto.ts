import { IsIn, IsOptional } from 'class-validator';

export class FindAllSentencesRequest {
  text: string;

  @IsIn(['ru', 'en'])
  @IsOptional()
  lg: string;
}
