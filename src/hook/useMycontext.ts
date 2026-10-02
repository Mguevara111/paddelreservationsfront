import { useContext } from "react";
import { SrContext } from "../context/context";

export const useMycontext=()=>{

    let context=useContext(SrContext)

    if(!context) throw new Error('cant use context')

    return context
}