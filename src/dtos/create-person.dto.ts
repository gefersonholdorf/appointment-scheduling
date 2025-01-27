import { IsEmail, IsNumber, IsString } from "class-validator";
import { PersonType } from "../models/person.entity";

export class CreatePersonDTO {

    @IsString()
    name !: string

    @IsEmail()
    email !: string

    @IsNumber()
    typePerson !: PersonType
}