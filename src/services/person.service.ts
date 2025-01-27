import { db } from "../config/data-source";
import { CreatePersonDTO } from "../dtos/create-person.dto";
import { PersonEntity, PersonType } from "../models/person.entity";

export class PersonService {
    private personRepository = db.getRepository(PersonEntity)

    public async createPerson(createPerson : CreatePersonDTO) {

        if (!createPerson.name || !createPerson.email || !createPerson.typePerson) {
            return {
                status: 500,
                description: "Erro ao criar Pessoa! Campo nome, email e tipo de pessoa obrigatórios!"
            }
        }

        if (createPerson.typePerson != "Client") {
            if (createPerson.typePerson != "Professional") {
                return {
                    status: 500,
                    description: "O tipo de pessoa deve ser Client ou Professional!"
                }
            }
        }

        try {
            const person = await this.personRepository.create({
                ...createPerson
            })
            await this.personRepository.save(person)

            return 
        } catch (error) {
            console.log(error)
            return
        }
    }

    public async findAll() {
        try {
            return await this.personRepository.find()

        } catch (error) {
            console.log(error)
            return
        }
    }
}