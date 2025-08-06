import { useState } from "react";

export const useCount = () => {
    const [count,setCount]=useState<number>(0);

    const countUp=()=>{
        setCount(count+1);
    }
    const countDown=()=>{
        setCount(count-1);
    }
    const countUpFive=()=>{
        setCount(count+5);
    }
    const countDownFive=()=>{
        setCount(count-5);
    }
    const reset=()=>{
        setCount(0);
    }

    return {count,countUp,countDown,countUpFive,countDownFive,reset};

}

