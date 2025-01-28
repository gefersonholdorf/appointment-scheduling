import { FastifyReply, FastifyRequest } from "fastify";
import { AppointmentService } from "../services/appointment.service";
import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";

export interface MyParams {
    id : number
}

export class AppointmentController {

    private appointmentService : AppointmentService

    constructor() {
        this.appointmentService = new AppointmentService()
    }

    public async createAppointment(request : FastifyRequest, reply : FastifyReply) : Promise<void>{
        const appointment : CreateAppointmentDTO = request.body as CreateAppointmentDTO

        try {
            const result = await this.appointmentService.createAppointment(appointment)

            reply.status(201).send({
                status: "Horário adicionado com sucesso!",
                appointment: result
            })

        } catch (error) {
            console.log(error)
            reply.status(500).send(`Erro ao criar horário - ${error}`)
        }
    }

    public async createAppointmentClient(request : FastifyRequest<{ Params: MyParams}>, reply : FastifyReply) {
        const appointmentId : number = Number(request.params.id)
        const { clientId } = request.body as {clientId : number}

        try {
            const result = await this.appointmentService.createAppointmentClient(appointmentId, clientId)

            return reply.status(201).send({
                status: "Agendamento marcado com sucesso!",
                appointment: result
            })
        } catch (error) {
            console.log(error)
            reply.status(500).send(`Erro ao criar agendamento - ${error}`)
        }
    }

    public async findAllAppointments(request : FastifyRequest, reply : FastifyReply) {
        try {
            const appointments = await this.appointmentService.findAppointments()

            return reply.status(200).send(appointments)

        } catch (error) {
            console.log(error)
            reply.status(500).send(`Erro ao listar agendamentos - ${error}`)
        }
    }

    public async findAppointmentsProfessional(request : FastifyRequest<{Params: MyParams}>, reply : FastifyReply) {
        const professionalId : number = Number(request.params.id)

        try {
            
            const result = await this.appointmentService.findAppointmentsProfessionais(professionalId)

            reply.status(200).send(result)

        } catch (error) {
            console.log(error)
            reply.status(500).send(`Erro ao listar agendamentos - ${error}`)
        }
    }

    // public async cancelAppointment(request : FastifyRequest<{Params : MyParams}>, reply : FastifyReply) {
    //     const id : number = request.params.id
    //     const body : {clientId : number} = request.body as {clientId : number}

    //     try {
    //         const result = await appointmentService.cancelAppointment(id, body.clientId)

    //         if (result.status == 404) {
    //             return reply.status(400).send(result.description)
    //         }

    //         return reply.status(200).send({
    //             status: result.description,
    //             appointmentCancel: result.appointmentCancel,
    //             newStatus: result.newDescription,
    //             newAppointment: result.newAppointment
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         reply.status(500).send(error)
    //     }
    // }
}