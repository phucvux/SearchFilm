import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class AddCommentDto {
    @IsString()
    content: string;
}