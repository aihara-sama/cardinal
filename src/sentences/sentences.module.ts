import { Module } from '@nestjs/common';
import { SentencesService } from './sentences.service';
import { SentencesController } from './sentences.controller';
import { PrismaService } from 'src/database/prisma.service';
@Module({
  controllers: [SentencesController],
  providers: [SentencesService, PrismaService],
})
export class SentencesModule {}
