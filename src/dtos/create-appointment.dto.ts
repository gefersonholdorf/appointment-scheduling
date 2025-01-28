import { IsDateString, IsNumber, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateAppointmentDTO {
    
    @IsDateString()
    data !: Timestamp

    @IsNumber()
    professionalId !: number
    
}