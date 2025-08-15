// src/features/coffee/components/CoffeeInput.tsx
import { useState } from "react";
import styles from "./CoffeeInput.module.css";
import { Button } from "../../../components/button/button";
import { Input } from "@/components/input/input";

type Props = {
  onSearch: (type: string, title: string) => void;
  disabled: boolean; // ← 追加
};

export const CoffeeInput = ({ onSearch,disabled=false }: Props) => {
  const [type, setType] = useState("all");   // ← デフォルトを all に
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(type.trim(), title.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="coffee-search">
      <Input
        className={styles.input}
        type="text"
        placeholder="Search coffeeType..."
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="coffee-type"
        disabled={disabled}
      />
      <Input
        className={styles.input}
        type="text"
        placeholder="Search CoffeeTitle..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="coffee-title"
        disabled={disabled}
      />
      <Button className={styles.button} type="submit" disabled={disabled}>
        Search
      </Button>
    </form>
  );
};
