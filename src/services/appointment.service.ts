import { db } from "../config/data-source";
import { CreateClientAppointmentDTO } from "../dtos/create-client-appointment.dto";
import { CreateProfessionalAppointmentDTO } from "../dtos/create-professional-appointment.dto";
import { AppointmentEntity } from "../models/appointment.entity";
import { PersonEntity } from "../models/person.entity";

export class AppointmentService {
    private appointmentRepository = db.getRepository(AppointmentEntity)
    private personRepository = db.getRepository(PersonEntity)


    // Metodo para criar Agendamento vazio para o Profissional
    public async createAppointmentProfessional(appointmentClient : CreateProfessionalAppointmentDTO) {
        try {

            const professional = await this.personRepository.findOneBy({
                id: appointmentClient.professionalId
            })

            if (!professional) {
                return {
                    status: 404,
                    descriprion: 'Profissional não encontrado!'
                }
            }

            const appointment : AppointmentEntity = await this.appointmentRepository.create({
                status: 'Free',
                data: appointmentClient.data,
                professionalId: professional
            })

            await this.appointmentRepository.save(appointment)

            return {
                status: 201,
                descriprion: 'Agendamento adicionado com sucesso!'
            }
        } catch (error) {
            console.log(error)
            return
        }
    }

    // Metodo para atualizar agendamento adicionando o Cliente
    public async createAppointmentClient(id : number, appointmentClient : CreateClientAppointmentDTO) {
        try {

            const appointment = await this.appointmentRepository.findOneBy({
                id
            })

            if (!appointment) {
                return {
                    status: 404,
                    descriprion: 'Agendamento não encontrado!'
                }
            }

            const client = await this.personRepository.findOneBy({
                id: appointmentClient.clientId
            })

            if (!client) {
                return {
                    status: 404,
                    descriprion: 'Cliente não encontrado!'
                }
            }

            await this.appointmentRepository.update(id, {
                status: 'Busy',
                clientId: client
            })

            return 
        } catch (error) {
            console.log(error)
            return
        }
    }

    public async listAppointments() {
        try {
            return await this.appointmentRepository.find()
        } catch (error) {
            console.log(error)
            return
        }
    }

    public async listAppointment(id : number) {

    }
}