import { IUser } from './IUser'

export interface IEvent{
    id : number
    name : string
    description : string
    startDate : string
    endDate : string
    maxGuest : number
    isCancel : boolean
    creator : IUser
}