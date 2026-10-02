import { Outlet } from "react-router-dom"
import { Welcomeheader } from "./welcomeheader";
import { useMycontext } from "../hook/useMycontext";
import { Navigate } from "react-router-dom";
import { Stats } from "./stats";


export const Layout=()=>{

    const {state}=useMycontext()
    const {user}=state

    if(!user){
        return <Navigate to="/" replace></Navigate>
    }

    return(
        <>
            <Welcomeheader></Welcomeheader>
            <Stats></Stats>
            <main>
                
                <Outlet></Outlet>
            </main>
        </>
    );
}