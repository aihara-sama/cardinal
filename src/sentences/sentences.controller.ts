import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SentencesService } from './sentences.service';
import { CreateSentenceRequest } from './dto/create-sentence-request.dto';
import { UpdateSentenceRequest } from './dto/update-sentence-request.dto';
import { TranslateSentenceRequest } from './dto/translate-sentence-request.dto';
import { FindAllSentencesRequest } from './dto/find-all-sentences-request.dto';
import { Session as Sess } from 'express-session';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('sentences')
@UseGuards(AuthGuard)
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  // Translate a sentence
  @Post('/translate')
  translateSentence(
    @Body() translateSentenceRequest: TranslateSentenceRequest,
  ) {
    return this.sentencesService.translateSentence(
      translateSentenceRequest.text,
    );
  }

  // Create a sentence
  @Post()
  createSentence(
    @Body() createSentenceRequest: CreateSentenceRequest,
    @Session() session: Sess,
  ) {
    return this.sentencesService.createSentence(
      createSentenceRequest,
      session.user.id,
    );
  }

  // Update a sentence
  @Patch(':sentenceId')
  updateSentenceById(
    @Body() updateSentenceRequest: UpdateSentenceRequest,
    @Param('sentenceId') sentenceId: number,
  ) {
    return this.sentencesService.updateSentenceById(
      sentenceId,
      updateSentenceRequest,
    );
  }

  // Delete a sentence
  @Delete(':sentenceId')
  removeSentenceById(@Param('sentenceId') sentenceId: number) {
    return this.sentencesService.removeSentenceById(sentenceId);
  }

  // Find a sentence
  @Get(':sentenceId')
  findSentenceById(
    @Param('sentenceId') sentenceId: number,
    @Session() session: Sess,
  ) {
    return this.sentencesService.findSentenceById(sentenceId, session.user.id);
  }

  // Like a sentence
  @Patch(':sentenceId/like')
  likeSentence(@Param('sentenceId') sentenceId: number, @Session() session) {
    return this.sentencesService.likeSentence(sentenceId, session.user.id);
  }

  // Get all sentences
  @Get()
  async findAllSentences(@Query() query: FindAllSentencesRequest) {
    return this.sentencesService.findSentencesByTextAndLg(query.text, query.lg);
  }
}
