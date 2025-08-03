// src/features/todo/components/TodoInput.tsx
import { useState } from "react";
import styles from "./TodoInput.module.css";

type Props = {
  onAdd: (text: string) => void;
};

export const TodoInput = ({ onAdd }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setText("");
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={text}
        placeholder="新しいTODOを入力"
        onChange={(e) => setText(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={handleSubmit} className={styles.addButton}>
        追加
      </button>
    </div>
  );
};
