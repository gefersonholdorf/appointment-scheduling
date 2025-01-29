import { FastifyReply, FastifyRequest } from "fastify";
import { MyParams } from "../controllers/appointment.controller";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { NotFoundException } from "../exceptions/exceptions";

export async function scheduleInAdvance(request : FastifyRequest<{ Params: MyParams}>, reply : FastifyReply) {
    const appointmentId = request.params.id

    const currentDate = new Date()

    const appointmentRepository = new AppointmentRepository()

    try {
        const appointment = await appointmentRepository.findById(appointmentId)

        if (!appointment) {
            throw new NotFoundException()
        }

        if (appointment.data.getDate() < (currentDate.getDate() + 1)) {
            reply.status(400).send({
                error: "Agendamento deve ser feito com pelo menos 24 horas de antecedência."
            })
        }

        return true
    } catch (error) {
        throw error
    }
}