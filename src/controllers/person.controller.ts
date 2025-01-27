import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePersonDTO } from "../dtos/create-person.dto";
import { PersonService } from "../services/person.service";

const personService = new PersonService()

export class PersonController {

    public async createPerson(request : FastifyRequest, reply : FastifyReply) {
        const createPerson : CreatePersonDTO = request.body as CreatePersonDTO
        console.log(createPerson)

        try {
            await personService.createPerson(createPerson)

            reply.status(201).send('Pessoa adicionada com sucesso')
        } catch (error) {
            console.log(error)
            reply.status(500).send(error)
        }

    }
}