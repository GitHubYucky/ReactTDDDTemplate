import type { CoffeeType } from "@/features/coffee/type/coffee";
import { Coffee } from "@/features/coffee/components/Coffee";
import styles from "@/features/coffee/components/CoffeeList.module.css";

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
