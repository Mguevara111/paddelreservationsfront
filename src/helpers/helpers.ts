/******************helper front *************** */

import { SERVER } from "../context/context"
import type { Reservation, Userlogin } from "../context/context"
import type { Filters } from "../context/context"
import type { Reservationform } from "../context/context"


export const sendlogindata=async (formlogin:Userlogin)=>{
    try {
        let res=await fetch(`${SERVER}/api/auth/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formlogin),
            credentials:'include'
        })
        let info=await res.json()
        //console.log(res)
        if(!res.ok){
            let message=info.message || 'Cant send login form'
            throw new Error(message)
        }

        return{
            success:true,
            message:info.message,
            data:info.data
        }
    } catch (error) {
        let message=error instanceof Error?error.message:'Failed send form login'
        return{
            success:false,
            message,
            data:null
        }
    }
}

export const logoutserver=async ()=>{
    try {
        let res=await fetch(`${SERVER}/api/auth/logout`,{
            method:'POST',
            credentials:'include'
        })
        let info=await res.json()

        if(!res.ok){
            let message=info.message || 'Error trying logout'
            throw new Error(message)
        }

        return{
            success:true,
            message:info.message || 'Logout success',
            data:null
        }

    } catch (error) {
        let message=error instanceof Error?error.message:'Error logout'
        return{
            success:false,
            message,
            data:null
        }
    }
}

export const bringdatafromserver=async ()=>{
    try {
        let res=await fetch(`${SERVER}/api/reservations`,{
            credentials:'include'
        })
        let info=await res.json()
        //console.log(res)
        if(!res.ok){
            let message=info.message || 'Failed getting data'
            throw new Error(message)
        }

        return{
            success:true,
            message:info.message || 'Success loading data',
            data:info.data
        }
    } catch (error) {
        let message=error instanceof Error?error.message:'Failed loading data'
        return{
            success:false,
            message,
            data:null
        }
    }
}

export const createfiltersandsend=async(filter:Filters)=>{
    try {
        let usp=new URLSearchParams()

        if(filter.type && filter.type !==''){
            usp.set('type',filter.type)
        }

        if(filter.schendule && filter.schendule !==''){
            usp.set('schendule',filter.schendule)
        }
        
        let upsstring=usp.toString()
        let linktoserver=upsstring?`${SERVER}/api/reservations?${upsstring}`:`${SERVER}/api/reservations`
        let res = await fetch(`${linktoserver}`,{
            credentials:'include'
        })
        let info=await res.json()

        if(!res.ok){
            let message=info.message || 'Failed filtering data'
            throw new Error(message)
        }

        return{
            success:true,
            message:info.message,
            data:info.data
        }
    
    } catch (error) {
        let mess=error instanceof Error?error.message:'Failed filter data'
        return{
            success:false,
            message:mess,
            data:null
        }
    }
    
    
    
}

export const callstats=async ()=>{
    try {
        let res=await fetch(`${SERVER}/api/stats`,{
            credentials:'include'
        })
        let info=await res.json()

        if(!res.ok){
            let message=info.message || 'Failed bringing stats'
            throw new Error(message)
        }

        return{
            success:true,
            message:info.message,
            data:info.data
        }

    } catch (error) {
        let mess=error instanceof Error?error.message:'Failed stats'
        return{
            success:false,
            message:mess,
            data:null
        }
    }
}

export const senddeleteid=async (sendid:string)=>{
    try {
        let res=await fetch(`${SERVER}/api/reservation/${sendid}`,{
            method:'DELETE',
            credentials:'include'
        })
        let info=await res.json()

        if(!res.ok){
            let messa=info.message || 'Failed deleting reservation'
            throw new Error(messa)
        }

        return{
            success:true,
            message:info.message || 'Reservation deleted',
            data:null
        }

    } catch (error) {
        let messa=error instanceof Error?error.message:'Failed deleting'

        return{
            success:false,
            message:messa,
            data:null
        }
    }
}

export const sendconfirm=async (sendid:string)=>{
    try {
        let res=await fetch(`${SERVER}/api/confirm`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:sendid}),
            credentials:'include'
        })
        let info=await res.json()

        if(!res.ok){
            let messa=info.message || 'Failed confirming reservation'
            throw new Error(messa)
        }

        return{
            success:true,
            message:info.message || 'Reservation confirmed',
            data:null
        }
    } catch (error) {
        let messa=error instanceof Error?error.message:'Failed confirming reservation'
        return{
            success:false,
            message:messa,
            data:null
        }
    }
}

export const validateform=(form:Reservationform)=>{
    let response={
        success:true,
        message:'Sending form'
    }
    if(!form.client || form.client === ''){
        response.success=false
        response.message='Client cant be empty'
        return response
    }

    if(!form.padel_court || form.padel_court === ''){
        response.success=false
        response.message='Paddel court cant be empty'
        return response
    }

    if(!form.hour || form.hour === ''){
        response.success=false
        response.message='You must choose an hour'
        return response
    }

    if(!form.duration || form.duration === ''){
        response.success=false
        response.message='Duration cant be empty'
        return response
    }

    return response
}

export const sendnewreservation=async (form:Reservationform)=>{
    try {
        let res=await fetch(`${SERVER}/api/newreservation`,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(form),
            credentials:'include'
        })
        let info=await res.json()

        if(!res.ok){
            let mess=info.message || 'Failed post new reservation'
            throw new Error(mess)
        }

        return{
            success:true,
            message:info.message || 'New reservation added',
            data:info.data
        }
    } catch (error) {
        let mess=error instanceof Error?error.message:'Failed post new reservation'
        return{
            success:false,
            message:mess,
            data:null
        }
    }
}

// Función auxiliar para convertir "HH:MM" a minutos totales del día
const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

export const verifySchedule = (data: Reservation[], form: Reservationform): boolean => {
    // 1. Filtrar reservas de la misma cancha
    const courtReservations = data.filter(el => el.padel_court === form.padel_court);

    // 2. Convertir la NUEVA reserva a rango de minutos [inicio, fin]
    const newStart = timeToMinutes(form.hour);
    const newDurationMinutes = Number(form.duration) * 60; // Asumiendo que duration viene en horas (ej: 2)
    const newFinish = newStart + newDurationMinutes;

    // 3. Buscar si existe alguna reserva que se SOLAPE (choque)
    const hasOverlap = courtReservations.some(el => {
        const existStart = timeToMinutes(el.hour);
        const existFinish = existStart + (Number(el.duration) * 60);

        // Fórmula universal de solapamiento de rangos [A, B] y [C, D]:
        // Hay choque si el nuevo inicio es menor que el fin existente Y el nuevo fin es mayor que el inicio existente
        return newStart < existFinish && newFinish > existStart;
    });

    // Si HAY solapamiento, la función retorna false (no disponible)
    // Si NO hay solapamiento, retorna true (disponible)
    return !hasOverlap;
};

// export const verifyschendule=(data:Reservation[],form:Reservationform)=>{
    
//     let takencourt=data.filter(el=>el.padel_court === form.padel_court)
//     let newtc=takencourt.map(el=>{
//         //'09:00'
//         let finishhour
//         let extracthour=el.hour<'10:00'?el.hour.substring(1,2):el.hour.substring(0,2)  //'9'
//         let hourstotal=Number(extracthour)+Number(el.duration)
//         if(hourstotal < 10){
//             finishhour=`0${hourstotal}:00`
//         }else{
//             finishhour=`${hourstotal}:00`
//         }
//         return{
//             ...el,
//             finishhour
//         }
//     })
//     console.log(newtc)
//     const searchhour=newtc.find(el=>form.hour < el.hour || form.hour >= el.finishhour)

//     if(!searchhour){
//         return true
//     }
//     return false
// }