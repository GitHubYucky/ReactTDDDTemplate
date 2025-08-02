import React, { useState, ChangeEvent, FC } from "react";
import { TodoInputView } from "./TodoInputView";

type TodoInputProps = {
  onAddTodo: (text: string) => void;
};

export const TodoInput: FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAdd = () => {
    if (inputText.trim() === "") return;
    onAddTodo(inputText.trim());
    setInputText("");
  };

  return (
    <TodoInputView inputText={inputText} onChange={handleChange} onAdd={handleAdd} />
  );
};
