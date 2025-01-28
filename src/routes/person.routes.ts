import { FastifyInstance } from "fastify";
import { PersonController } from "../controllers/person.controller";

const personController = new PersonController()

export async function personRoutes(fastify : FastifyInstance) {
    fastify.post('/create-person', (request, reply) => personController.createPerson(request, reply))
    fastify.get('/persons', (request, reply) => personController.findAll(request, reply))
}