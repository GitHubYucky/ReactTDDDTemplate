import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CoffeeContainer } from "./CoffeeContainer";

// fetch をグローバルにモック
global.fetch = vi.fn();

describe("CoffeeContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("CoffeeInputとCoffeeListが表示される", () => {
    render(<CoffeeContainer />);
    expect(screen.getByPlaceholderText("Search coffeeType...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search CoffeeTitle...")).toBeInTheDocument();
  });

  it("CoffeeInputでSearchを押すと入力値が表示される", async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ echoed: "新しいタスク" }),
    });

    render(<CoffeeContainer />);

    const input = screen.getByPlaceholderText("Search coffeeType...");
    fireEvent.change(input, { target: { value: "iced" } });

    const button = screen.getByText("Search");
    fireEvent.click(button);

  // fetchが正しいURL/オプションで呼ばれたことを確認
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://api.sampleapis.com/coffee/iced");
    })
  });

  it("通信中はローディングメッセージが表示される", async () => {
    let resolveFetch: ((value: any) => void) | undefined;

    (fetch as any).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    render(<CoffeeContainer />);

    const input = screen.getByPlaceholderText("Search coffeeType...");
    fireEvent.change(input, { target: { value: "iced" } });

    fireEvent.click(screen.getByText("Search"));

    expect(screen.getByText("送信中...")).toBeInTheDocument();

    resolveFetch?.({
      ok: true,
      json: async () => ({ echoed: "loading中" }),
    });

    await waitFor(() => {
      expect(screen.queryByText("送信中...")).not.toBeInTheDocument();
    });
  });

  it("API失敗時にエラー表示される", async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
    });

    render(<CoffeeContainer />);

    const input = screen.getByPlaceholderText("Search coffeeType...");
    fireEvent.change(input, { target: { value: "iced" } });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });
  it("ローディング中は入力とボタンが無効化される", async () => {
    let resolveFetch: ((value: any) => void) | undefined;

    (fetch as any).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    render(<CoffeeContainer />);

    const input = screen.getByPlaceholderText("Search coffeeType...") as HTMLInputElement;
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "iced" } });
    fireEvent.click(button);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();

    resolveFetch?.({
      ok: true,
      json: async () => ({ echoed: "待機" }),
    });

    await waitFor(() => {
      expect(input.disabled).toBe(false);
      expect(button).not.toBeDisabled();
    });
  });
});
