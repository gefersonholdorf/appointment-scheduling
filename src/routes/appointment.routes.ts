import { FastifyInstance } from "fastify";
import { AppointmentController } from "../controllers/appointment.controller";

const appointmentController = new AppointmentController()

export async function appointmentRoutes(fastify : FastifyInstance) {
    fastify.post('/create-appointment', appointmentController.createAppointmentProfessional)
    fastify.put('/create-appointment-client/:id', appointmentController.createAppointmentClient)
}