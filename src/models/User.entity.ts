import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  private id !: number;

  @Column()
  private name: string;

  constructor(name : string) {
    this.name = name
  }
}