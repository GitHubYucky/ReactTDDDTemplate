import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CounterContainer } from "./CounterContainer";

describe("CounterContainer",()=>{
    it("カウントが表示される",()=>{
        render(<CounterContainer/>);
        expect(screen.getByText("0")).toBeInTheDocument();
    })
    it("CountUpボタンを押すとカウントが1増える",()=>{
        render(<CounterContainer/>);
        fireEvent.click(screen.getByText("CountUp"));
        expect(screen.getByText("1")).toBeInTheDocument();
    })
    it("CountDownボタンを押すとカウントが1減る",()=>{
        render(<CounterContainer/>);
        fireEvent.click(screen.getByText("CountDown"));
        expect(screen.getByText("-1")).toBeInTheDocument();
    })
    it("CountUp5ボタンを押すとカウントが5増える",()=>{
        render(<CounterContainer/>);
        fireEvent.click(screen.getByText("CountUp5"));
        expect(screen.getByText("5")).toBeInTheDocument();
    })
    it("CountDown5ボタンを押すとカウントが5減る",()=>{
        render(<CounterContainer/>);
        fireEvent.click(screen.getByText("CountDown5"));
        expect(screen.getByText("-5")).toBeInTheDocument();
    })
    it("Resetボタンを押すとカウントが0に戻る",()=>{
        render(<CounterContainer/>);
        fireEvent.click(screen.getByText("CountUp5"));
        fireEvent.click(screen.getByText("Reset"));
        expect(screen.getByText("0")).toBeInTheDocument();
    })




})


