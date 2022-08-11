import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreatePlayerDto {
    @IsString()
    @IsNotEmpty()
    public name: string

    @IsString()
    @IsNotEmpty()
    public position: string

    @IsNumberString()
    @IsNotEmpty()
    public height: string

    @IsNumberString()
    @IsNotEmpty()
    public weight: string
}
