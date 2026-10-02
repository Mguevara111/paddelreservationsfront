import { useMycontext } from "../hook/useMycontext";

export const Stats=()=>{

    const {state}=useMycontext()
    const {stats}=state

    if(!stats){
        return
    }

    return(
        <section className="stats w-full h-auto flex flex-col justify-center items-start bg-gray-400
            md:flex-row
        ">
            
            <p className="w-full h-auto flex justify-between items-center p-[1rem] md:justify-center"><span className="font-bold">Total Reservations:</span>{stats.totalReservations}</p>
            <p  className="w-full h-auto flex justify-between items-center p-[1rem] md:justify-center"><span className="font-bold">Total Confirm Takings:</span>${stats.totalRevenue}</p>
            <p  className="w-full h-auto flex justify-between items-center p-[1rem] md:justify-center"><span className="font-bold">Total Reservations at Night:</span>{stats.totalReservationNight}</p>
        </section>
    );
}