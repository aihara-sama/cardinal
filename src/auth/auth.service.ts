import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { LoginRequest } from 'src/auth/dto/login-user-request.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login({ email, password }: LoginRequest) {
    // Get a user by email
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    // Check if user exists and the provided password is correct
    if (!user || !(await compare(password, user.password))) {
      throw new CustomException(
        {
          bad_cred: 'Incorrect email and / or password',
        },
        StatusCodes.UNAUTHORIZED,
      );
    }

    delete user.password;
    return user;
  }
}
