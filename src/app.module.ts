import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CommentModule } from './modules/comment/comment.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    CommentModule,
    MovieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
