import type { CoffeeType } from "../type/coffee";
import { Coffee } from "./Coffee";
import styles from "./CoffeeList.module.css";

type Props = {
  coffees: CoffeeType[];
  emptyText?: string;
};

export const CoffeeList = ({ coffees, emptyText = "No coffees." }: Props) => {
  if (!coffees?.length) {
    return <p className={styles.empty}>{emptyText}</p>;
  }

  return (
    <section className={styles.list} aria-label="coffee list">
      {coffees.map((c) => (
        <Coffee key={c.id} coffee={c} />
      ))}
    </section>
  );
};
