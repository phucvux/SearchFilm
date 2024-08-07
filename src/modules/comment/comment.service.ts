import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async addComment(movieId: number, userId: number, createCommentDto: AddCommentDto) {
    if(!createCommentDto.content) {
      throw new Error("Comment Is Blank");
    }
    return this.prisma.comments.create({
      data: {
        content: createCommentDto.content,
        movie: {
          connect: { movie_id: movieId },
        },
        user: {
          connect: { user_id: userId },
        },
      },
    });
  }

  async fetchAllMovieComment(movieId: number) {
    return this.prisma.comments.findMany({
      where: { movie_id: movieId },
    });
  }

  async updateComment(id: number, updateCommentDto: AddCommentDto) {
    return this.prisma.comments.update({
      where: {comment_id: id },
      data: {
        content: updateCommentDto.content,
      },
    });
  }

  async deleteComment(id: number) {
    return this.prisma.comments.delete({
      where: {comment_id: id },
    });
  }
}
