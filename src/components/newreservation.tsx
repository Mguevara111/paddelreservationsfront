import { Link } from "react-router-dom";
import type { Reservationform } from "../context/context";
import { useState } from "react";
import { useMycontext } from "../hook/useMycontext";
import { generatehours } from "../context/context";
import { validateform } from "../helpers/helpers";
import { verifySchedule } from "../helpers/helpers";

const initialform:Reservationform={
    client:'',
    padel_court:'',
    hour:'',
    duration:'',
    paddle_rental:false,
    confirmed_payment:false
}

export const Newreservation=()=>{
    const [formr,setFormr]=useState(initialform)

    const {state,putadvice,newReservation}=useMycontext()

    const handlechange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {type,name}=e.target
        let myvalue:string | boolean | number=e.target.value
        if(type === 'checkbox'){
            myvalue=e.target.checked
        }
        if(name === 'duration'){
            myvalue=Number(e.target.value)
        }
        setFormr(prev=>({...prev,[e.target.name]:myvalue}))
    }

    const handlesubmit=(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const isvalidate=validateform(formr)
        if(!isvalidate.success){
            putadvice({text:isvalidate.message,class:'bg-red-400'})
            return
        }

        if(!state.reservations) return
        let schendulever=verifySchedule(state.reservations,formr)
        if(!schendulever){
            putadvice({text:`The hour ${formr.hour} is already taken try another one`,class:'bg-red-400'})
            return
        }
        
        newReservation(formr)
        setFormr(initialform)
    }

    return(
        <section className="newreservation w-full h-[calc(100vh-210px)] flex flex-col justify-center items-center">
            {/* <Link to="/reservations">
                <button className="button">View Reservations</button>
            </Link> */}
            <h2 className="font-bold text-3xl">New Reservation</h2>
            <article className="newreservation__container w-[400px] h-auto">
                <form className="w-full h-auto flex flex-col justify-center items-center" action="" onSubmit={handlesubmit}>
                    <p className="font-bold">Client:</p>
                    <input type="text" name="client" onChange={handlechange} value={formr.client}/>
                    <p className="font-bold">Select court:</p>
                    <select name="padel_court" id="" value={formr.padel_court?formr.padel_court:''} onChange={handlechange}>
                        <option value="">---</option>
                        {state.courts?.map(el=>
                            <option value={el.id} key={el.id}>{el.name}</option>
                        )}
                    </select>
                    <p className="font-bold">Hour:</p>
                    <select name="hour" id="" value={formr.hour?formr.hour:''} onChange={handlechange}>
                        <option value="">---</option>
                        {generatehours().map((el,i)=>
                            <option value={el} key={i}>{el}</option>
                        )}
                    </select>
                    <p className="font-bold">Duration:</p>
                    <input type="text" name="duration" onChange={handlechange} value={formr.duration}/>
                    <div className="w-full h-auto flex flex-col justify-center items-center">
                        <p className="font-bold">Paddle Rental</p>
                        <input type="checkbox" name="paddle_rental" checked={formr.paddle_rental} onChange={handlechange}/>
                    </div>
                    <br />
                    <button className="button" type="submit">Submit</button>
                </form>
            </article>
        </section>
    );
}