// src/features/todo/components/Todo.tsx
import { useState } from "react";
import type { Todo as TodoType } from "../types/todo";

type Props = {
  todo: TodoType;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit:(id:number,newText:string)=>void;
};

export const Todo = ({ todo, onDelete, onToggle,onEdit }: Props) => {
  const [isEditing,setIsEditing]=useState(false);
  const [editText,setEditText]=useState(todo.text);

  // 編集についてはこのコンポーネントで片が付くのでこのコンポーネント内で書く
  const handleEditSubmit=()=>{
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  // Cancelも同様
  const handleCancel=()=>{
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
          />
          <button onClick={handleEditSubmit}>保存</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
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
          <button onClick={() => setIsEditing(true)}>編集</button>
          <button onClick={() => onDelete(todo.id)}>削除</button>
        </>
      )}
    </div>
  );
};
