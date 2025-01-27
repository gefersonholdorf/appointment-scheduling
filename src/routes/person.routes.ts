import { FastifyInstance } from "fastify";
import { PersonController } from "../controllers/person.controller";

const personController = new PersonController()

export async function personRoutes(fastify : FastifyInstance) {
    fastify.post('/create-person', personController.createPerson)
    fastify.get('/persons', personController.findAll)
}