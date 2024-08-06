import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { PlaylistService } from '../playlist/playlist.service';
import { CreatePlaylist } from '../playlist/dto/create-playlist.dto';
import { AllExceptionsFilter } from '../all-exceptions/all-exceptions.filter';

@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UserController {
    constructor (private readonly playlistService: PlaylistService) {}

    @Post('playlists')
    async createPlaylist (@Body() createPlaylist: CreatePlaylist) {
        const userId = 2 //sau thay token
        const playlist = await this.playlistService.createPlaylist(+userId, createPlaylist);
        return playlist;
    }

    @Get('playlists')
    async getPlaylist () {
        const userId = 2; //sau thay token
        const playlists = await this.playlistService.getPlaylists(+userId);
        return playlists;
    }

}
