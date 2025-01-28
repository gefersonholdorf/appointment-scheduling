import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IPerson, PersonType } from '../interfaces/IPerson.interface';

@Entity('persons')
export class PersonEntity{

  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name !: string;

  @Column()
  email !: string

  @Column()
  typePerson !: PersonType
}