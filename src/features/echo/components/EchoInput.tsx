import { useState } from "react";

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
    <div>
      <input
        type="text"
        placeholder="新しいEchoを入力"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled} // ← 入力禁止
      />
      <button onClick={handleClick} disabled={disabled}>Echo</button> {/* ← ボタンも */}
    </div>
  );
};
