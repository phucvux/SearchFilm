import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylist } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistController {
    constructor (private readonly playlistService: PlaylistService) {}

    @Put(':playlistId')
    async editPlaylist (@Param('playlistId') id: string, @Body() updatePlaylist : CreatePlaylist) {
        const userId = 1; //sau thay token
        const newPlaylist = await this.playlistService.editPlaylist(+id, +userId, updatePlaylist);
        return newPlaylist;
    }

    @Delete(':playlistId')
    async deletePlaylist (@Param('playlistId') id: string) {
        const userId = 1;//sau thay token
        const playlist = await this.playlistService.deletePlaylist(+id, +userId);
        return playlist;
    }

    @Delete(':playlistId/movie')
    async removeMovieFromPlaylist (@Param('playlistId') category_id: string, @Body() {movie_id}: {movie_id: string}) {
        const newPlaylist = await this.playlistService.removeMovieFromPlaylist(+category_id, +movie_id);
        return newPlaylist;
    }
}
