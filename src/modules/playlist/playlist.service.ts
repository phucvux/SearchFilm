import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaylist } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
    constructor (private prisma: PrismaService){}

    async createPlaylist (user_id: number, createPlaylist: CreatePlaylist) {
        return this.prisma.categories.create({
            data: {
                name: createPlaylist.name,
                user: {connect: {user_id: user_id}}
            }
        })
    }

    async getPlaylists (user_id: number) {
        return this.prisma.categories.findMany({
            where: {user_id}
        })
    }

    async editPlaylist (category_id: number, user_id: number, updatePlaylist: CreatePlaylist) {
        return this.prisma.categories.update({
            where: {category_id},
            data: {
                name: updatePlaylist.name,
                user: {connect: {user_id: user_id}}
            }
        })
    }

    async deletePlaylist (category_id: number, user_id: number) {
        return this.prisma.categories.delete({
            where: {category_id, user_id}
        })
    }

}
