import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sentence, SentenceLike, SentenceView } from '.prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSentenceRequest } from './dto/create-sentence-request.dto';
import { UpdateSentenceRequest } from './dto/update-sentence-request.dto';
import translate from 'translate';

@Injectable()
export class SentencesService {
  constructor(private readonly prisma: PrismaService) {}

  async createSentence(
    createSentenceRequest: CreateSentenceRequest,
    authorId: number,
  ) {
    const { tagIds, ...createData } = createSentenceRequest;

    // Count the number of tags to apply
    const tagsCount = await this.prisma.sentenceTag.count({
      where: {
        id: {
          in: tagIds,
        },
      },
    });

    // Check if all tags exists
    if (tagsCount !== tagIds.length) {
      throw new BadRequestException('Not all tags found');
    }

    // Create a sentence
    const sentence = await this.prisma.sentence.create({
      data: { ...createData, authorId },
    });

    // Add tags to the newly-created sentence
    await Promise.all(
      tagIds.map((tagId) =>
        this.prisma.sentenceTag.update({
          where: {
            id: tagId,
          },
          data: {
            sentences: {
              connect: {
                id: sentence.id,
              },
            },
          },
        }),
      ),
    );
  }
  async updateSentenceById(
    sentenceId: number,
    updateSentenceRequest: UpdateSentenceRequest,
  ) {
    let sentence: Sentence;
    try {
      // Update the sentence
      sentence = await this.prisma.sentence.update({
        where: {
          id: sentenceId,
        },
        data: updateSentenceRequest,
      });
    } catch (error) {
      // Catch not found
      if (error.code === 'P2025')
        throw new NotFoundException('Sentence not found');
      throw error;
    }
    return sentence;
  }
  async removeSentenceById(sentenceId: number) {
    try {
      // Delete the sentence
      await this.prisma.sentence.delete({
        where: {
          id: sentenceId,
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Sentence not found');
      throw error;
    }
  }
  async findSentenceById(sentenceId: number, userId: number) {
    // Get a sentnece by id
    const sentence = await this.prisma.sentence.findUnique({
      where: {
        id: sentenceId,
      },
      select: {
        id: true,
        en: true,
        ru: true,
        sentenceTags: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            sentenceLikes: true,
            sentenceViews: true,
            comments: true,
          },
        },
        comments: {
          select: {
            id: true,
            message: true,
            repliedComment: {
              select: {
                id: true,
                message: true,
              },
            },
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    // Check if the sentence exists
    if (!sentence) {
      throw new NotFoundException('Sentence not found');
    }

    // Get a sentence view by current user id and sentence id
    const sentenceView = await this.prisma.sentenceView.findFirst({
      where: {
        authorId: userId,
        sentenceId,
      },
    });

    // Add a view if no match found
    if (!sentenceView) {
      await this.prisma.sentenceView.create({
        data: {
          authorId: userId,
          sentenceId,
        },
      });
    }
    return sentence;
  }

  async likeSentence(sentenceId: number, authorId: number) {
    // Get a sentence like by sentence id and author id
    const sentenceLike = await this.prisma.sentenceLike.findFirst({
      where: {
        authorId,
        sentenceId,
      },
    });

    // Remove the like if match found
    if (sentenceLike) {
      await this.prisma.sentenceLike.delete({
        where: {
          id: sentenceLike.id,
        },
      });
    } else {
      // Or create otherwise
      await this.prisma.sentenceLike.create({
        data: {
          authorId,
          sentenceId,
        },
      });
    }
  }

  async findSentencesByTextAndLg(text: string = '', lg: string = 'en') {
    // Get sentneces by some criteria
    const sentences = await this.prisma.sentence.findMany({
      where: {
        [lg]: {
          contains: text,
        },
      },
      select: {
        [lg]: true,
        id: true,
        author: {
          select: {
            username: true,
            id: true,
          },
        },
        sentenceTags: true,
        _count: {
          select: {
            sentenceLikes: true,
            sentenceViews: true,
            comments: true,
          },
        },
      },
    });

    return sentences;
  }

  async translateSentence(sentence: string) {
    console.log({ sentence });

    return { ru: await translate(sentence, { to: 'ru' }) };
  }
}
