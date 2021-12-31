import { PrismaClient, Prisma } from '.prisma/client';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { hashSync } from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(async (params, next) => {
      if (params.model === 'User' && params.action === 'create') {
        const data: Prisma.UserCreateInput = params.args.data;
        data.password = hashSync(data.password, 10);
      }
      return next(params);
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', () => {
      app.close();
    });
  }
}
