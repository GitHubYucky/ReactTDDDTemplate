import { TodoInputView } from "../components/TodoInputView";
import { useTodoInput } from "../hooks/useTodoInput";

type Props = {
    onAddTodo: (text: string) => void;
  };


export const TodoInput: React.FC<Props> = ({ onAddTodo }) => {
    const { text, onChange, onSubmit } = useTodoInput(onAddTodo);

    return (
      <TodoInputView
        input={text}
        onChange={onChange}
        onAdd={onSubmit}
      />
    );
  };
