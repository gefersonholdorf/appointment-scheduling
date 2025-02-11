import { FastifyInstance, FastifyRequest } from "fastify";
import { AppointmentController, MyParams } from "../controllers/appointment.controller";
import { appointmentLimitProfessional } from "../validators/appointment-validation";
import { scheduleInAdvance } from "../validators/scheduleIn-advance-validation";
import { cancellationValidation } from "../validators/cancellation-validation";

const appointmentController = new AppointmentController()

export async function appointmentRoutes(fastify : FastifyInstance) {
    fastify.post('/create-appointment', {preHandler: appointmentLimitProfessional}, (request, reply) => appointmentController.createAppointment(request, reply))
    fastify.put('/create-appointment-client/:id', {preHandler: scheduleInAdvance}, (request : FastifyRequest<{ Params: MyParams}>, reply) => appointmentController.createAppointmentClient(request, reply))
    fastify.get('/list-appointments', (request, reply) => appointmentController.findAllAppointments(request, reply))
    fastify.get('/list-appointments/:id', (request : FastifyRequest<{ Params: MyParams}>, reply) => appointmentController.findAppointmentsProfessional(request, reply))
    fastify.post('/cancel-appointment/:id', {preHandler: cancellationValidation}, (request : FastifyRequest<{ Params: MyParams}>, reply) => appointmentController.cancelAppointment(request , reply))
}