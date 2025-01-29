import { Repository } from "typeorm";
import { AppointmentEntity } from "../models/appointment.entity";
import { db } from "../config/data-source";
import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { AppointmentDTO } from "../dtos/appointment.dto";

export class AppointmentRepository {
    private repository : Repository<AppointmentEntity>

    constructor() {
        this.repository = db.getRepository(AppointmentEntity)
    }

    public async createAppointment(data : CreateAppointmentDTO) : Promise<AppointmentEntity>{
        const appointment = await this.repository.create({
            status: "Free",
            client: null,
            professional: data.professionalId,
            data: data.data
        })

        await this.repository.save(appointment)

        return appointment
    }

    public async findById(id : number) : Promise<AppointmentDTO | null> {
        const result = await this.repository.query(`select * from appointments where id = ${id}`)

        return result[0] || null
    }

    public async createAppointmentClient(appointmentId : number, clientId : number) : Promise<any> {
        return await this.repository.update(appointmentId, {
            status: "Busy",
            client: clientId
        })
    }

    public async findAll() : Promise<AppointmentEntity[]>{
        return await this.repository.find({
            relations: ['client', 'professional'],
        })
    }

    public async findByProfessionalId(professionalId : number) : Promise<AppointmentEntity[]> {
        return await this.repository.findBy({
            professional: professionalId
        })
    }

    public async cancelAppointmentClient(appointmentId : number) : Promise<any> {
        return await this.repository.update(appointmentId, {
            status: 'Cancel',
        })
    }   
}