import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePersonDTO } from "../dtos/create-person.dto";
import { PersonService } from "../services/person.service";

const personService = new PersonService()

export class PersonController {

    public async createPerson(request : FastifyRequest, reply : FastifyReply) {
        const createPerson : CreatePersonDTO = request.body as CreatePersonDTO
        console.log(createPerson)

        try {
            const result = await personService.createPerson(createPerson)

            if (result?.status == 500) {
                return reply.status(500).send(result.description)
            }

            reply.status(201).send('Pessoa adicionada com sucesso!')
        } catch (error) {
            console.log(error)
            reply.status(500).send(error)
        }

    }

    public async findAll(request : FastifyRequest, reply : FastifyReply) {
        try {
            const persons = await personService.findAll()

            return reply.status(200).send(persons)
        } catch (error) {
            console.log(error)
            reply.status(500).send(error)
        }
    }
}