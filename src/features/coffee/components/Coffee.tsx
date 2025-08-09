import type { CoffeeType } from "../type/coffee";
import styles from "./Coffee.module.css";

type Props = {
  coffee: CoffeeType;
};

export const Coffee = ({ coffee }: Props) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{coffee.title}</h2>
      <img className={styles.image} src={coffee.image} alt={coffee.title} />
      <p className={styles.description}>{coffee.description}</p>
      <h4>Ingredients:</h4>
      <ul className={styles.ingredients}>
        {coffee.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
      <small className={styles.id}>ID: {coffee.id}</small>
    </article>
  );
};
