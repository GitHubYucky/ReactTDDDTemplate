// src/features/todo/hooks/__tests__/useTodos.test.ts
import { renderHook, act } from "@testing-library/react";
import { useTodos } from "./useTodos";
import { it,expect,describe  } from "vitest";

// result.current.
  // todos,addTodo,deleteTodo,toggleTodo

describe("useTodos", () => {
  it("初期状態ではtodosは空", () => {
    //
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
  });

  it("addTodoで新しいTodoが追加される", () => {
    // arrange
    // これは「useTodos フックが返した値」を result.current で参照できるようにしてくれる
    const { result } = renderHook(() => useTodos());

    // act
    act(() => {
      result.current.addTodo("買い物");
    });

    // assert
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe("買い物");
    expect(result.current.todos[0].done).toBe(false);
  });

  it("deleteTodoで指定したTodoが削除される", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("掃除");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(id);
    });

    expect(result.current.todos).toEqual([]);
  });

  it("toggleTodoでdoneが反転する", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("運動");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].done).toBe(true);

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].done).toBe(false);
  });
});
