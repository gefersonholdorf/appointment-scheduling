import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { BadRequestException, InvalidPersonTypeClientException, InvalidPersonTypeProfessionalException, NotFoundException } from "../exceptions/exceptions";
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

        if (!createAppointment.data || !createAppointment.professionalId) {
            throw new BadRequestException()
        }

        try {

            const professional = await this.personRepository.findById(createAppointment.professionalId)

            if (!professional) {
                throw new NotFoundException()
            }

            if (professional?.typePerson != "Professional") {
                throw new InvalidPersonTypeProfessionalException()
            }

            return await this.appointmentRepository.createAppointment(createAppointment)

        } catch (error) {
            throw error
        }
    }

    // Metodo para atualizar agendamento adicionando o Cliente
    public async createAppointmentClient(appointmentId : number, clientId : number) {
        try {
            
            const appointment = await this.appointmentRepository.findById(appointmentId)

            if (!appointment) {
                throw new NotFoundException()
            }

            const client = await this.personRepository.findById(clientId)

            if (!client) {
                throw new NotFoundException()
            }

            if (client.typePerson != "Client") {
                throw new InvalidPersonTypeClientException()
            }         

            if (appointment.status == "Busy") {
                throw new Error('Horário Indisponível!')
            }

            await this.appointmentRepository.createAppointmentClient(appointmentId, clientId)

            return await this.appointmentRepository.findById(appointmentId)

        } catch (error) {
            throw error
        }
    }

    public async findAppointments() {
        try {
           const appointments = await this.appointmentRepository.findAll()

           if (!appointments) {
            throw new NotFoundException()
           }

           return appointments

        } catch (error) {
            throw error
        }
    }

    public async findAppointmentsProfessionais(professionalId : number) {
        try {
            const professional = await this.personRepository.findById(professionalId)

            if (!professional) {
                throw new NotFoundException()
            }

            if (professional?.typePerson != "Professional") {
                throw new InvalidPersonTypeProfessionalException()
            }

            return await this.appointmentRepository.findByProfessionalId(professionalId)

        } catch (error) {
            throw error
        }
    }

    public async cancelAppointmentClient(appointmentId : number, clientId : number) {
        try {
            const client = await this.personRepository.findById(clientId)

            if (!client) {
                throw new NotFoundException()
            }

            if (client.typePerson != "Client") {
                throw new InvalidPersonTypeClientException()
            }    

            const appointment = await this.appointmentRepository.findById(appointmentId)

            if (!appointment) {
                throw new NotFoundException()
            }

            await this.appointmentRepository.cancelAppointmentClient(appointmentId)

            return this.appointmentRepository.findById(appointmentId)

        } catch (error) {
            throw error
        }
    }
}