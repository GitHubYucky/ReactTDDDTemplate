// src/features/todo/components/TodoInput.tsx
import { useState } from "react";

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
    <div>
      <input
        type="text"
        value={text}
        placeholder="新しいTODOを入力"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>追加</button>
    </div>
  );
};
