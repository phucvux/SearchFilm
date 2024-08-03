import { IsString } from "class-validator";


export class CreatePlaylist {
    @IsString()
    name: string;
}