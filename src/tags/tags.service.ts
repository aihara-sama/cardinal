import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}
  findAllTags() {
    return this.prisma.sentenceTag.findMany();
  }
}
