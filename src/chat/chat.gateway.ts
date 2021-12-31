import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from 'src/common/enums/gateway-events.enum';
import { Socket, Server } from 'socket.io';
import {
  CustomException,
  ErrorMessages,
} from 'src/common/exceptions/custom.exception';
import { WsExceptionFilter } from 'src/common/filters/ws-exception.filter';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSentenceCommentRequest } from './dto/create-comment-request.dto';
import { DeleteSentenceCommentRequest } from './dto/delete-comment-request.dto';
import { EditSentenceCommentRequest } from './dto/edit-comment-request.dto';
import { ReplySentenceCommentRequest } from './dto/reply-comment-request.dto';
import { sessionMiddleware } from 'src/middlewares/session.middleware';
import { NextFunction, Request, Response } from 'express';
import { JoinRoomRequest } from './dto/join-room-request.dto';
import { LeaveRoomRequest } from './dto/leave-room-request.dto';

import { linkedSocketUsers } from './linked-socket-users';
import { ChatRoomJoinedGuard } from 'src/guards/chat-room-joined.guard';

@WebSocketGateway()
@UseFilters(new WsExceptionFilter())
@UsePipes(
  new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const modifiedErrors: ErrorMessages = {};
      errors.forEach((error) => {
        modifiedErrors[error.property] = Object.values(error.constraints)[0];
      });
      return new CustomException(modifiedErrors, HttpStatus.BAD_REQUEST);
    },
  }),
)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly prisma: PrismaService) {}

  afterInit(server: Server) {
    // Apply session middleware
    server.use((socket: Socket, next) => {
      sessionMiddleware(this.prisma)(
        socket.request as Request,
        {} as Response,
        next as NextFunction,
      );
    });
  }

  async handleConnection(socket: Socket) {
    // Current user
    const me = socket.request.session.user;

    // Check if me exists
    if (!me) {
      throw new UnauthorizedException();
    }

    // Link me to the socket
    linkedSocketUsers[me.id] = {
      socketId: socket.id,
    };
  }
  async handleDisconnect(socket: Socket) {
    // Current user
    const me = socket.request.session.user;

    // Unlink me from the socket
    delete linkedSocketUsers[me.id];
  }

  @SubscribeMessage(ServerSocketEvents.JoinRoom)
  async joinRoom(
    @MessageBody() data: JoinRoomRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    // Extract room id
    const { roomId } = data;

    // Parse room id
    const parsedRoomId = parseInt(roomId);

    // check if the room id is valid
    if (!parsedRoomId) {
      throw new BadRequestException('Invalid room id');
    }

    // Check if room exists
    if (
      !(await this.prisma.sentence.findUnique({
        where: { id: parsedRoomId },
        select: { id: true },
      }))
    ) {
      throw new NotFoundException('Room not found');
    }

    // Current user
    const me = socket.request.session.user;

    if (me && linkedSocketUsers[me.id]) {
      // set room id to the current liked user socket
      linkedSocketUsers[me.id].roomId = roomId;
    }

    // Join room
    socket.join(roomId);
    return true;
  }
  @SubscribeMessage(ServerSocketEvents.LeaveRoom)
  async leaveRoom(
    @MessageBody() data: LeaveRoomRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    // Extract room id
    const { roomId } = data;

    // Parse room id
    const parsedRoomId = parseInt(roomId);

    // check if the room id is valid
    if (!parsedRoomId) {
      throw new BadRequestException('Invalid room id');
    }

    // Check if room exists
    if (
      !(await this.prisma.sentence.findUnique({
        where: { id: parsedRoomId },
        select: { id: true },
      }))
    ) {
      throw new NotFoundException('Room not found');
    }

    // Current user
    const me = socket.request.session.user;

    if (me && linkedSocketUsers[me.id]) {
      // unset room id from the current user socket
      delete linkedSocketUsers[me.id].roomId;
    }

    // Leave room
    socket.leave(roomId);
  }

  // Create message
  @UseGuards(ChatRoomJoinedGuard)
  @SubscribeMessage(ServerSocketEvents.CreateComment)
  async createComment(
    @MessageBody() data: CreateSentenceCommentRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    // Current user
    const me = socket.request.session.user;

    // Get sentence by id
    const sentence = await this.prisma.sentence.findUnique({
      where: {
        id: data.sentenceId,
      },
      select: {
        id: true,
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    // Check if sentence exists
    if (!sentence) {
      return new NotFoundException('Sentence not found');
    }

    // Create a comment for the sentence
    const sentenceComment = await this.prisma.sentenceComment.create({
      data: {
        message: data.message,
        sentence: {
          connect: {
            id: data.sentenceId,
          },
        },
        author: {
          connect: {
            id: me.id,
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
      },
    });

    // Emit the newly-created sentence comment to everyone in the same room
    socket.broadcast
      .to(`${sentence.id}`)
      .emit(ClientSocketEvents.CreateComment, {
        comment: sentenceComment,
      });

    // [ Send a notification to the owner of the sentence ]
    // Check if the sentence does not belong to me and the owner of the sentence is not in the same room
    if (
      sentence.author.id !== me.id &&
      linkedSocketUsers[sentence.author.id]?.roomId !==
        linkedSocketUsers[me.id]?.roomId
    ) {
      await this.prisma.user.update({
        where: {
          id: sentence.author.id,
        },
        data: {
          unreadCommentsNumber: {
            increment: 1,
          },
        },
      });
      socket
        .to(`${linkedSocketUsers[sentence.author.id].socketId}`)
        .emit(ClientSocketEvents.Notification);
    }
    return sentenceComment;
  }

  // Edit message
  @UseGuards(ChatRoomJoinedGuard)
  @SubscribeMessage(ServerSocketEvents.EditComment)
  async editComment(
    @MessageBody() data: EditSentenceCommentRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    const me = socket.request.session.user;
    let foundSentenceComment = await this.prisma.sentenceComment.findUnique({
      where: {
        id: data.messageId,
      },
      select: {
        authorId: true,
        sentence: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!foundSentenceComment) {
      throw new NotFoundException('Comment not found');
    }

    if (foundSentenceComment.authorId !== me.id) {
      throw new ForbiddenException();
    }

    const updatedSentenceComment = await this.prisma.sentenceComment.update({
      where: {
        id: data.messageId,
      },
      data: { message: data.message },
      select: {
        id: true,
        message: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    socket
      .to(`${foundSentenceComment.sentence.id}`)
      .emit(ClientSocketEvents.EditComment, {
        comment: updatedSentenceComment,
      });
    return updatedSentenceComment;
  }

  // Delete message
  @UseGuards(ChatRoomJoinedGuard)
  @SubscribeMessage(ServerSocketEvents.DeleteComment)
  async deleteComment(
    @MessageBody() data: DeleteSentenceCommentRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    const me = socket.request.session.user;
    const sentenceComment = await this.prisma.sentenceComment.findUnique({
      where: {
        id: data.messageId,
      },
      select: {
        id: true,
        authorId: true,
        sentence: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!sentenceComment) {
      throw new NotFoundException('Comment not found');
    }

    if (sentenceComment.authorId !== me.id) {
      throw new ForbiddenException();
    }

    await this.prisma.sentenceComment.delete({
      where: {
        id: data.messageId,
      },
    });
    socket
      .to(`${sentenceComment.sentence.id}`)
      .emit(ClientSocketEvents.DeleteComment, true);
    return true;
  }

  // Reply message
  @UseGuards(ChatRoomJoinedGuard)
  @SubscribeMessage(ServerSocketEvents.ReplyComment)
  async replyComment(
    @MessageBody() data: ReplySentenceCommentRequest,
    @ConnectedSocket() socket: Socket,
  ) {
    // Current user
    const me = socket.request.session.user;

    // Sentence comment to reply to
    const sentenceCommentToReply = await this.prisma.sentenceComment.findUnique(
      {
        where: {
          id: data.messageId,
        },
        select: {
          id: true,
          sentenceId: true,
          author: {
            select: {
              id: true,
            },
          },
        },
      },
    );

    // check if the sentence comment exists
    if (!sentenceCommentToReply) {
      throw new NotFoundException('Comment not found');
    }

    // Create a reply for the sentence comment
    const sentenceComment = await this.prisma.sentenceComment.create({
      data: {
        message: data.message,
        sentence: {
          connect: {
            id: sentenceCommentToReply.sentenceId,
          },
        },
        author: {
          connect: {
            id: me.id,
          },
        },
        repliedComment: {
          connect: {
            id: data.messageId,
          },
        },
      },
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
        sentence: {
          select: {
            id: true,
          },
        },
      },
    });

    // Emit the newly-created sentence comment to everyone in the same room
    socket.broadcast
      .to(`${sentenceCommentToReply.sentenceId}`)
      .emit(ClientSocketEvents.ReplyComment, {
        comment: sentenceComment,
      });

    // [ Send a notification to the owner of the sentence comment to reply if his in another room ]
    if (
      linkedSocketUsers[sentenceCommentToReply.author.id]?.roomId !==
      linkedSocketUsers[me.id]?.roomId
    ) {
      await this.prisma.user.update({
        where: {
          id: sentenceCommentToReply.author.id,
        },
        data: {
          unreadCommentsNumber: {
            increment: 1,
          },
        },
      });

      // Send a notification to the author of the sentence comment to reply
      socket
        .to(`${linkedSocketUsers[sentenceCommentToReply.author.id].socketId}`)
        .emit(ClientSocketEvents.Notification);
    }
    return sentenceComment;
  }
}
