import { schendules,courtype } from "../context/context";
import { useState } from "react";
import type { Filters } from "../context/context";
import { createfiltersandsend } from "../helpers/helpers";
import { useMycontext } from "../hook/useMycontext";

const initialfilters:Filters={
    type:'',
    schendule:''
}

export const Filtercomp=()=>{
    const [filtersf,setFiltersf]=useState(initialfilters)

    const {filterreservations,putadvice}=useMycontext()

    const handlechange=async (e:React.ChangeEvent<HTMLSelectElement>)=>{
        let thefilters={...filtersf,[e.target.name]:e.target.value}
        setFiltersf(thefilters)
        //console.log(e.target.value)
        let filt=await createfiltersandsend(thefilters) 
        
        if(!filt.success){
            putadvice({text:filt.message,class:'bg-red-400'})
            return
        }
        filterreservations(filt.data.reservations)
        
    }
    
    return(
        <section className="filters w-full h-auto bg-gray-300 flex flex-col justify-center items-center">
            <h2 className="font-bold text-3xl">Filters</h2>
            <article className="w-full h-auto flex justify-center items-center">
                <div className="w-full h-auto flex flex-col justify-center items-center m-[1rem]">
                <p>Court Type:</p>
                <select name="type" id="" onChange={handlechange}>
                    <option value="">ALL</option>
                    {courtype.map((el,i)=>
                        <option value={el} key={i}>{el}</option>
                    )}
                </select>
                </div>

                <div className="w-full h-auto flex flex-col justify-center items-center m-[1rem]">
                <p>Schendule:</p>
                <select name="schendule" id="" onChange={handlechange}>
                    <option value="">ALL</option>
                    {schendules.map((el,i)=>
                        <option value={el} key={i}>{el}</option>
                    )}
                </select>
                </div>
            </article>
        </section>
    );
}