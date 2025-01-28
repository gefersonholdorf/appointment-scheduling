import { Repository } from "typeorm";
import { PersonEntity } from "../models/person.entity";
import { CreatePersonDTO } from "../dtos/create-person.dto";
import { db } from "../config/data-source";

export class PersonRepository{

    private repository : Repository<PersonEntity>

    constructor() {
        this.repository = db.getRepository(PersonEntity)
    }

    public async createPerson(data : CreatePersonDTO) : Promise<PersonEntity> {
        const personClient = await this.repository.create(data)

        await this.repository.save(personClient)

        return personClient
    }

    public async findAll() : Promise<PersonEntity[]> {
        return await this.repository.find()
    }

    public async findById(id : number) : Promise<PersonEntity | null> {
        return await this.repository.findOneBy({
            id
        })
    }
}