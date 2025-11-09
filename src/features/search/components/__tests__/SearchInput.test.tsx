import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../SearchInput";

describe("SearchInput", () => {
  const defaultProps = {
    searchInput: "",
    isSearchFocused: false,
    onInputChange: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
    onClearSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search input correctly", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should display current search input value", () => {
    render(<SearchInput {...defaultProps} searchInput="Naruto" />);

    const input = screen.getByDisplayValue("Naruto");
    expect(input).toBeInTheDocument();
  });

  it("should call onInputChange when input value changes", async () => {
    const mockOnInputChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchInput {...defaultProps} onInputChange={mockOnInputChange} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    await user.type(input, "Naruto");

    expect(mockOnInputChange).toHaveBeenCalledTimes(6); // One for each character
  });

  it("should call onFocus when input is focused", () => {
    const mockOnFocus = vi.fn();

    render(<SearchInput {...defaultProps} onFocus={mockOnFocus} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    fireEvent.focus(input);

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when input is blurred", () => {
    const mockOnBlur = vi.fn();

    render(<SearchInput {...defaultProps} onBlur={mockOnBlur} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    fireEvent.blur(input);

    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it("should show clear button when searchInput has value", () => {
    render(<SearchInput {...defaultProps} searchInput="test" />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
  });

  it("should not show clear button when searchInput is empty", () => {
    render(<SearchInput {...defaultProps} searchInput="" />);

    const clearButton = screen.queryByLabelText("Clear search");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("should call onClearSearch when clear button is clicked", async () => {
    const mockOnClearSearch = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchInput
        {...defaultProps}
        searchInput="test"
        onClearSearch={mockOnClearSearch}
      />
    );

    const clearButton = screen.getByLabelText("Clear search");
    await user.click(clearButton);

    expect(mockOnClearSearch).toHaveBeenCalledTimes(1);
  });

  it("should show validation message when focused with 1-2 characters", () => {
    render(
      <SearchInput {...defaultProps} searchInput="AB" isSearchFocused={true} />
    );

    expect(
      screen.getByText("Type at least 3 characters to search")
    ).toBeInTheDocument();
  });

  it("should not show validation message when focused with 0 characters", () => {
    render(
      <SearchInput {...defaultProps} searchInput="" isSearchFocused={true} />
    );

    expect(
      screen.queryByText("Type at least 3 characters to search")
    ).not.toBeInTheDocument();
  });

  it("should not show validation message when focused with 3+ characters", () => {
    render(
      <SearchInput {...defaultProps} searchInput="ABC" isSearchFocused={true} />
    );

    expect(
      screen.queryByText("Type at least 3 characters to search")
    ).not.toBeInTheDocument();
  });

  it("should not show validation message when not focused", () => {
    render(
      <SearchInput {...defaultProps} searchInput="AB" isSearchFocused={false} />
    );

    expect(
      screen.queryByText("Type at least 3 characters to search")
    ).not.toBeInTheDocument();
  });

  it("should have correct CSS classes for container", () => {
    render(<SearchInput {...defaultProps} />);

    const container = screen
      .getByPlaceholderText("Search for anime...")
      .closest("div")?.parentElement;
    expect(container).toHaveClass("max-w-2xl", "mx-auto", "mb-4");
  });

  it("should have correct CSS classes for input wrapper", () => {
    render(<SearchInput {...defaultProps} />);

    const inputWrapper = screen.getByPlaceholderText(
      "Search for anime..."
    ).parentElement;
    expect(inputWrapper).toHaveClass("relative");
  });

  it("should have correct CSS classes for input", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for anime...");
    expect(input).toHaveClass(
      "w-full",
      "px-4",
      "py-3",
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
      "focus:ring-opacity-50",
      "z-[2]",
      "relative"
    );
  });

  it("should have correct CSS classes for clear button", () => {
    render(<SearchInput {...defaultProps} searchInput="test" />);

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
      "hover:bg-slate-700",
      "z-[2]"
    );
  });

  it("should have correct CSS classes for validation message", () => {
    render(
      <SearchInput {...defaultProps} searchInput="AB" isSearchFocused={true} />
    );

    const validationMessage = screen.getByText(
      "Type at least 3 characters to search"
    );
    expect(validationMessage).toHaveClass("text-slate-400", "text-sm");

    const validationContainer = validationMessage.parentElement;
    expect(validationContainer).toHaveClass(
      "absolute",
      "top-[70%]",
      "left-0",
      "right-0",
      "mt-2",
      "p-3",
      "bg-slate-800",
      "border",
      "border-slate-700",
      "rounded-b-lg",
      "z-[1]",
      "shadow-lg"
    );
  });

  it("should render clear button icon", () => {
    render(<SearchInput {...defaultProps} searchInput="test" />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });
});
