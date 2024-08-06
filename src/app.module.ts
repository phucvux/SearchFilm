import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CommentModule } from './modules/comment/comment.module';
import { MovieModule } from './modules/movie/movie.module';
import { RatingModule } from './modules/rating/rating.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    CommentModule,
    MovieModule,
    RatingModule,
    PlaylistModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
