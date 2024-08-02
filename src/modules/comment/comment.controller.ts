import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('comments')
export class CommentController {
    constructor (private readonly commentService: CommentService) {}

    @Put(':commentId')
    async editComment (@Param('commentId') id: string, @Body() updateCommentDto: AddCommentDto) {
        const newComment = await this.commentService.updateComment(+id, updateCommentDto);
        return newComment;
    }

    @Delete(':commentId')
    async deleteComment (@Param('commentId') id: string) {
        const comment = await this.commentService.deleteComment(+id);
        return comment;
    }
}
