import { IsDateString, IsNumber, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateProfessionalAppointmentDTO {
    
    @IsDateString()
    data !: Timestamp

    @IsNumber()
    professionalId !: number
}