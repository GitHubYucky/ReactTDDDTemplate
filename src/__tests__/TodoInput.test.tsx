import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInput } from "../features/todo/TodoInput";
import { vi } from "vitest";

describe("TodoInput", () => {
  test("正しく入力して追加するとonAddTodoが呼ばれる", () => {
    const onAddTodo = vi.fn();
    render(<TodoInput onAddTodo={onAddTodo} />);
    const input = screen.getByPlaceholderText("新しいTodoを入力");
    const button = screen.getByText("追加");

    fireEvent.change(input, { target: { value: "買い物" } });
    fireEvent.click(button);

    expect(onAddTodo).toHaveBeenCalledWith("買い物");
    expect(input).toHaveValue("");
  });

  test("空文字の場合はonAddTodoが呼ばれない", () => {
    const onAddTodo = vi.fn();
    render(<TodoInput onAddTodo={onAddTodo} />);
    const button = screen.getByText("追加");
    fireEvent.click(button);
    expect(onAddTodo).not.toHaveBeenCalled();
  });
});
