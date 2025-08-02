import React from "react";
import { TodoInput } from "./features/todo/TodoInput";
import { useTodos } from "./features/todo/hooks/useTodoInput";

export const App = () => {
  const { todos, addTodo } = useTodos();

  return (
    <div>
      <h1>Todoアプリ</h1>
      <TodoInput onAddTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} {todo.done ? "(完了)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};
