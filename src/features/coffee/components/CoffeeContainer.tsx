import { useCoffee } from "../hooks/useCoffee";
import { CoffeeInput } from "./CoffeeInput";
import { CoffeeList } from "./CoffeeList";
import styles from "./CoffeeContainer.module.css";

export const CoffeeContainer = () => {
  const { coffees, fetchCoffees, loading } = useCoffee();

  const handleSearch = (keyword: string) => {
    fetchCoffees(keyword as any);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <CoffeeInput onSearch={handleSearch} />
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}

      <CoffeeList coffees={coffees} />
    </div>
  );
};
