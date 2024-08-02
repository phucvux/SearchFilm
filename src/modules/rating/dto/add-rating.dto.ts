import { IsNumber, Max, Min } from "class-validator";

export class AddRatingDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    value: number;
}