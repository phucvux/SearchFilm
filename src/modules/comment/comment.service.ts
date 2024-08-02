import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class CommentService {
    constructor (private prisma: PrismaService) {}

    async addComment (movieId: number, createCommentDto: AddCommentDto) {
        return this.prisma.comment.create({
            data: {
                content: createCommentDto.content,
                movie: {
                    connect: {id: movieId}
                }
            }
        })
    }

    async fetchAllMovieComment (movieId: number) {
        return this.prisma.comment.findMany({
            where: { movieId },
        });
    }
}