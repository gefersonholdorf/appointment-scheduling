import { IsDateString, IsNumber, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateClientAppointmentDTO {
    
    @IsDateString()
    data !: Timestamp

    @IsNumber()
    clientId !: number
}