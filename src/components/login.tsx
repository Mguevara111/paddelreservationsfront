import { useState } from "react";
import { useMycontext } from "../hook/useMycontext";
import type { Userlogin } from "../context/context";
import { sendlogindata } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";

const initiallogin:Userlogin={
    user:'',
    password:''
}

export const Login=()=>{
    const [loginform,setLoginform]=useState(initiallogin)

    const {putadvice,putuser}=useMycontext()

    const navigate=useNavigate()

    const changelogin=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginform(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const handlesubmit=async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(loginform.user === '' || loginform.password === ''){
            putadvice({text:'User or password cant be empty',class:'bg-red-400'})
            return
        }

        let loginformserver=await sendlogindata(loginform)
       // console.log(loginformserver)
        if(!loginformserver.success){
            putadvice({text:loginformserver.message,class:'bg-red-400'})
            return
        }

        putuser(loginformserver.data)
        navigate('/reservations')
    }

    return(
        <section className="login w-full h-screen flex justify-center items-center pbg">
            <article className="w-[300px] h-[300px] bg-gray-200 colorframe flex flex-col justify-center items-center">
                <h2 className="font-bold text-3xl mb-[1rem]">Login</h2>
                <form className="w-full h-auto flex flex-col justify-center items-center mb-[1rem]" action="" onSubmit={handlesubmit}>
                    <p className="font-bold">USER:</p>
                    <input name="user" type="text" onChange={changelogin} value={loginform.user} autoComplete="off"/>
                    <p className="font-bold">PASSWORD:</p>
                    <input type="text" name="password" onChange={changelogin} value={loginform.password} autoComplete="off"/>
                    <button className="button" type="submit">Submit</button>
                </form>
            </article>
        </section>
    );
}