import { useMycontext } from "../hook/useMycontext";
import { logoutserver } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Welcomeheader=()=>{

    const {state,putadvice,putuser,deletestate}=useMycontext()
    const {user}=state

    const navigate=useNavigate()
    const location=useLocation()

    const ubication=location.pathname==='/reservations'

    const handlenavigate=()=>{
        if(ubication){
            navigate('/reservations/newreservation')
        }else{
            navigate('/reservations')
        }
    }

    const handlelogout=async ()=>{
        let islogout=await logoutserver()

        if(!islogout.success){
            putadvice({text:islogout.message,class:'bg-red-400'})
            return
        }

        putadvice({text:islogout.message,class:'bg-green-400'})
        putuser(null)
        deletestate()
        navigate('/')

    }

    if(!user){
        return
    }

    return(
        <section className="welcomeheader w-full h-[40px] flex justify-between items-center p-[1rem] bg-gray-500 md:p-[2rem]">
            <p className="font-bold text-white">Welcome {user.user}</p>
            <div className="w-full h-auto flex justify-end items-center">
                <button className="button" onClick={handlenavigate}>Navi</button>
                <button className="flex justify-center items-center text-white" onClick={handlelogout}>Logout<svg className="fill-white w-[30px] h-[30px]" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-120v-80l240-40v-445q0-15-9-27t-23-14l-208-34v-80l220 36q44 8 72 41t28 77v512l-320 54Zm-160 0v-80h80v-560q0-34 23.5-57t56.5-23h400q34 0 57 23t23 57v560h80v80H120Zm160-80h400v-560H280v560Z"/></svg></button>
            </div>
            
        </section>
    );
}