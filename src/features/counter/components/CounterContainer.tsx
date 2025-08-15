import { useCount } from "../hooks/useCount";
import { CountDisplay } from "./CountDisplay";
import { CountControls } from "./CountControls";
import styles from "./CounterContainer.module.css";

export const CounterContainer = () => {
  const { count, countUp, countDown, countUpFive, countDownFive, resetCount } =
    useCount();

  return (
    <div className={styles.container}>
      <CountDisplay count={count} />
      <CountControls
        onCountUp={countUp}
        onCountDown={countDown}
        onCountUpFive={countUpFive}
        onCountDownFive={countDownFive}
        onReset={resetCount}
      />
    </div>
  );
};
