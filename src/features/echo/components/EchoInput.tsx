// src/features/todo/components/TodoInput.tsx
import { useState } from "react";
import styles from "./EchoInput.module.css";
import { Button } from "../../../components/button/button";
import { Input } from "../../../components/input/input";

type Props = {
  onEcho: (text: string) => void;
};

export const EchoInput = ({ onEcho }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onEcho(trimmed);
    setText("");
  };

  return (
    <div className={styles.inputContainer}>
      <Input
        type="text"
        value={text}
        placeholder="新しいEchoを入力"
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit}>Echo</Button>
    </div>
  );
};
