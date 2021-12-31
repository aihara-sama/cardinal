import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserRequest } from 'src/auth/dto/register-user-request.dto';

export class UpdateProfileRequest extends PartialType(RegisterUserRequest) {}
