import { useState } from "react";
import styles from "./CoffeeInput.module.css";
import { Button } from "../../../components/button/button";

type Props = {
  onSearch: (keyword: string) => void;
};

export const CoffeeInput = ({ onSearch }: Props) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search coffee..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className={styles.button} type="submit">
        Search
      </Button>
    </form>
  );
};
