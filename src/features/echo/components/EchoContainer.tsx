
import { EchoInput } from "./EchoInput";
import { EchoDisplay } from "./EchoDisplay";
import { useEcho } from "../hooks/useEcho";

export const EchoContainer=()=>{

    const {echo,loading,error,returnEcho}=useEcho();

    return (
        <div>
            <EchoInput onEcho={returnEcho}/>
            <EchoDisplay echo={echo}/>
        </div>
    )
}
