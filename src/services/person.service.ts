import { Repository } from "typeorm";
import { db } from "../config/data-source";
import { CreatePersonDTO } from "../dtos/create-person.dto";
import { PersonEntity } from "../models/person.entity";
import { PersonRepository } from "../repositories/person.repository";

export class PersonService {
    private personRepository : PersonRepository

    constructor() {
        this.personRepository = new PersonRepository()
    }

    public async createPerson(createPerson : CreatePersonDTO) {

        if (!createPerson.name || !createPerson.email || !createPerson.typePerson) {
            throw new Error('Erro ao criar Pessoa! Campo nome, email e tipo de pessoa obrigatórios!')
        }

        if (!["Client", "Professional"].includes(createPerson.typePerson)) {
            throw new Error('O tipo de pessoa deve ser Client ou Professional!')
        }

        try {
            return await this.personRepository.createPerson(createPerson)
            
        } catch (error) {
            throw error
        }
    }

    public async findAll() {
        try {
            return await this.personRepository.findAll()

        } catch (error) {
            throw error
        }
    }
}