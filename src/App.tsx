// src/App.tsx
import { TodoInput } from "./features/todo/components/TodoInput";
import { TodoList } from "./features/todo/components/TodoList";
import { useTodos } from "./features/todo/hooks/useTodos";
import styles from "./App.module.css";
import { CounterContainer } from "./features/counter/components/CounterContainer";

export const App = () => {
  const { todos, addTodo, deleteTodo, toggleTodo, editTodoText } = useTodos();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todoアプリ</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={editTodoText}
      />
      <CounterContainer/>
    </div>
  );
};
