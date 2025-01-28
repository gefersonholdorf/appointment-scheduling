import { Column, Entity, ManyToOne, PersistedEntityNotFoundError, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { PersonEntity } from "./person.entity";
import { IAppointment, StatusAppointment } from "../interfaces/IAppointment.interface";

@Entity('appointments')
export class AppointmentEntity {

    @PrimaryGeneratedColumn()
    id !: number

    @Column()
    status !: StatusAppointment

    @Column({
        type : "datetime"
    })
    data !: Date

    @ManyToOne(() => PersonEntity, (client) => client.id)
    client ?: number | null

    @ManyToOne(() => PersonEntity, (professional) => professional.id)
    professional ?: number
}