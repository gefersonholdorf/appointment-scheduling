import { FastifyReply, FastifyRequest } from "fastify";
import { AppointmentService } from "../services/appointment.service";
import { CreateProfessionalAppointmentDTO } from "../dtos/create-professional-appointment.dto";
import { CreateClientAppointmentDTO } from "../dtos/create-client-appointment.dto";

interface MyParams {
    id : number
}

const appointmentService = new AppointmentService()

export class AppointmentController {

    public async createAppointmentProfessional(request : FastifyRequest, reply : FastifyReply) {
        const appointment : CreateProfessionalAppointmentDTO = request.body as CreateProfessionalAppointmentDTO

        try {
            const result = await appointmentService.createAppointmentProfessional(appointment)

            if (result?.status == 404) {
                return reply.status(404).send(result.descriprion)
            }

            return reply.status(201).send("Agendamento adicionado com sucesso!")
        } catch (error) {
            console.log(error)
            reply.status(500).send(error)
        }
    }

    public async createAppointmentClient(request : FastifyRequest<{ Params: MyParams}>, reply : FastifyReply) {
        const appointment : CreateClientAppointmentDTO = request.body as CreateClientAppointmentDTO
        const id : number = Number(request.params.id)

        try {
            const result = await appointmentService.createAppointmentClient(id, appointment)

            if (result?.status == 404) {
                return reply.status(404).send(result.descriprion)
            }

            return reply.status(201).send("Agendamento marcado com sucesso!")
        } catch (error) {
            console.log(error)
            reply.status(500).send(error)
        }
    }
}