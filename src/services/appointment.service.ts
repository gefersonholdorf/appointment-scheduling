import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { PersonRepository } from "../repositories/person.repository";

export class AppointmentService {

    private appointmentRepository : AppointmentRepository
    private personRepository : PersonRepository

    constructor() {
        this.appointmentRepository = new AppointmentRepository()
        this.personRepository = new PersonRepository
    }

    // Metodo para criar Agendamento vazio para o Profissional
    public async createAppointment(createAppointment : CreateAppointmentDTO) {
        try {

            if (!createAppointment.data || !createAppointment.professionalId) {
                throw new Error('Campos Data e ProfessionalId obrigatórios!')
            }

            const professional = await this.personRepository.findById(createAppointment.professionalId)

            if (professional?.typePerson != "Professional") {
                throw new Error('Tipo de pessoa deve ser Professional!')
            }

            if (!professional) {
                throw new Error('Profissional não encontrado!')
            }

            return await this.appointmentRepository.createAppointment(createAppointment)

        } catch (error) {
            throw new Error('Erro ao criar Agendamento!')
        }
    }

    // Metodo para atualizar agendamento adicionando o Cliente
    public async createAppointmentClient(appointmentId : number, clientId : number) {
        try {
            
            const appointment = await this.appointmentRepository.findById(appointmentId)

            if (!appointment) {
                throw new Error('Agendamento não encontrado!')
            }

            const client = await this.personRepository.findById(clientId)

            if (!client) {
                throw new Error('Cliente não encontrado!')
            }

            if (client.typePerson != "Client") {
                throw new Error('Tipo de pessoa deve ser Client!')
            }         

            if (appointment.status == "Busy") {
                throw new Error('Horário Indisponível!')
            }

            await this.appointmentRepository.createAppointmentClient(appointmentId, clientId)

            return await this.appointmentRepository.findById(appointmentId)

        } catch (error) {
            throw new Error('Erro ao marcar um horário!')
        }
    }

    public async findAppointments() {
        try {
           return await this.appointmentRepository.findAll()

        } catch (error) {
            throw new Error('Erro ao listar agendamentos')
        }
    }

    public async findAppointmentsProfessionais(professionalId : number) {
        try {
            const professional = await this.personRepository.findById(professionalId)

            if (!professional) {
                throw new Error('Profissional não encontrado!')
            }

            if (professional?.typePerson != "Professional") {
                throw new Error('Tipo de pessoa deve ser Professional!')
            }

            return await this.appointmentRepository.findByProfessionalId(professionalId)

        } catch (error) {
            throw new Error('Erro ao listar os agendamentos!')
        }
    }

    // public async cancelAppointment(appointmentId : number, clientId : number) {
    //     try {
    //         const appointment = await this.appointmentRepository.query(`select * from appointments where id = ${appointmentId}`)
    //         const appointmentClientId = await this.personRepository.query(`select id from persons where id = ${}`

    //         if (!appointment) {
    //             throw new Error('Agendamento não encontrado');
    //         }

    //         const client = await this.personRepository.findOneBy({
    //             id: clientId
    //         })

    //         console.log(appointment, client) //PAREI AQUI - BUG AO CANCELAR


    //         if (appointmentClientId.clientIdId != clientId) {
    //             console.log(appointmentClientId.clientIdId)
    //             console.log(clientId)
    //             return {
    //                 status: 404,
    //                 description: "Acesso negado!"
    //             }
    //         }

    //         await this.appointmentRepository.update(appointmentId, {
    //             status: "Cancel"
    //         })

    //         const newAppointment = await this.appointmentRepository.create({
    //             status: "Free",
    //             data: appointment.data,
    //             professionalId: appointment.professionalId
    //         })
    //         console.log(newAppointment)

    //         await this.appointmentRepository.save(newAppointment)

    //         return {
    //             status: 201,
    //             description: "Agendamento cancelado com sucesso!",
    //             appointmentCancel: appointment,
    //             newDescription: "Novo horário disponível!",
    //             newAppointment: newAppointment
    //         }

    //     } catch (error) {
    //         throw new Error('Erro ao cancelar agendamento!')
    //     }
    // }
}