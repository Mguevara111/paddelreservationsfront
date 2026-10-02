import { useMycontext } from "../hook/useMycontext";

export const Advice=()=>{

    const {state}=useMycontext()
    const {advice}=state

    if(!advice){
        return
    }

    return(
        <section className={`advice ${advice?advice.class:''} w-full h-[50px] flex justify-center items-center fixed top-0 z-50`}>
            <h2>{advice.text}</h2>
        </section>
    );
}