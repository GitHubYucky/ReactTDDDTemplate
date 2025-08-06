import { useTodos } from "../hooks/useTodos";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const TodoContainer=()=>{
    const {todos,addTodo,deleteTodo,toggleTodo,editTodoText}=useTodos();

    return (
        <div>
            <TodoInput onAdd={addTodo}/>
            <TodoList
            todos={todos}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodoText}
            />
        </div>
    )
}
