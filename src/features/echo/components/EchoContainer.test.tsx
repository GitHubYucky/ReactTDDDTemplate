import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EchoContainer } from "./EchoContainer";

// fetch をグローバルにモック
global.fetch = vi.fn();

describe("EchoContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("EchoInputとEchoDisplayが表示される", () => {
    render(<EchoContainer />);
    expect(screen.getByPlaceholderText("新しいEchoを入力")).toBeInTheDocument();
    expect(screen.getByText("Echo")).toBeInTheDocument();
  });

  it("EchoInputでEchoを押すと入力値が表示される", async () => {
    // fetchのモック（正常なレスポンス）
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ echoed: "新しいタスク" }),
    });

    render(<EchoContainer />);

    // 入力
    const input = screen.getByPlaceholderText("新しいEchoを入力");
    fireEvent.change(input, { target: { value: "新しいタスク" } });

    // ボタン押下
    const button = screen.getByText("Echo");
    fireEvent.click(button);

    // 非同期処理が終わるのを待ってから検証
    await waitFor(() => {
      expect(screen.getByText("新しいタスク")).toBeInTheDocument();
    });
  });
});
