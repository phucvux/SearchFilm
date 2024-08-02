import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CommentService } from '../comment/comment.service';
import { RatingService } from '../rating/rating.service';

@Module({
  imports: [PrismaModule],
  providers: [MovieService, CommentService, RatingService],
  controllers: [MovieController]
})
export class MovieModule {}
