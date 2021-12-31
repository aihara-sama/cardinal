import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SentencesModule } from './sentences/sentences.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatGateway } from './chat/chat.gateway';
import { PrismaService } from './database/prisma.service';
import { NotificationsModule } from './notifications/notifications.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../assets'),
    }),
    AuthModule,
    UsersModule,
    SentencesModule,
    MulterModule.register(),
    NotificationsModule,
    TagsModule,
  ],
  providers: [ChatGateway, PrismaService],
})
export class AppModule {}
