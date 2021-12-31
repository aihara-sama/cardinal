import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}
  async getNotificationsByUserId(userId: number) {
    const [mySentences, commentReplies] = await Promise.all([
      this.prisma.sentence.findMany({
        where: {
          authorId: userId,
        },
        select: {
          comments: {
            select: {
              id: true,
              message: true,
              author: {
                select: {
                  id: true,
                  username: true,
                },
              },
              repliedComment: {
                select: {
                  id: true,
                  message: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.sentenceComment.findMany({
        where: {
          repliedComment: {
            authorId: userId,
          },
          sentence: {
            authorId: {
              not: userId,
            },
          },
        },
        select: {
          id: true,
          message: true,
          author: {
            select: {
              id: true,
              username: true,
            },
          },
          repliedComment: {
            select: {
              id: true,
              message: true,
            },
          },
        },
      }),
    ]);
    return [
      ...mySentences.map((sentence) => sentence.comments),
      ...commentReplies,
    ];
  }
}
