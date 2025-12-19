import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ScoreLine from "../properties/score/score-line";

describe("ScoreLine", () => {
  it("renders stat abbrevation and score value", () => {
    render(<ScoreLine stat="Str" score={14} />);
    expect(screen.getByText("Str")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
  });

  it("calculates and displays positiv modifier correctly", () => {
    render(<ScoreLine stat="Dex" score={16} />);
    const modifiers = screen.getAllByText("+3");
    expect(modifiers).toHaveLength(2);
  });

  it("calculates and displays negative modifier correctly", () => {
    render(<ScoreLine stat="Dex" score={8} />);
    const modifiers = screen.getAllByText("-1");
    expect(modifiers).toHaveLength(2);
  });

  it("shows save value when provided", () => {
    render(<ScoreLine stat="Int" score={14} save="+3" />);
    expect(screen.getByText("+3")).toBeInTheDocument();
  });
});
