// src/features/coffee/components/CoffeeInput.tsx
import { useState } from "react";
import styles from "./CoffeeInput.module.css";
import { Button } from "../../../components/button/button";

type Props = {
  onSearch: (type: string, title: string) => void;
};

export const CoffeeInput = ({ onSearch }: Props) => {
  const [type, setType] = useState("all");   // ← デフォルトを all に
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(type.trim(), title.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="coffee-search">
      <input
        className={styles.input}
        type="text"
        placeholder="Search coffeeType..."
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="coffee-type"
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Search CoffeeTitle..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="coffee-title"
      />
      <Button className={styles.button} type="submit">
        Search
      </Button>
    </form>
  );
};
