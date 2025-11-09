import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BackButton } from "../BackButton";

describe("BackButton", () => {
  it("should render the back button correctly", () => {
    const mockOnBack = vi.fn();
    render(<BackButton onBack={mockOnBack} />);

    expect(screen.getByText("Back to Search")).toBeInTheDocument();
  });

  it("should call onBack when clicked", () => {
    const mockOnBack = vi.fn();
    render(<BackButton onBack={mockOnBack} />);

    const button = screen.getByText("Back to Search").closest("div");
    fireEvent.click(button!);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should have correct CSS classes", () => {
    const mockOnBack = vi.fn();
    render(<BackButton onBack={mockOnBack} />);

    const button = screen.getByText("Back to Search").closest("div");
    expect(button).toHaveClass(
      "inline-flex",
      "items-center",
      "gap-2",
      "text-slate-400",
      "hover:text-white",
      "mb-6",
      "transition-colors",
      "cursor-pointer"
    );
  });

  it("should render the back arrow icon", () => {
    const mockOnBack = vi.fn();
    render(<BackButton onBack={mockOnBack} />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });
});
