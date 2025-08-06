import { renderHook, act } from "@testing-library/react";
import { useCount } from "./useCount";
import { it,expect,describe  } from "vitest";

describe("useCount",()=>{
    it("初期状態では0",()=>{
        const {result}=renderHook(()=>useCount());
        expect(result.current.count).toBe(0)
    })
    it("CountUpボタンを押すとカウントが1増える",()=>{
        const {result}=renderHook(()=>useCount());
        act(()=>{
            result.current.countUp();
        })
        expect(result.current.count).toBe(1);
    })
    it("CountDownボタンを押すとカウントが1減る",()=>{
        const {result}=renderHook(()=>useCount());
        act(()=>{
            result.current.countDown();
        })
        expect(result.current.count).toBe(0);
    })
    it("CountUp5ボタンを押すとカウントが5増える",()=>{
        const {result}=renderHook(()=>useCount());
        act(()=>{
            result.current.countUpFive();
        })
        expect(result.current.count).toBe(5);
    })
    it("CountDown5ボタンを押すとカウントが5減る",()=>{
        const {result}=renderHook(()=>useCount());
        act(()=>{
            result.current.countDownFive();
        })
    })
    it("Resetボタンを押すとカウントが0に戻る",()=>{
        const {result}=renderHook(()=>useCount());
        act(()=>{
            result.current.countUpFive();
        })
        act(()=>{
            result.current.reset();
        })
        expect(result.current.count).toBe(0);
    })
})
