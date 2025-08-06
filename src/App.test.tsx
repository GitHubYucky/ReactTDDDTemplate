// // src/App.test.tsx
// import { describe, it, expect } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { App } from "./App";

// describe("App", () => {
//   it("Todoの追加・表示・削除ができる", () => {
//     render(<App />);

//     const input = screen.getByPlaceholderText("新しいTODOを入力");
//     const button = screen.getByRole("button", { name: "追加" });

//     // 入力 & 追加
//     fireEvent.change(input, { target: { value: "勉強" } });
//     fireEvent.click(button);

//     // 表示される
//     expect(screen.getByText("勉強")).toBeInTheDocument();

//     // 削除する
//     const deleteButton = screen.getByRole("button", { name: "削除" });
//     fireEvent.click(deleteButton);

//     // 表示されなくなる
//     expect(screen.queryByText("勉強")).not.toBeInTheDocument();
//   });
// });
