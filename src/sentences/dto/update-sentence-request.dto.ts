import { PartialType } from '@nestjs/mapped-types';
import { CreateSentenceRequest } from './create-sentence-request.dto';

export class UpdateSentenceRequest extends PartialType(CreateSentenceRequest) {}
