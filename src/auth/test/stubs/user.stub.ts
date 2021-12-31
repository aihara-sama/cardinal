import { User } from '.prisma/client';
import faker from 'faker';

export const userStub = (): Omit<User, 'password'> => ({
  id: 1,
  avatar: 'default-avatar.png',
  email: faker.internet.email(),
  username: faker.unique(faker.internet.userName),
  unreadCommentsNumber: 0,
});
