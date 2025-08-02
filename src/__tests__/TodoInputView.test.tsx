import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInputView } from "../features/todo/TodoInputView";
import { vi } from "vitest";

describe("TodoInputView", () => {
  test("入力フォームが表示され、値がpropsでセットされている", () => {
    render(
      <TodoInputView
        inputText="テスト"
        onChange={() => {}}
        onAdd={() => {}}
      />
    );
    const input = screen.getByPlaceholderText("新しいTodoを入力") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("テスト");
  });

  test("入力フォームのonChangeが呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <TodoInputView inputText="" onChange={handleChange} onAdd={() => {}} />
    );
    const input = screen.getByPlaceholderText("新しいTodoを入力");
    fireEvent.change(input, { target: { value: "変更" } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("追加ボタンが表示される", () => {
    render(<TodoInputView inputText="" onChange={() => {}} onAdd={() => {}} />);
    expect(screen.getByText("追加")).toBeInTheDocument();
  });

  test("追加ボタンのonClickが呼ばれる", () => {
    const handleAdd = vi.fn();
    render(<TodoInputView inputText="" onChange={() => {}} onAdd={handleAdd} />);
    const button = screen.getByText("追加");
    fireEvent.click(button);
    expect(handleAdd).toHaveBeenCalled();
  });
});
