import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    public name: string

    @IsString()
    @IsNotEmpty()
    public openingDate: Date

    @IsString()
    @IsNotEmpty()
    public state: string
}
