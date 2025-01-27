import { db } from "../config/data-source";
import { CreatePersonDTO } from "../dtos/create-person.dto";
import { PersonEntity } from "../models/person.entity";

export class PersonService {
    private personRepository = db.getRepository(PersonEntity)

    public async createPerson(createPerson : CreatePersonDTO) {
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
}