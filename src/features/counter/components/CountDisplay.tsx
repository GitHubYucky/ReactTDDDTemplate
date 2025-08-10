import styles from "./CountDisplay.module.css";

type Props = {
  count: number;
};

export const CountDisplay = ({ count }: Props) => {
  return <div className={styles.count}>{count}</div>;
};
