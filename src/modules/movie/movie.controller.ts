import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { AddCommentDto } from '../comment/dto/add-comment.dto';
import { AddRatingDto } from '../rating/dto/add-rating.dto';
import { RatingService } from '../rating/rating.service';
import { AllExceptionsFilter } from '../all-exceptions/all-exceptions.filter';
import { MovieService } from './movie.service';

@Controller('movies')
@UseFilters(AllExceptionsFilter)
export class MovieController {
  constructor(
    private readonly commentService: CommentService,
    private readonly ratingService: RatingService,
    private readonly movieService: MovieService
  ) {}

  @Post(':id/comments')
  async addComment(
    @Param('id') movieId: string,
    @Body() addCommentDto: AddCommentDto,
  ) {
    const userId = 1;   //sau thay bang lay token
    const comment = await this.commentService.addComment(
      +movieId,
      +userId,
      addCommentDto,
    );
    return comment;
  }

  @Get(':id/comments')
  async getComment(@Param('id') movieId: string) {
    const allComments =
      await this.commentService.fetchAllMovieComment(+movieId);
    return allComments;
  }

  @Post(':id/rate')
  async addRating(
    @Param('id') movieId: string,
    @Body() addRatingDto: AddRatingDto,
  ) {
    const userId = 1; //sau thay token
    const rating = await this.ratingService.addRating(+movieId, +userId, addRatingDto);
    return rating;
  }

  @Get(':id/rating')
  async getRating(@Param('id') movieId: string) {
    const rates = await this.ratingService.getRate(+movieId);
    return rates;
  }

  @Post(':id/playlist')
  async addMovieToPlaylist(@Param('id') movie_id: string, @Body() {category_id}: {category_id: string}) {
    const addMovie = await this.movieService.addMovieToPlaylist(+movie_id, +category_id);
    return addMovie;
  }
}
