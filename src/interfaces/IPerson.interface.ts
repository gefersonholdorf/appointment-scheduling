export interface IPerson {
  name : string
  email : string
  typePerson : PersonType
}
export type PersonType = 'Client' | 'Professional'