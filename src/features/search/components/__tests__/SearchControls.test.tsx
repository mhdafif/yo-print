import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchControls } from "../SearchControls";

const mockPagination = {
  currentPage: 2,
  lastPage: 5,
  hasPrev: true,
  hasNext: true,
};

describe("SearchControls", () => {
  const defaultProps = {
    pagination: mockPagination,
    sortBy: "default" as const,
    onSortChange: vi.fn(),
    onPreviousPage: vi.fn(),
    onNextPage: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search controls correctly", () => {
    render(<SearchControls {...defaultProps} />);

    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getAllByText("Default")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByText("Rating")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByText("Members")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByText("2 of 5")).toHaveLength(2); // Mobile and desktop versions
  });

  it("should call onSortChange when sort button is clicked", () => {
    const mockOnSortChange = vi.fn();
    render(
      <SearchControls {...defaultProps} onSortChange={mockOnSortChange} />
    );

    const ratingButtons = screen.getAllByText("Rating");
    fireEvent.click(ratingButtons[0]); // Click the first (mobile) Rating button

    expect(mockOnSortChange).toHaveBeenCalledWith("rating");
  });

  it("should call onPreviousPage when previous button is clicked", () => {
    const mockOnPreviousPage = vi.fn();
    render(
      <SearchControls {...defaultProps} onPreviousPage={mockOnPreviousPage} />
    );

    const previousButtons = screen.getAllByLabelText("Previous page");
    fireEvent.click(previousButtons[0]); // Click the first (mobile) Previous button

    expect(mockOnPreviousPage).toHaveBeenCalledTimes(1);
  });

  it("should call onNextPage when next button is clicked", () => {
    const mockOnNextPage = vi.fn();
    render(<SearchControls {...defaultProps} onNextPage={mockOnNextPage} />);

    const nextButtons = screen.getAllByLabelText("Next page");
    fireEvent.click(nextButtons[0]); // Click the first (mobile) Next button

    expect(mockOnNextPage).toHaveBeenCalledTimes(1);
  });

  it("should disable previous button when hasPrev is false", () => {
    render(
      <SearchControls
        {...defaultProps}
        pagination={{ ...mockPagination, hasPrev: false }}
      />
    );

    const previousButtons = screen.getAllByLabelText("Previous page");
    expect(previousButtons[0]).toBeDisabled(); // Mobile button
    expect(previousButtons[1]).toBeDisabled(); // Desktop button
  });

  it("should disable next button when hasNext is false", () => {
    render(
      <SearchControls
        {...defaultProps}
        pagination={{ ...mockPagination, hasNext: false }}
      />
    );

    const nextButtons = screen.getAllByLabelText("Next page");
    expect(nextButtons[0]).toBeDisabled(); // Mobile button
    expect(nextButtons[1]).toBeDisabled(); // Desktop button
  });

  it("should enable previous button when hasPrev is true", () => {
    render(<SearchControls {...defaultProps} />);

    const previousButtons = screen.getAllByLabelText("Previous page");
    expect(previousButtons[0]).not.toBeDisabled(); // Mobile button
    expect(previousButtons[1]).not.toBeDisabled(); // Desktop button
  });

  it("should enable next button when hasNext is true", () => {
    render(<SearchControls {...defaultProps} />);

    const nextButtons = screen.getAllByLabelText("Next page");
    expect(nextButtons[0]).not.toBeDisabled(); // Mobile button
    expect(nextButtons[1]).not.toBeDisabled(); // Desktop button
  });

  it("should highlight active sort button", () => {
    render(<SearchControls {...defaultProps} sortBy="rating" />);

    const ratingButtons = screen.getAllByText("Rating");
    const defaultButtons = screen.getAllByText("Default");
    const membersButtons = screen.getAllByText("Members");

    // Both mobile and desktop rating buttons should be highlighted
    expect(ratingButtons[0]).toHaveClass("bg-blue-600", "text-white");
    expect(ratingButtons[1]).toHaveClass("bg-blue-600", "text-white");

    // Both mobile and desktop default/members buttons should be inactive
    expect(defaultButtons[0]).toHaveClass("bg-slate-700", "text-slate-300");
    expect(defaultButtons[1]).toHaveClass("bg-slate-700", "text-slate-300");
    expect(membersButtons[0]).toHaveClass("bg-slate-700", "text-slate-300");
    expect(membersButtons[1]).toHaveClass("bg-slate-700", "text-slate-300");
  });

  it("should show correct page information", () => {
    render(<SearchControls {...defaultProps} />);

    expect(screen.getAllByText("2 of 5")).toHaveLength(2); // Mobile and desktop versions
  });

  it("should have correct CSS classes for container", () => {
    render(<SearchControls {...defaultProps} />);

    const container = screen.getByText("Sort by:").closest("div")?.parentElement
      ?.parentElement?.parentElement;
    expect(container).toHaveClass(
      "fixed",
      "bottom-0",
      "left-0",
      "right-0",
      "bg-slate-900",
      "border-t",
      "border-slate-700",
      "p-3",
      "sm:p-4",
      "z-10"
    );
  });

  it("should have correct CSS classes for mobile layout", () => {
    render(<SearchControls {...defaultProps} />);

    const mobileLayout = screen.getByText("Sort:").parentElement?.parentElement;
    expect(mobileLayout).toHaveClass("flex", "flex-col", "sm:hidden", "gap-3");
  });

  it("should have correct CSS classes for desktop layout", () => {
    render(<SearchControls {...defaultProps} />);

    const desktopLayout =
      screen.getByText("Sort by:").parentElement?.parentElement;
    expect(desktopLayout).toHaveClass(
      "hidden",
      "sm:flex",
      "justify-between",
      "items-center"
    );
  });

  it("should have correct CSS classes for sort buttons on desktop", () => {
    render(<SearchControls {...defaultProps} />);

    const defaultButtons = screen.getAllByText("Default");
    const desktopButton = defaultButtons[1]; // Second button is the desktop version
    expect(desktopButton).toHaveClass(
      "px-3",
      "py-1",
      "rounded-lg",
      "text-sm",
      "transition-colors"
    );
  });

  it("should have correct CSS classes for sort buttons on mobile", () => {
    render(<SearchControls {...defaultProps} />);

    const defaultButtons = screen.getAllByText("Default");
    const mobileButton = defaultButtons[0]; // First button is the mobile version
    expect(mobileButton).toHaveClass(
      "px-2",
      "py-1",
      "rounded",
      "text-xs",
      "transition-colors"
    );
  });

  it("should have correct CSS classes for pagination buttons", () => {
    render(<SearchControls {...defaultProps} />);

    const paginationButtons = screen.getAllByLabelText("Previous page");
    const mobileButton = paginationButtons[0]; // Mobile button
    expect(mobileButton).toHaveClass(
      "p-2",
      "bg-slate-700",
      "text-white",
      "rounded-lg",
      "hover:bg-slate-600",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
      "transition-colors"
    );
  });

  it("should render pagination icons", () => {
    render(<SearchControls {...defaultProps} />);

    const svgs = document.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute("fill", "none");
      expect(svg).toHaveAttribute("stroke", "currentColor");
    });
  });

  it("should handle first page correctly", () => {
    render(
      <SearchControls
        {...defaultProps}
        pagination={{ ...mockPagination, currentPage: 1, hasPrev: false }}
      />
    );

    expect(screen.getAllByText("1 of 5")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByLabelText("Previous page")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByLabelText("Next page")).toHaveLength(2); // Mobile and desktop versions
  });

  it("should handle last page correctly", () => {
    render(
      <SearchControls
        {...defaultProps}
        pagination={{ ...mockPagination, currentPage: 5, hasNext: false }}
      />
    );

    expect(screen.getAllByText("5 of 5")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByLabelText("Previous page")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByLabelText("Next page")).toHaveLength(2); // Mobile and desktop versions
  });

  it("should handle single page correctly", () => {
    render(
      <SearchControls
        {...defaultProps}
        pagination={{
          currentPage: 1,
          lastPage: 1,
          hasPrev: false,
          hasNext: false,
        }}
      />
    );

    expect(screen.getAllByText("1 of 1")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByLabelText("Previous page")).toHaveLength(2); // Mobile and desktop versions
    expect(screen.getAllByLabelText("Next page")).toHaveLength(2); // Mobile and desktop versions
  });
});
