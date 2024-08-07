import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { users } from '@prisma/client';
import { AuthService } from './auth.service';
import { Login2faDto } from './dtos/login-2fa.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/register')
    register(@Body() register: RegisterDto):Promise<users> {
        return this.authService.register(register)
    }

    @Post('/login')
    login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData)
    }

    @Get('/verify-account')
    verifyAccount(@Query('token') token: string) {
        return this.authService.verifyAccount(token)
    }

    @Post('/api/users/login-2fa')
    login2fa(@Body() loginData: Login2faDto) {
        return this.authService.login2fa(loginData)
    }

    @Post('/refresh-token')
    refreshToken(@Body() token:any) {
        return this.authService.refreshToken(token.refresh_token)
    }
}
