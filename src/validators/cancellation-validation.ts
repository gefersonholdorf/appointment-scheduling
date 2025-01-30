import { FastifyReply, FastifyRequest } from "fastify";
import { MyParams } from "../controllers/appointment.controller";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { NotFoundException } from "../exceptions/exceptions";

export async function cancellationValidation(request : FastifyRequest<{Params: MyParams}>, reply : FastifyReply) {
    const appointmentId = request.params.id

    const currentDate = new Date()
    console.log(currentDate)
    
    const appointmentRepository = new AppointmentRepository()

    try {
        const appointment = await appointmentRepository.findById(appointmentId)

        if (!appointment) {
            throw new NotFoundException()
        }

        appointment.data.setHours(appointment.data.getHours() - 12)

        console.log(appointment.data)
        console.log(currentDate)

        if (appointment.data < currentDate) {
            reply.status(400).send({
                error: "Cancelamentos devem ser realizados 12 horas com antecedência!"
            })
        }
    } catch (error) {
        throw error
    }
}