import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

export type PersonType = 'Client' | 'Professional'

@Entity('persons')
export class PersonEntity {

  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name : string;

  @Column()
  email : string

  @Column()
  typePerson : PersonType

  constructor(name : string, email : string, typePerson : PersonType) {
    this.name = name,
    this.email = email,
    this.typePerson = typePerson
  }
}