// src/features/todo/components/Todo.tsx
import { useState } from "react";
import type { Todo as TodoType } from "../types/todo";
import styles from "./Todo.module.css";

type Props = {
  todo: TodoType;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

export const Todo = ({ todo, onDelete, onToggle, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={styles.todo}>
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
          />
          <div className={styles.actions}>
            <button onClick={handleEditSubmit}>保存</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span
            onClick={() => onToggle(todo.id)}
            className={`${styles.todoText} ${todo.done ? styles.done : ""}`}
          >
            {todo.text}
          </span>
          <div className={styles.actions}>
            <button onClick={() => setIsEditing(true)}>編集</button>
            <button onClick={() => onDelete(todo.id)}>削除</button>
          </div>
        </>
      )}
    </div>
  );
};
