import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Session as Sess } from 'express-session';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateProfileRequest } from './dto/update-profile-request.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Update profile
  @Patch('me')
  updateUserById(
    @Body() updateProfileRequest: UpdateProfileRequest,
    @Session() session: Sess,
  ) {
    return this.usersService.updateUserById(
      session.user.id,
      updateProfileRequest,
    );
  }

  // Delete profile
  @Delete('me')
  removeUserById(@Session() session: Sess) {
    return this.usersService.removeUserById(session.user.id);
  }

  // Get a user
  @Get(':userId')
  findUserById(@Param('userId') userId: number) {
    return this.usersService.findUserById(userId);
  }
}
