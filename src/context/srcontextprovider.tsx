import { SrContext } from "./context";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Reservationform, State } from "./context";
import { useEffect } from "react";
import type { Advice,Reservation,Usersystem } from "./context";
import { callstats } from "../helpers/helpers";
import { senddeleteid } from "../helpers/helpers";
import { sendconfirm } from "../helpers/helpers";
import { sendnewreservation } from "../helpers/helpers";

import { bringdatafromserver } from "../helpers/helpers";

interface Children{
    children:ReactNode
}

const initialstate:State={
    reservations:null,
    courts:null,
    advice:null,
    user:null,
    stats:null
}

export const SrContextProvider=({children}:Children)=>{
    const [state,setState]=useState(initialstate)

    

    useEffect(()=>{
        if(!state.advice) return

        let tu=setTimeout(()=>{
            putadvice(null)
        },3000)

        return ()=>clearTimeout(tu)
    },[state.advice])

     useEffect(()=>{

        if(!state.user){
            return
        }

        if(state.reservations && state.courts){
            return
        }
        
        const bringdata=async()=>{
            let datafromserver=await bringdatafromserver()

            if(!datafromserver.success){
                putadvice({text:datafromserver.message, class:'bg-red-400'})
                return
            }

            setState(prev=>({...prev,reservations:datafromserver.data.reservations,courts:datafromserver.data.courts}))
        }

        bringdata()

    },[state.user])

    useEffect(()=>{
        if(!state.reservations){
            return
        }
        const bringstats=async ()=>{
            let stats=await callstats()

            if(!stats.success){
                putadvice({text:stats.message,class:'bg-red-400'})
                return
            }

            setState(prev=>({...prev,stats:stats.data}))
        }

        bringstats()
    },[state.reservations])


    const putadvice=(newadvice:Advice | null):void=>{
        setState(prev=>({...prev,advice:newadvice}))
    }
    
    const newReservation=async (reservation:Reservationform)=>{
        let newreservationtoserver=await sendnewreservation(reservation)
        if(!newreservationtoserver.success){
            putadvice({text:newreservationtoserver.message,class:'bg-red-400'})
            return
        }

        setState(prev=>({...prev,reservations:newreservationtoserver.data.reservations}))
        putadvice({text:newreservationtoserver.message,class:'bg-green-400'})
    }
    
    const putuser=(newuser:Usersystem | null):void=>{
        setState(prev=>({...prev,user:newuser}))
    }

    const deletestate=()=>{
        setState(initialstate)
    }

    const filterreservations=(newreservations:Reservation[])=>{
        setState(prev=>({...prev,reservations:newreservations}))
    }

    const deleteReservation=async (id:string)=>{
        const sendid=await senddeleteid(id)

        if(!sendid.success){
            putadvice({text:sendid.message,class:'bg-red-400'})
            return
        }

        const newreservations=state.reservations?.filter(el=>el.id !== id)

        if(!newreservations) return
        setState(prev=>({...prev,reservations:newreservations}))
        putadvice({text:sendid.message,class:'bg-green-400'})
    }

    const confirmReservation=async (id:string)=>{
        let sc=await sendconfirm(id)

        if(!sc.success){
            putadvice({text:sc.message,class:'bg-red-400'})
            return
        }

        if(!state.reservations) return
        let newreservations=state.reservations.map(el=>{
            if(el.id === id){
                return{
                    ...el,
                    confirmed_payment:true
                }
            }else{
                return el
            }
        })

        setState(prev=>({...prev,reservations:newreservations}))
        putadvice({text:sc.message,class:'bg-green-400'})
    }

    return(
        <SrContext.Provider value={{state,putadvice,newReservation,putuser,deletestate,filterreservations,deleteReservation,confirmReservation}}>
            {children}
        </SrContext.Provider>
    );
}