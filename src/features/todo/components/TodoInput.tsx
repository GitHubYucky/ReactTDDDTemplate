// src/features/todo/components/TodoInput.tsx
import { useState } from "react";
import styles from "./TodoInput.module.css";
import { Button } from "../../../components/button/button";
import { Input } from "../../../components/input/input";

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
      <Input
        type="text"
        value={text}
        placeholder="新しいTODOを入力"
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit}>追加</Button>
    </div>
  );
};
