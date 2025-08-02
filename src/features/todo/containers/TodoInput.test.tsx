// features/todo/containers/__tests__/TodoInput.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInput } from "./TodoInput";

test("TodoInput統合テスト", () => {
  const onAdd = vi.fn();
  render(<TodoInput onAddTodo={onAdd} />);

  const input = screen.getByRole("textbox");
  const button = screen.getByText("追加");

  fireEvent.change(input, { target: { value: "買い物" } });
  fireEvent.click(button);

  expect(onAdd).toHaveBeenCalledWith("買い物");
});
