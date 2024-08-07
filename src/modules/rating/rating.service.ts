import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddRatingDto } from './dto/add-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async addRating(movie_id: number, user_id: number, addRatingDto: AddRatingDto) {
    const existingRating = await this.prisma.ratings.findFirst({
      where: {
        movie_id,
        user_id,
      },
    });

    if (existingRating) {
      throw new BadRequestException('You already rating this film');
    }
    if (addRatingDto.score < 1 || addRatingDto.score > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }
    return this.prisma.ratings.create({
      data: {
        score: addRatingDto.score,
        review: addRatingDto.review,
        movie: { connect: { movie_id: movie_id } },
        user: { connect: { user_id: user_id } },
      },
    });
  }

  async getRate(movie_id: number) {
    return this.prisma.ratings.findMany({
      where: { movie_id },
    });
  }

  async getRateByUser (movie_id: number, user_id:number) {
    const existMovie = await this.prisma.movies.findFirst({
      where: {
        movie_id
      }
    })
    if(!existMovie) {
      throw new HttpException("Movie Is Not Exist", HttpStatus.NOT_FOUND);
    }

    return await this.prisma.ratings.findFirst({
      where: {movie_id, user_id}
    })
  }

  async editOwnRate (rating_id: number, movie_id: number, user_id: number, updateRatingDto: AddRatingDto) {
    const existMovie = await this.prisma.movies.findFirst({
      where: {
        movie_id
      }
    })
    if(!existMovie) {
      throw new HttpException("Movie Is Not Exist", HttpStatus.NOT_FOUND);
    }

    return await this.prisma.ratings.update({
      where: {rating_id, movie_id, user_id} ,
      data: {
        score: updateRatingDto.score,
        review: updateRatingDto.review
      }
    })
  }
}
