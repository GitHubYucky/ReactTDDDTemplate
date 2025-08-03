// src/features/todo/components/Todo.tsx
import { useState } from "react";
import type { Todo as TodoType } from "../types/todo";
import styles from "./Todo.module.css";
import { Button } from "../../../components/button/button";
import { Input } from "../../../components/input/input";

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
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
          />
          <div className={styles.actions}>
            <Button variant="primary" onClick={handleEditSubmit}>保存</Button>
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
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
            <Button variant="primary" onClick={() => setIsEditing(true)}>編集</Button>
            <Button variant="danger" onClick={() => onDelete(todo.id)}>削除</Button>
          </div>
        </>
      )}
    </div>
  );
};
