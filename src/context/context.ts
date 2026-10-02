import { createContext } from "react";


export const SERVER=import.meta.env.VITE_SERVER || 'http://localhost:3300'

export const courtype=['ROOF-ONLY','OPEN-AIR']
export const schendules=['MORNING','NIGHT']



export const generatehours=()=>{
    const hoursarray:string[]=[]

    for(let f=6;f<23;f++){
        if(f<=9){
            hoursarray.push(`0${f}:00`)
        }else{
            hoursarray.push(`${f}:00`)
        }
    }
    return hoursarray
}



export interface Reservation{
    id:string,
    client:string,
    padel_court:string,
    hour:string,
    duration:number | string,
    paddle_rental:boolean,
    confirmed_payment:boolean
}

export type Reservationform=Omit<Reservation,'id'>

export interface Court{
    id:string,
    name:string,
    base_cost:number,
    roofed:boolean
}

export interface Reshelper{
    success:boolean,
    message:string,
    data:Reservation[] | Court[]  | Stats | null
}

export interface Stats{
    totalReservations:number,
    totalRevenue:number,
    totalReservationNight:number
}

export interface Users{
    id:string,
    user:string,
    password:string,
    role:'ADMIN' | 'USER'
}

export type Usersystem=Omit <Users, 'password'>


export interface Userlogin{
    user:string,
    password:string
}

export interface Advice{
    text:string,
    class:string
}

export interface Filters{
    type:string,
    schendule:string
}

export interface State{
    reservations:Reservation[] | null,
    courts:Court[] | null,
    advice:Advice | null,
    user:Usersystem | null,
    stats:Stats | null
}

export interface SRContext{
    state:State,
    putadvice:(advice:Advice | null)=>void,
    newReservation:(reservation:Reservationform)=>void,
    putuser:(user:Usersystem | null)=>void,
    deletestate:()=>void,
    filterreservations:(newr:Reservation[])=>void,
    deleteReservation:(id:string)=>void,
    confirmReservation:(id:string)=>void
}

export const SrContext=createContext<SRContext | null>(null)