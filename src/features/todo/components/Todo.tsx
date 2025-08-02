// src/features/todo/components/Todo.tsx
import type { Todo as TodoType } from "../types/todo";

type Props = {
  todo: TodoType;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export const Todo = ({ todo, onDelete, onToggle }: Props) => {
  return (
    <div>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.done ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "1rem",
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </div>
  );
};
