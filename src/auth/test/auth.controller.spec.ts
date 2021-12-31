import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {User} from '@prisma/client'
import { RegisterUserRequest } from './dto/register-user-request.dto';
import { userStub } from './test/stubs/user.stub';
import faker from 'faker'

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    describe('When registerUser is called', () => {
        let user: Omit<User, 'password'>
        let registerUserRequest: RegisterUserRequest

        beforeEach( async() => {
          registerUserRequest = {
            avatar: faker.internet.avatar(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
          };

        })
    })
    
  })

});
