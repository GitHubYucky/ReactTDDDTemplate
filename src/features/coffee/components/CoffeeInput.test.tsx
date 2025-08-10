// src/features/coffee/components/CoffeeInput.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { CoffeeInput } from "./CoffeeInput";

describe("<CoffeeInput />", () => {
  beforeEach(() => vi.clearAllMocks());

  it("入力してボタンを押すと onSearch(type, title) が呼ばれる", () => {
    const handleSearch = vi.fn();
    render(<CoffeeInput onSearch={handleSearch} />);

    const typeInput = screen.getByPlaceholderText("Search coffeeType...", { exact: true });
    const titleInput = screen.getByPlaceholderText("Search CoffeeTitle...", { exact: true });
    const button    = screen.getByRole("button", { name: /search/i });

    fireEvent.change(typeInput,  { target: { value: "hot" } });
    fireEvent.change(titleInput, { target: { value: "latte" } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith("hot", "latte");
  });

  it("Enter送信でも onSearch(type, title) が呼ばれる", () => {
    const handleSearch = vi.fn();
    render(<CoffeeInput onSearch={handleSearch} />);

    const typeInput  = screen.getByPlaceholderText("Search coffeeType...", { exact: true });
    const titleInput = screen.getByPlaceholderText("Search CoffeeTitle...", { exact: true });

    fireEvent.change(typeInput,  { target: { value: "iced" } });
    fireEvent.change(titleInput, { target: { value: "espresso" } });

    // フォームを submit（Enter 相当）
    fireEvent.submit(typeInput.closest("form")!);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith("iced", "espresso");
  });

  it("空白は trim される（'   ' → ''）", () => {
    const handleSearch = vi.fn();
    render(<CoffeeInput onSearch={handleSearch} />);

    const typeInput  = screen.getByPlaceholderText("Search coffeeType...", { exact: true });
    const titleInput = screen.getByPlaceholderText("Search CoffeeTitle...", { exact: true });
    const button     = screen.getByRole("button", { name: /search/i });

    // type は明示的に all を設定（初期値に依存しない）
    fireEvent.change(typeInput,  { target: { value: "all" } });
    fireEvent.change(titleInput, { target: { value: "   " } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith("all", "");
  });
});
