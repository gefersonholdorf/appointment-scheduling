import { FastifyReply, FastifyRequest } from "fastify";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { AppointmentDTO } from "../dtos/appointment.dto";
import { NotFoundException } from "../exceptions/exceptions";

export async function appointmentLimitProfessional(request : FastifyRequest, reply : FastifyReply) {
    const {professionalId} : CreateAppointmentDTO = request.body as CreateAppointmentDTO

    const appointmentRepository = new AppointmentRepository()

    const currentDate = new Date()

    const dateInit = formatDate(currentDate, '00', '00', '00')
    const dateFinish = formatDate(currentDate, '23', '59', '59')

    try {
        
        const appointments : AppointmentDTO[] | null = await appointmentRepository.findAppoimentsByDateAndProfessional(professionalId, dateInit, dateFinish)
        
        if (!appointments) {
            throw new NotFoundException()
        }

        if (appointments.length >= 8) {
            reply.status(400).send({
                error: 'O profissional já tem 8 agendamentos disponíveis neste dia.'
            })
        }

        return true
    } catch (error) {
        throw error
    }
}

export function formatDate(date : Date, hours : string, minutes : string, seconds : string) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }