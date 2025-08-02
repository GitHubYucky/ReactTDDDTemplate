// src/App.tsx
import { TodoInput } from "./features/todo/components/TodoInput";
import { TodoList } from "./features/todo/components/TodoList";
import { useTodos } from "./features/todo/hooks/useTodos";

export const App = () => {
  const { todos, addTodo, deleteTodo, toggleTodo,editTodoText } = useTodos();

  return (
    <div>
      <h1>Todoアプリ</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={editTodoText}
      />
    </div>
  );
};
