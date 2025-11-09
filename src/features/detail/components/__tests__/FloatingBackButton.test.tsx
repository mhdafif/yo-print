import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingBackButton } from "../FloatingBackButton";

describe("FloatingBackButton", () => {
  it("should render the floating back button correctly", () => {
    const mockOnBack = vi.fn();
    render(<FloatingBackButton onBack={mockOnBack} />);

    expect(screen.getByLabelText("Back to Search")).toBeInTheDocument();
  });

  it("should call onBack when clicked", () => {
    const mockOnBack = vi.fn();
    render(<FloatingBackButton onBack={mockOnBack} />);

    const button = screen.getByLabelText("Back to Search");
    fireEvent.click(button);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should have correct CSS classes", () => {
    const mockOnBack = vi.fn();
    render(<FloatingBackButton onBack={mockOnBack} />);

    const button = screen.getByLabelText("Back to Search");
    expect(button).toHaveClass(
      "fixed",
      "top-4",
      "left-4",
      "w-10",
      "h-10",
      "bg-slate-600",
      "text-white",
      "rounded-md",
      "shadow-lg",
      "hover:bg-slate-700",
      "transition-all",
      "duration-300",
      "z-50",
      "flex",
      "items-center",
      "justify-center",
      "md:hidden",
      "cursor-pointer"
    );
  });

  it("should have correct ARIA label", () => {
    const mockOnBack = vi.fn();
    render(<FloatingBackButton onBack={mockOnBack} />);

    const button = screen.getByLabelText("Back to Search");
    expect(button).toBeInTheDocument();
  });

  it("should render the back arrow icon", () => {
    const mockOnBack = vi.fn();
    render(<FloatingBackButton onBack={mockOnBack} />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });
});
