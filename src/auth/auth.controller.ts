import {
  All,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UploadedFile,
  Session,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { LoginRequest } from 'src/auth/dto/login-user-request.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserRequest } from './dto/register-user-request.dto';
import { Session as Sess } from 'express-session';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotAuthGuard } from 'src/guards/not-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // Register
  @Post('/register')
  @HttpCode(204)
  @UseGuards(NotAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './dist/assets/images/avatars',
    }),
  )
  async registerUser(
    @Body() registerUserRequest: RegisterUserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.usersService.createUser({
      ...registerUserRequest,
      avatar: file && file.filename,
    });
  }

  // Login
  @Post('/login')
  @UseGuards(NotAuthGuard)
  @HttpCode(200)
  async login(@Session() session: Sess, @Body() loginRequest: LoginRequest) {
    const user = await this.authService.login(loginRequest);
    session.user = user;

    return { user };
  }

  // Logout
  @All('/logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) throw new InternalServerErrorException();
      res.clearCookie('connect.sid');
      res.json();
    });
  }
}
