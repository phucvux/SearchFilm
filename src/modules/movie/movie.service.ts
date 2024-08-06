import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MovieService {
    constructor(private prisma: PrismaService){}

    async addMovieToPlaylist (movie_id: number, category_id: number) {
        return this.prisma.category_movies.create({
            data: {
                category: {connect: {category_id}},
                movie: {connect: {movie_id}}
            }
        })
    }
}
