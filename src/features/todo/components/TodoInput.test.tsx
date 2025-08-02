// src/features/todo/components/__tests__/TodoInput.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInput } from "./TodoInput";
import { it,describe,expect,vi } from "vitest";

describe("TodoInput", () => {
  it("入力した文字を表示する", () => {
    render(<TodoInput onAdd={() => {}} />);
    const input = screen.getByPlaceholderText("新しいTODOを入力");

    fireEvent.change(input, { target: { value: "買い物" } });

    expect((input as HTMLInputElement).value).toBe("買い物");
  });

  it("ボタンを押すとonAddが呼ばれる", () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);

    const input = screen.getByPlaceholderText("新しいTODOを入力");
    fireEvent.change(input, { target: { value: "掃除" } });

    const button = screen.getByRole("button", { name: /追加/i });
    fireEvent.click(button);

    expect(handleAdd).toHaveBeenCalledWith("掃除");
  });

  it("空文字ではonAddが呼ばれない", () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);

    const button = screen.getByRole("button", { name: /追加/i });
    fireEvent.click(button);

    expect(handleAdd).not.toHaveBeenCalled();
  });

  it("追加後に入力欄が空になる", () => {
    render(<TodoInput onAdd={() => {}} />);

    const input = screen.getByPlaceholderText("新しいTODOを入力");
    fireEvent.change(input, { target: { value: "勉強" } });

    const button = screen.getByRole("button", { name: /追加/i });
    fireEvent.click(button);

    expect((input as HTMLInputElement).value).toBe("");
  });
});
