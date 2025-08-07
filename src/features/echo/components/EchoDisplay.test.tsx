import { describe,it,expect } from "vitest";
import { render,screen } from "@testing-library/react";
import { EchoDisplay } from "./EchoDisplay";

describe("EchoDisplay",()=>{
    const sampleEcho:string="Hoge";
    it("Echoが表示される",()=>{
        render(<EchoDisplay echo={sampleEcho} />);
        expect(screen.getByText("Hoge")).toBeInTheDocument();
    })
})
