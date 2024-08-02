import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { AddCommentDto } from '../comment/dto/add-comment.dto';

@Controller('movies')
export class MovieController {
    constructor (private readonly commentService: CommentService) {}

    @Post(':id/comments')
    async addComment (@Param('id') movieId: string, @Body() addCommentDto: AddCommentDto) {
         const comment = await this.commentService.addComment(+movieId, addCommentDto);
        return comment;
    }

    @Get(':id/comments')
    async getComment (@Param('id') movieId: string) {
        const allComments = await this.commentService.fetchAllMovieComment(+movieId);
        return allComments;
    }
}
