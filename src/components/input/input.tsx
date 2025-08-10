import type { InputHTMLAttributes } from "react";
import styles from "./input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  return <input className={styles.input} {...props} />;
};
