import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddRatingDto } from './dto/add-rating.dto';

@Injectable()
export class RatingService {
    constructor(private prisma: PrismaService) {}

    async addRating (movieId: number, addRatingDto: AddRatingDto) {
        if (addRatingDto.value < 1 || addRatingDto.value > 5) {
            throw new BadRequestException('Rating must be between 1 and 5');
          }
        return this.prisma.rating.create({
            data: {
                value: addRatingDto.value,
                movie: {connect: {id: movieId}}
            }
        })
    }

    async getRate (movieId: number) {
        return this.prisma.rating.findMany({
            where: {movieId}
        })
    }

}
