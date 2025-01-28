import { Repository } from "typeorm";
import { AppointmentEntity } from "../models/appointment.entity";
import { db } from "../config/data-source";
import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";

export class AppointmentRepository {
    private repository : Repository<AppointmentEntity>

    constructor() {
        this.repository = db.getRepository(AppointmentEntity)
    }

    public async createAppointment(data : CreateAppointmentDTO) : Promise<AppointmentEntity>{
        const appointment = await this.repository.create({
            status: "Free",
            client: null,
            ...data
        })

        await this.repository.save(appointment)

        return appointment
    }

    public async findById(id : number) : Promise<AppointmentEntity | null> {
        return await this.repository.findOneBy({
            id 
        })
    }

    public async createAppointmentClient(appointmentId : number, clientId : number) : Promise<any> {
        return await this.repository.update(appointmentId, {
            status: "Busy",
            client: clientId
        })
    }

    public async findAll() : Promise<AppointmentEntity[]>{
        return await this.repository.find()
    }

    public async findByProfessionalId(professionalId : number) : Promise<AppointmentEntity[]> {
        return await this.repository.findBy({
            professional: professionalId
        })
    }
}