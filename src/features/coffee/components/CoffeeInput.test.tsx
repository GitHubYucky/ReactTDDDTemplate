// src/features/coffee/components/CoffeeInput.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { CoffeeInput } from "./CoffeeInput";

describe("<CoffeeInput />", () => {
  it("入力してボタンを押すと onSearch が呼ばれる", () => {
    const handleSearch = vi.fn();
    render(<CoffeeInput onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search coffee/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "latte" } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith("latte");
  });

  it("Enterキーでも onSearch が呼ばれる", () => {
    const handleSearch = vi.fn();
    render(<CoffeeInput onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search coffee/i);

    fireEvent.change(input, { target: { value: "espresso" } });
    fireEvent.submit(input.closest("form")!);

    expect(handleSearch).toHaveBeenCalledWith("espresso");
  });

  it("空文字の場合は空文字で呼ばれる（トリム動作確認）", () => {
    const handleSearch = vi.fn();
    render(<CoffeeInput onSearch={handleSearch} />);

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith("");
  });
});
