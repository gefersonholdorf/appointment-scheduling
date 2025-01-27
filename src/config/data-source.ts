import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { PersonEntity } from "../models/person.entity";
import { AppointmentEntity } from "../models/appointment.entity";

dotenv.config();

export const db = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    username:process.env.DB_USER || "root",
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "appointment-scheduling",
    synchronize:true,
    entities: [PersonEntity, AppointmentEntity]
})