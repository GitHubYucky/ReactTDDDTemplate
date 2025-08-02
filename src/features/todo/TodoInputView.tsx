import React, { FC, ChangeEvent } from "react";

type TodoInputViewProps = {
  inputText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

export const TodoInputView: FC<TodoInputViewProps> = ({ inputText, onChange, onAdd }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="新しいTodoを入力"
        value={inputText}
        onChange={onChange}
      />
      <button onClick={onAdd}>追加</button>
    </div>
  );
};
