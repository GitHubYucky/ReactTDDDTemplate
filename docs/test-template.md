# React テストルール（Coffee 系を例に・Markdown 版）

**対象**

- 小さいコンポーネント：`<Coffee />`
- 小さいコンポーネントの一覧：`<CoffeeList />`
- ロジック：`useCoffee` フック

**ツール前提**：Vitest / React Testing Library / `@testing-library/jest-dom` / TypeScript

---

## 0. 共通ポリシー

- **テスト名は仕様の日本語**（ユーザー視点の振る舞い＋結果）
- **AAA（Arrange / Act / Assert）**で段落を分ける
- **クエリ優先度**：`getByRole`（必要に応じ `{ name: /.../i }`）＞ `getByLabelText` ＞ `getByPlaceholderText`
- **スコープ**：`within(container)` でカード毎など範囲を限定
- **操作**：`userEvent` を標準（`fireEvent` は特殊ケースのみ）
- **非同期**：`await waitFor(...)` で状態反映を待つ
- **モック**：`vi.spyOn(globalThis, "fetch")` → `afterEach` で `vi.restoreAllMocks()`
- **想定外 URL は失敗させる**（サイレントフォールバック禁止）
- **境界・失敗系を最低 1 本**（空配列、ネットワークエラー 等）
- **スナップショットは局所的に**（広い DOM は避ける）

---

## 1. 小さいコンポーネントの例：`<Coffee />` Coffee.tsx

### 実装例（ソース）

```tsx
// src/features/coffee/components/Coffee.tsx
import type { CoffeeType } from "@/features/coffee/type/coffee";

type Props = { coffee: CoffeeType };

export const Coffee = ({ coffee }: Props) => {
  const { id, title, description, image, ingredients } = coffee;
  return (
    <article aria-label={`coffee-${id}`}>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p>{description}</p>

      <section aria-labelledby={`ingredients-${id}`}>
        <h3 id={`ingredients-${id}`}>Ingredients</h3>
        <ul>
          {ingredients.map((ing, i) => (
            <li key={`${id}-${i}`}>{ing}</li>
          ))}
        </ul>
      </section>

      <small>ID: {id}</small>
    </article>
  );
};
```

### テストルール（要点）

- **役割ベースで検証**：`article` / `heading` / `img` / `listitem`
- **カード単位での検証**：`within(article)` で誤検出を防ぐ
- **境界値**：`ingredients` が空でも壊れない

### サンプルテスト

```tsx
// src/features/coffee/components/Coffee.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Coffee } from "./Coffee";
import type { CoffeeType } from "@/features/coffee/type/coffee";

const sample: CoffeeType = {
  id: 42,
  title: "Iced Latte",
  description: "Smooth and refreshing.",
  image: "https://example.com/iced-latte.jpg",
  ingredients: ["Espresso", "Milk", "Ice"],
};

describe("<Coffee />", () => {
  it("見出し・画像・説明・材料・ID が表示される", () => {
    render(<Coffee coffee={sample} />);

    const card = screen.getByRole("article", { name: /coffee-42/ });
    const ui = within(card);

    expect(ui.getByRole("heading", { name: sample.title })).toBeInTheDocument();

    const img = ui.getByRole("img", { name: sample.title });
    expect(img).toHaveAttribute("src", sample.image);

    expect(ui.getByText(sample.description)).toBeInTheDocument();
    expect(
      ui.getByRole("heading", { name: /ingredients/i })
    ).toBeInTheDocument();

    const items = ui.getAllByRole("listitem");
    expect(items).toHaveLength(sample.ingredients.length);
    sample.ingredients.forEach((ing) => {
      expect(ui.getByText(ing)).toBeInTheDocument();
    });

    expect(ui.getByText(/ID:\s*42/)).toBeInTheDocument();
  });

  it("材料が空でも描画できる", () => {
    const empty: CoffeeType = { ...sample, ingredients: [] };
    render(<Coffee coffee={empty} />);

    const card = screen.getByRole("article", { name: /coffee-42/ });
    const ui = within(card);

    expect(ui.queryAllByRole("listitem")).toHaveLength(0);
  });
});
```

---

## 2. 小さいコンポーネントの一覧：`<CoffeeList />`

### 実装例（ソース）

```tsx
// src/features/coffee/components/CoffeeList.tsx
import type { CoffeeType } from "@/features/coffee/type/coffee";
import { Coffee } from "./Coffee";

type Props = { coffees: CoffeeType[]; emptyText?: string };

export const CoffeeList = ({ coffees, emptyText = "No coffees" }: Props) => {
  if (coffees.length === 0) {
    return <p role="status">{emptyText}</p>;
  }

  return (
    <section aria-label="coffee-list">
      {coffees.map((c) => (
        <Coffee key={c.id} coffee={c} />
      ))}
    </section>
  );
};
```

### テストルール（要点）

- **件数一致**：`article` の数 = 入力配列の長さ
- **順序一致**：i 番目のカードが i 番目のデータに対応
- **空状態**：`role="status"` のメッセージを検証
- **スコープ**：各 `article` で中身を検証（`within`）

## 3. ロジックの例　 useCoffee.ts

### 実装例（ソース）

```ts
// src/features/coffee/hooks/useCoffee.ts
import { useState } from "react";
import type { CoffeeType } from "@/features/coffee/type/coffee";

export const useCoffee = () => {
  const [coffees, setCoffees] = useState<CoffeeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 正規化関数（配列 or 文字列 → 配列）
  const normalizeIngredients = (
    value: string[] | string | null | undefined
  ): string[] => {
    if (Array.isArray(value)) return value.map((s) => s.trim()).filter(Boolean);
    if (typeof value === "string") {
      return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  const fetchCoffees = async (type: string, title: string) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint =
        type === "hot" || type === "iced"
          ? `https://api.sampleapis.com/coffee/${type}`
          : "https://api.sampleapis.com/coffee/iced";

      const resp = await fetch(endpoint);
      const data = (await resp.json()) as any[];

      // 正規化してからセット
      const normalized: CoffeeType[] = (data || []).map((item) => ({
        ...item,
        ingredients: normalizeIngredients(item.ingredients),
      }));

      // Coffeeのtitleを引数のTitleでFilterする
      const filtered =
        title && title.trim().length > 0
          ? normalized.filter((c) =>
              (c.title ?? "").toLowerCase().includes(title.toLowerCase())
            )
          : normalized;

      setCoffees(filtered);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { coffees, loading, error, fetchCoffees };
};
```

```ts
// useCoffee.test.ts
// これは useCoffee という機能をテストする例です。
// 「どう書けばいいか」をわかりやすくコメントしています。

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useCoffee } from "@/features/coffee/hooks/useCoffee";

// --- テスト用のデータ（APIから返ってくる形）---
const icedData = [
  {
    id: 1,
    title: "Iced Americano",
    description: "desc",
    image: "/img1",
    ingredients: "espresso, water, ice",
  },
  {
    id: 2,
    title: "Iced Latte",
    description: "desc",
    image: "/img2",
    ingredients: ["espresso", "milk", "ice"],
  },
];

// --- 正しい形に変換された後のデータ ---
const icedExpected = [
  {
    id: 1,
    title: "Iced Americano",
    description: "desc",
    image: "/img1",
    ingredients: ["espresso", "water", "ice"],
  },
  {
    id: 2,
    title: "Iced Latte",
    description: "desc",
    image: "/img2",
    ingredients: ["espresso", "milk", "ice"],
  },
];

// --- 簡単な Response を作る関数 ---
const makeRes = (data) => new Response(JSON.stringify(data), { status: 200 });

describe("useCoffee のテスト", () => {
  // テスト前に fetch をニセモノにする
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(makeRes(icedData));
  });

  // テスト後に元に戻す
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("最初は空っぽの状態", () => {
    const { result } = renderHook(() => useCoffee());
    expect(result.current.coffees).toEqual([]); // データなし
    expect(result.current.loading).toBe(false); // 読み込み中じゃない
    expect(result.current.error).toBeNull(); // エラーなし
  });

  it("データを取得して変換できる", async () => {
    const { result } = renderHook(() => useCoffee());

    // 実行
    await act(async () => {
      await result.current.fetchCoffees("iced", "");
    });

    // 確認
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.coffees).toEqual(icedExpected);
  });
});
```
