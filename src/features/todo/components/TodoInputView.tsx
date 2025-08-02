// src/features/todo/components/TodoInputView.tsx
import React from "react";

type Props = {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

export const TodoInputView: React.FC<Props> = ({ input, onChange, onAdd }) => {
  return (
    <div>
      <input value={input} onChange={onChange} />
      <button onClick={onAdd}>追加</button>
    </div>
  );
};
