import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { PlaylistService } from '../playlist/playlist.service';
import { CreatePlaylist } from '../playlist/dto/create-playlist.dto';
import { AllExceptionsFilter } from '../all-exceptions/all-exceptions.filter';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { FilterUserDto } from './dtos/filter-user.dto';
import { UpdateUserByAdminDto } from './dtos/update-user-by-admin.dto';
import { users } from '@prisma/client';

@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UserController {
    constructor (private readonly playlistService: PlaylistService,
        private userService:UserService
    ) {}

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

    @UseGuards(AuthGuard)
    @Get("/api/user/:id")
    getDetail(@Param('id') id:string) {
        return this.userService.getUserDetail(Number(id))
    }

    @UseGuards(AuthGuard)
    @Get("/api/users/me")
    getMe(@Req() req:any) {
        const user_id = req.user_data.user_id
        return this.userService.getMe(Number(user_id))
    }

    @UseGuards( new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Get("get-all")
    getAll(@Query() query: FilterUserDto) {
        return this.userService.getAll(query)
    }

    @UseGuards(AuthGuard)
    @Put('/api/users/enable-2fa')
    enable2fa(@Req() req:any) {
        const user_id = req.user_data.user_id
        return this.userService.enable2fa(user_id)
    }

    @UseGuards(AuthGuard)
    @Put('/api/users/disable-2fa')
    disable2fa(@Req() req:any) {
        const user_id = req.user_data.user_id
        return this.userService.disable2fa(user_id)
    }


    // Api admin

    @UseGuards(new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Put('/api/admin/users/:id')
    updateUserByAdmin(@Param('id') id:string, @Body() userData: UpdateUserByAdminDto):Promise<users> {
        return this.userService.updateUserByAdmin(Number(id), userData)
    }

    @UseGuards(new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Delete('/api/admin/users/:id')
    deleteUserByAdmin(@Param('id') id:string):Promise<users> {
        return this.userService.deleteUserByAdmin(Number(id))
    }

    @UseGuards(new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Get('/api/admin/users/search')
    getUserByAdmin(@Query() query: FilterUserDto){
        return this.userService.getUserByAdmin(query)
    }

}
