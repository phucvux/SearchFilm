import { Body, Controller, Get, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { AddCommentDto } from '../comment/dto/add-comment.dto';
import { AddRatingDto } from '../rating/dto/add-rating.dto';
import { RatingService } from '../rating/rating.service';
import { AllExceptionsFilter } from '../all-exceptions/all-exceptions.filter';
import { MovieService } from './movie.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('movies')
@UseFilters(AllExceptionsFilter)
export class MovieController {
  constructor(
    private readonly commentService: CommentService,
    private readonly ratingService: RatingService,
    private readonly movieService: MovieService
  ) {}

  @Post(':id/comments')
  @UseGuards(AuthGuard)
  async addComment(
    @Param('id') movieId: string,
    @Body() addCommentDto: AddCommentDto,
    @Req() req:any
  ) {
    const userId = req.user_data.user_id;   //sau thay bang lay token
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
  @UseGuards(AuthGuard)
  async addRating(
    @Param('id') movieId: string,
    @Body() addRatingDto: AddRatingDto, 
    @Req() req:any
  ) {
    const userId = req.user_data.user_id; //sau thay token
    const rating = await this.ratingService.addRating(+movieId, +userId, addRatingDto);
    return rating;
  }

  @Get(':id/rating')
  async getRating(@Param('id') movieId: string) {
    const rates = await this.ratingService.getRate(+movieId);
    return rates;
  }

  @Post(':id/playlist')
  @UseGuards(AuthGuard)
  async addMovieToPlaylist(@Param('id') movie_id: string, @Body() {category_id}: {category_id: string}) {
    const addMovie = await this.movieService.addMovieToPlaylist(+movie_id, +category_id);
    return addMovie;
  }

  @Get(':id/user-rate')
  @UseGuards(AuthGuard)
  async getRateByUser (@Param('id') movie_id: string, @Req() req: any) {
    const user_id = req.user_data.user_id;
    const rated = await this.ratingService.getRateByUser(+movie_id, +user_id);
    return rated;
  }

  @Put(':id/change-rate')
  @UseGuards(AuthGuard)
  async updateOwnReview (@Param('id') movie_id: string, @Body() {rating_id}: {rating_id:string} ,@Body() editRateDto: AddRatingDto, @Req() req: any) {
    const user_id = req.user_data.user_id;
    const newRate = await this.ratingService.editOwnRate(+rating_id, +movie_id, +user_id, editRateDto);
    return newRate;
  }
}
