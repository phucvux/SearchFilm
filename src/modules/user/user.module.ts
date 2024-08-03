import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PlaylistService } from '../playlist/playlist.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PlaylistService],
})
export class UserModule {}
