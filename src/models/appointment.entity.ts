import { Column, Entity, ManyToOne, PersistedEntityNotFoundError, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";

export type StatusAppointment = 'Free' | 'Busy'

@Entity('appointments')
export class AppointmentEntity {

    @PrimaryGeneratedColumn()
    id !: number

    @Column()
    status : StatusAppointment

    @Column()
    data : Date

    @ManyToOne(() => PersonEntity, (client) => client.id)
    clientId : PersonEntity

    @ManyToOne(() => PersonEntity, (professional) => professional.id)
    professionalId : PersonEntity

    constructor(status : StatusAppointment, data : Date, clientId : PersonEntity, professionalId : PersonEntity) {
        this.status = status,
        this.data = data,
        this.clientId = clientId,
        this.professionalId = professionalId
    }

}