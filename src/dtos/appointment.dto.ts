import { IsDateString, IsNumber, IsString } from "class-validator"

export class AppointmentDTO {

    @IsDateString()
    data !: Date

    @IsString()
    status !: String

    @IsNumber()
    clientId !: number | null

    @IsNumber()
    professionalId !: number
}