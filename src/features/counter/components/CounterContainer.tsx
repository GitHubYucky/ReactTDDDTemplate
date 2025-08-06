import { useCount } from "../hooks/useCount";
import { CountDisplay } from "./CountDisplay";
import { Button } from "../../../components/button/button";

export const CounterContainer=()=>{
    const {count,countUp,countDown,countUpFive,countDownFive,reset}=useCount();

    return (
        <div>
            <CountDisplay count={count}/>
            <Button onClick={countUp}>CountUp</Button>
            <Button onClick={countDown}>CountDown</Button>
            <Button onClick={countUpFive}>CountUp5</Button>
            <Button onClick={countDownFive}>CountDown5</Button>
            <Button onClick={reset}>Reset</Button>
        </div>
    )
}
