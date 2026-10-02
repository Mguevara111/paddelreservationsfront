import { useMycontext } from "../hook/useMycontext";
import { Loader } from "./loader";
import { Filtercomp } from "./filters";
import { Link } from "react-router-dom";

export const Reservations=()=>{

    const {state,deleteReservation,confirmReservation}=useMycontext()
    
    const handledelete=(id:string)=>{
        if(!id){
            return
        }
        deleteReservation(id)
    }

    const handleconfirm=(id:string)=>{
        confirmReservation(id)
    }
   

    if(!state.reservations){
        return <Loader></Loader>
    }
 
    
    return(
        <>
        <Filtercomp></Filtercomp>
        <section className="reservations w-full h-auto flex flex-col justify-center items-center">
            {/* <Link to="/reservations/newreservation">
                <button className="button">New Reservation</button>
            </Link> */}
            <h2 className="font-bold text-3xl">Resevations</h2>
            <article className="w-full h-auto flex flex-col justify-center items-start overflow-scroll lg:items-center">
                
                <table className="">
                    <thead>
                        <tr>
                            <th>CLIENT</th>
                            <th>PADDLE COURT</th>
                            <th>HOUR</th>
                            <th>DURATION</th>
                            <th>PADDLE RENTAL</th>
                            <th colSpan={2}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.reservations.map(el=>
                            <tr key={el.id}>
                                <td>{el.client}</td>
                                <td>{(() => {const court = state.courts?.find(ele => ele.id === el.padel_court);
                                    return court ? court.name : 'No asignado';
                                })()}</td>
                                <td>{el.hour}</td>
                                <td>{el.duration}</td>
                                <td>{el.paddle_rental?'TRUE':'FALSE'}</td>
                                <td className="w-full h-auto flex justify-center items-center">
                                    <button className="button" onClick={()=>handledelete(el.id)}>Cancel</button>
                                    {!el.confirmed_payment&&<button className="button" style={{width:'17ch'}} onClick={()=>handleconfirm(el.id)}>Confirm Payment</button>}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </article>
        </section>
        </>
    );
}