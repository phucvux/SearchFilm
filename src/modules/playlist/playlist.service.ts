import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaylist } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
    constructor (private prisma: PrismaService){}

    async createPlaylist (userId: number, createPlaylist: CreatePlaylist) {
        return this.prisma.playlist.create({
            data: {
                name: createPlaylist.name,
                user: {connect: {id: userId}}
            }
        })
    }

    async getPlaylists (userId: number) {
        return this.prisma.playlist.findMany({
            where: {userId}
        })
    }

    async editPlaylist (id: number, userId: number, updatePlaylist: CreatePlaylist) {
        return this.prisma.playlist.update({
            where: {id},
            data: {
                name: updatePlaylist.name,
                user: {connect: {id: userId}}
            }
        })
    }

    async deletePlaylist (id: number, userId: number) {
        return this.prisma.playlist.delete({
            where: {id, userId}
        })
    }

}
