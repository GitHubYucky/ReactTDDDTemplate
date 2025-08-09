// src/hooks/useCoffee.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useCoffee } from "./useCoffee";

type Coffee = { id: number; title: string };

const icedMock: Coffee[] = [
  { id: 1, title: "Iced Americano" },
  { id: 2, title: "Iced Latte" },
  { id: 3, title: "Cold Brew" },
];

const hotMock: Coffee[] = [
  { id: 10, title: "Espresso" },
  { id: 11, title: "Cappuccino" },
  { id: 12, title: "Latte" },
];

// ✅ これに差し替え（or 追加）
const mkRes = (data: any, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });


describe("useCoffee", () => {
  beforeEach(() => {
    // beforeEach 内
    vi.spyOn(global, "fetch").mockImplementation(async (input: any) => {
        const urlStr = typeof input === "string" ? input : (input as Request).url;
        const url = new URL(urlStr);

        // パスの最後のセグメントを取得
        const lastSegment = url.pathname.split("/").pop();

        if (lastSegment === "hot") return mkRes(hotMock);
        if (lastSegment === "iced") return mkRes(icedMock);
        // 無効値（例: hoge 等）はフォールバックで iced を返す想定
        return mkRes(icedMock);
    });

  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("初期状態は空のcoffees、loading=false、error=null", () => {
    const { result } = renderHook(() => useCoffee());
    expect(result.current.coffees).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("type='iced' の一覧を取得できる", async () => {
    const { result } = renderHook(() => useCoffee());

    await act(async () => {
      await result.current.fetchCoffees("iced");
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.coffees).toEqual(icedMock);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.sampleapis.com/coffee/iced"
    );
  });

  it("type='hot' の一覧を取得できる", async () => {
    const { result } = renderHook(() => useCoffee());

    await act(async () => {
      await result.current.fetchCoffees("hot");
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.coffees).toEqual(hotMock);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.sampleapis.com/coffee/hot"
    );
  });

  it("type が 'hot'/'iced' 以外なら iced で取得する（フォールバック）", async () => {
    const { result } = renderHook(() => useCoffee());

    await act(async () => {
      // 無効値を渡す
      await result.current.fetchCoffees("hoge" as any);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.coffees).toEqual(icedMock);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.sampleapis.com/coffee/iced"
    );
  });

});
