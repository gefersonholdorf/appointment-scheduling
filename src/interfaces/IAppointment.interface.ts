export interface IAppointment {
    data: Date
    status : StatusAppointment
    clientId : number
    professionalId : number
}

export type StatusAppointment = 'Free' | 'Busy' | 'Cancel'