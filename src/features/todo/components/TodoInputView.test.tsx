// features/todo/components/__tests__/TodoInputView.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInputView } from "./TodoInputView";

test("テキスト入力とボタンクリック", () => {
  const handleChange = vi.fn();
  const handleSubmit = vi.fn();

  render(
    <TodoInputView
      input="テスト"
      onChange={handleChange}
      onAdd={handleSubmit}
    />
  );

  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "新しいTodo" },
  });
  fireEvent.click(screen.getByText("追加"));

  expect(handleChange).toHaveBeenCalled();
  expect(handleSubmit).toHaveBeenCalled();
});
