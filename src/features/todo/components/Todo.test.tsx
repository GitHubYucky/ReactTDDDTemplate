// src/features/todo/components/Todo.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "./Todo";

describe("Todo", () => {
  const sample = {
    id: 1,
    text: "散歩する",
    done: false,
  };

  it("テキストが表示される", () => {
    render(
      <Todo
        todo={sample}
        onDelete={() => {}}
        onToggle={() => {}}
      />
    );
    expect(screen.getByText("散歩する")).toBeInTheDocument();
  });

  it("完了済みの時は取り消し線が表示される", () => {
    render(
      <Todo
        todo={{ ...sample, done: true }}
        onDelete={() => {}}
        onToggle={() => {}}
      />
    );
    const item = screen.getByText("散歩する");
    expect(item).toHaveStyle("text-decoration: line-through");
  });

  it("削除ボタンを押すとonDeleteが呼ばれる", () => {
    const handleDelete = vi.fn();
    render(
      <Todo
        todo={sample}
        onDelete={handleDelete}
        onToggle={() => {}}
      />
    );

    const btn = screen.getByRole("button", { name: /削除/i });
    fireEvent.click(btn);

    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  it("テキストクリックでonToggleが呼ばれる", () => {
    const handleToggle = vi.fn();
    render(
      <Todo
        todo={sample}
        onDelete={() => {}}
        onToggle={handleToggle}
      />
    );

    fireEvent.click(screen.getByText("散歩する"));
    expect(handleToggle).toHaveBeenCalledWith(1);
  });
});
