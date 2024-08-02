import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('comment')
export class CommentController {
    constructor (private readonly commentService: CommentService) {}


}
