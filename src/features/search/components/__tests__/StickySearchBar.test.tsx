import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StickySearchBar } from "../StickySearchBar";

describe("StickySearchBar", () => {
  const defaultProps = {
    searchInput: "",
    onInputChange: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
    onClearSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render sticky search bar correctly", () => {
    render(<StickySearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    expect(input).toBeInTheDocument();
  });

  it("should display current search input value", () => {
    render(<StickySearchBar {...defaultProps} searchInput="Naruto" />);

    const input = screen.getByDisplayValue("Naruto");
    expect(input).toBeInTheDocument();
  });

  it("should call onInputChange when input value changes", async () => {
    const mockOnInputChange = vi.fn();
    const user = userEvent.setup();

    render(
      <StickySearchBar {...defaultProps} onInputChange={mockOnInputChange} />
    );

    const input = screen.getByPlaceholderText("Search for anime...");
    await user.type(input, "One Piece");

    expect(mockOnInputChange).toHaveBeenCalledTimes(9); // One for each character
  });

  it("should call onFocus when input is focused", () => {
    const mockOnFocus = vi.fn();

    render(<StickySearchBar {...defaultProps} onFocus={mockOnFocus} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    fireEvent.focus(input);

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when input is blurred", () => {
    const mockOnBlur = vi.fn();

    render(<StickySearchBar {...defaultProps} onBlur={mockOnBlur} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    fireEvent.blur(input);

    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it("should show clear button when searchInput has value", () => {
    render(<StickySearchBar {...defaultProps} searchInput="test" />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
  });

  it("should not show clear button when searchInput is empty", () => {
    render(<StickySearchBar {...defaultProps} searchInput="" />);

    const clearButton = screen.queryByLabelText("Clear search");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("should call onClearSearch when clear button is clicked", async () => {
    const mockOnClearSearch = vi.fn();
    const user = userEvent.setup();

    render(
      <StickySearchBar
        {...defaultProps}
        searchInput="test"
        onClearSearch={mockOnClearSearch}
      />
    );

    const clearButton = screen.getByLabelText("Clear search");
    await user.click(clearButton);

    expect(mockOnClearSearch).toHaveBeenCalledTimes(1);
  });

  it("should have correct CSS classes for main container", () => {
    render(<StickySearchBar {...defaultProps} />);

    const mainContainer = screen
      .getByPlaceholderText("Search for anime...")
      .closest("div")?.parentElement?.parentElement?.parentElement;
    expect(mainContainer).toHaveClass(
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "bg-slate-900/95",
      "backdrop-blur-sm",
      "border-b",
      "border-slate-700",
      "z-40",
      "shadow-lg"
    );
  });

  it("should have correct CSS classes for content container", () => {
    render(<StickySearchBar {...defaultProps} />);

    const contentContainer = screen
      .getByPlaceholderText("Search for anime...")
      .closest("div")?.parentElement?.parentElement;
    expect(contentContainer).toHaveClass(
      "container",
      "mx-auto",
      "px-4",
      "py-3"
    );
  });

  it("should have correct CSS classes for search container", () => {
    render(<StickySearchBar {...defaultProps} />);

    const searchContainer = screen.getByPlaceholderText("Search for anime...")
      .parentElement?.parentElement;
    expect(searchContainer).toHaveClass("max-w-2xl", "mx-auto");
  });

  it("should have correct CSS classes for input wrapper", () => {
    render(<StickySearchBar {...defaultProps} />);

    const inputWrapper = screen.getByPlaceholderText(
      "Search for anime..."
    ).parentElement;
    expect(inputWrapper).toHaveClass("relative");
  });

  it("should have correct CSS classes for input", () => {
    render(<StickySearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    expect(input).toHaveClass(
      "w-full",
      "px-4",
      "py-2",
      "pr-12",
      "bg-slate-800",
      "text-white",
      "rounded-lg",
      "border",
      "border-slate-700",
      "focus:border-blue-500",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-blue-500",
      "focus:ring-opacity-50"
    );
  });

  it("should have correct CSS classes for clear button", () => {
    render(<StickySearchBar {...defaultProps} searchInput="test" />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toHaveClass(
      "absolute",
      "right-3",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
      "text-slate-400",
      "hover:text-white",
      "transition-colors",
      "p-1",
      "rounded-full",
      "hover:bg-slate-700"
    );
  });

  it("should render clear button icon", () => {
    render(<StickySearchBar {...defaultProps} searchInput="test" />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });

  it("should have smaller input size compared to regular SearchInput", () => {
    render(<StickySearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    expect(input).toHaveClass("py-2"); // Sticky bar uses py-2 vs py-3 in regular input
  });

  it("should handle long search input values", () => {
    const longSearchInput =
      "This is a very long search query that might be used in the sticky search bar";
    render(<StickySearchBar {...defaultProps} searchInput={longSearchInput} />);

    const input = screen.getByDisplayValue(longSearchInput);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(longSearchInput);
  });

  it("should handle special characters in search input", () => {
    const specialSearchInput = "anime@#$%^&*()";
    render(
      <StickySearchBar {...defaultProps} searchInput={specialSearchInput} />
    );

    const input = screen.getByDisplayValue(specialSearchInput);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(specialSearchInput);
  });

  it("should have backdrop blur effect", () => {
    render(<StickySearchBar {...defaultProps} />);

    const mainContainer = screen
      .getByPlaceholderText("Search for anime...")
      .closest("div")?.parentElement?.parentElement?.parentElement;
    expect(mainContainer).toHaveClass("backdrop-blur-sm");
  });

  it("should have high z-index for overlay", () => {
    render(<StickySearchBar {...defaultProps} />);

    const mainContainer = screen
      .getByPlaceholderText("Search for anime...")
      .closest("div")?.parentElement?.parentElement?.parentElement;
    expect(mainContainer).toHaveClass("z-40");
  });
});
