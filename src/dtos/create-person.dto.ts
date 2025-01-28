import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { PersonType } from "../interfaces/IPerson.interface";

export class CreatePersonDTO {

    @IsString()
    @MaxLength(20)
    @MinLength(3)
    name !: string

    @IsEmail()
    email !: string

    @IsString()
    typePerson !: PersonType
}