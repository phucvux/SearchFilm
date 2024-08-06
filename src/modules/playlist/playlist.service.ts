import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaylist } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
    constructor (private prisma: PrismaService){}

    async createPlaylist (userId: number, createPlaylist: CreatePlaylist) {
        return await this.prisma.categories.create({
            data: {
                name: createPlaylist.name,
                user: {connect: {user_id: userId}}
            }
        })
    }

    async getPlaylists (userId: number) {
        return this.prisma.categories.findMany({
            where: {user_id: userId}
        })
    }

    async editPlaylist (category_id: number, userId: number, updatePlaylist: CreatePlaylist) {
        return this.prisma.categories.update({
            where: {category_id},
            data: {
                name: updatePlaylist.name,
                user: {connect: {user_id: userId}}
            }
        })
    }

    async deletePlaylist (category_id: number, user_id: number) {
        return this.prisma.categories.delete({
            where: {category_id, user_id}
        })
    }

    async removeMovieFromPlaylist (category_id: number, movie_id:number) {
        return this.prisma.category_movies.delete({
            where: {
                category_id_movie_id: {
                    category_id,
                    movie_id
                }
            }
        })
    }
}
