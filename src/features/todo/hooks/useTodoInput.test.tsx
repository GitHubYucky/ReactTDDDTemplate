// features/todo/hooks/__tests__/useTodoInput.test.ts
import { renderHook, act } from "@testing-library/react";
import { useTodoInput } from "./useTodoInput";

test("入力更新と送信処理", () => {
  const onAdd = vi.fn();
  const { result } = renderHook(() => useTodoInput(onAdd));

  act(() => {
    result.current.onChange({ target: { value: "やること" } } as any);
  });
  expect(result.current.text).toBe("やること");

  act(() => {
    result.current.onSubmit();
  });
  expect(onAdd).toHaveBeenCalledWith("やること");
  expect(result.current.text).toBe("");
});
