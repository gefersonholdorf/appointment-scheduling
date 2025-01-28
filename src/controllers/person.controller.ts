import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePersonDTO } from "../dtos/create-person.dto";
import { PersonRepository } from "../repositories/person.repository";
import { PersonService } from "../services/person.service";
import { PersonEntity } from "../models/person.entity";

export class PersonController {

    private personService : PersonService

    constructor() {
        this.personService = new PersonService()
    }

    public async createPerson(request : FastifyRequest, reply : FastifyReply) : Promise<void>{
        const createPerson : CreatePersonDTO = request.body as CreatePersonDTO

        try {
            const person = await this.personService.createPerson(createPerson)

            reply.status(201).send({
                status: "Pessoa cadastrada com sucesso",
                person: person
            })

        } catch (error) {
            console.log(error)
            reply.status(400).send(`Erro ao criar Pessoa - ${error}`)
        }

    }

    public async findAll(request : FastifyRequest, reply : FastifyReply) : Promise<PersonEntity[] | undefined>{
        try {
            const persons = await this.personService.findAll()

            return reply.status(200).send(persons)

        } catch (error) {
            console.log(error)
            reply.status(400).send(`Erro ao listas as Pessoas - ${error}`)
        }
    }
}