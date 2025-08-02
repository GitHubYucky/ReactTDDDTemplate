import { useState } from "react";

export const useTodoInput = (onAdd: (text: string) => void) => {
  const [text, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    if (text.trim() !== "") {
      onAdd(text);
      setText("");
    }
  };

  return {
    text,
    onChange,
    onSubmit,
  };
};
