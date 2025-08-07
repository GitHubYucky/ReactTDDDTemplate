import { useState } from "react";
import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import styles from "./EchoInput.module.css";

type Props = {
  onEcho: (message: string) => void;
  disabled?: boolean; // ← 追加
};

export const EchoInput = ({ onEcho, disabled = false }: Props) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    if (text.trim() === "") return;
    onEcho(text);
    setText("")
  };


  return (
    <div className={styles.inputContainer}>
      <Input
        type="text"
        placeholder="新しいEchoを入力"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled} // ← 入力禁止
      />
      <Button onClick={handleClick} disabled={disabled}>Echo</Button> {/* ← ボタンも */}
    </div>
  );
};
