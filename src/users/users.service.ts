import { User } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { RegisterUserRequest } from 'src/auth/dto/register-user-request.dto';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateProfileRequest } from './dto/update-profile-request.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(registerUserRequest: RegisterUserRequest): Promise<void> {
    // Get users by email and username
    const [emailUser, usernameUser] = await Promise.all([
      this.prisma.user.findUnique({
        where: {
          email: registerUserRequest.email,
        },
        select: {
          id: true,
        },
      }),
      this.prisma.user.findUnique({
        where: {
          username: registerUserRequest.username,
        },
        select: {
          id: true,
        },
      }),
    ]);

    // Check if a user with this email already exists
    if (emailUser) {
      throw new CustomException(
        {
          email: 'User with this email already exists',
        },
        StatusCodes.BAD_REQUEST,
      );
    }

    // Check if a user with this username already exists
    if (usernameUser) {
      throw new CustomException(
        {
          username: 'User with this username already exists',
        },
        StatusCodes.BAD_REQUEST,
      );
    }

    // Create a user
    await this.prisma.user.create({
      data: registerUserRequest,
    });
  }

  async findUserById(userId: number) {
    // Find a user by id
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // Check if the user exists
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserById(
    userId: number,
    updateProfileRequest: UpdateProfileRequest,
  ) {
    // Get users by id, email and username
    const [userById, userByEmail, userByUsername] = await Promise.all([
      this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      }),
      this.prisma.user.findFirst({
        where: {
          email: updateProfileRequest.email,
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
        },
      }),
      this.prisma.user.findFirst({
        where: {
          username: updateProfileRequest.username,
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
        },
      }),
    ]);

    // Check if user to update exists
    if (!userById) {
      throw new NotFoundException('User not found');
    }

    // Check if a user with this email already exists
    if (userByEmail) {
      throw new CustomException({
        email: 'User with this email already exists',
      });
    }

    // Check if a user with this username already exists
    if (userByUsername) {
      throw new CustomException({
        email: 'User with this username already exists',
      });
    }

    let user: Omit<User, 'password' | 'unreadCommentsNumber'>;
    try {
      // Update the user
      user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: updateProfileRequest,
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
        },
      });
    } catch (error) {
      // Catch not found
      if (error.code === 'P2025') throw new NotFoundException('User not found');
      throw error;
    }
    return user;
  }

  async removeUserById(userId: number): Promise<void> {
    try {
      // Delete the user
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('User not found');
    }
  }
}
