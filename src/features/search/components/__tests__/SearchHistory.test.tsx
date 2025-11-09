import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchHistory } from "../SearchHistory";

const mockSearchHistory = ["Naruto", "One Piece", "Attack on Titan"];

describe("SearchHistory", () => {
  it("should render search history correctly", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.getByText("One Piece")).toBeInTheDocument();
    expect(screen.getByText("Attack on Titan")).toBeInTheDocument();
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("should render empty state when no search history", () => {
    render(
      <SearchHistory
        searchHistory={[]}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    expect(
      screen.getByText("Start typing to search for an anime")
    ).toBeInTheDocument();
    expect(screen.queryByText("Recent Searches")).not.toBeInTheDocument();
    expect(screen.queryByText("Clear All")).not.toBeInTheDocument();
  });

  it("should call onHistoryClick when history item is clicked", () => {
    const mockOnHistoryClick = vi.fn();
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={mockOnHistoryClick}
        onClearHistory={vi.fn()}
      />
    );

    const narutoButton = screen.getByText("Naruto");
    fireEvent.click(narutoButton);

    expect(mockOnHistoryClick).toHaveBeenCalledWith("Naruto");
    expect(mockOnHistoryClick).toHaveBeenCalledTimes(1);
  });

  it("should call onClearHistory when Clear All is clicked", () => {
    const mockOnClearHistory = vi.fn();
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={mockOnClearHistory}
      />
    );

    const clearButton = screen.getByText("Clear All");
    fireEvent.click(clearButton);

    expect(mockOnClearHistory).toHaveBeenCalledTimes(1);
  });

  it("should have correct CSS classes for container", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const container = screen.getByText("Recent Searches").closest("div")
      ?.parentElement?.parentElement;
    expect(container).toHaveClass("max-w-2xl", "mx-auto", "py-16");
  });

  it("should have correct CSS classes for header", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const header = screen.getByText("Recent Searches").parentElement;
    expect(header).toHaveClass(
      "flex",
      "justify-between",
      "items-center",
      "mb-6"
    );
  });

  it("should have correct CSS classes for recent searches title", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const title = screen.getByText("Recent Searches");
    expect(title).toHaveClass("text-lg", "font-semibold", "text-white");
  });

  it("should have correct CSS classes for clear all button", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const clearButton = screen.getByText("Clear All");
    expect(clearButton).toHaveClass(
      "text-slate-400",
      "hover:text-white",
      "text-sm",
      "transition-colors"
    );
  });

  it("should have correct CSS classes for history items", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const historyItem = screen.getByText("Naruto").closest("button");
    expect(historyItem).toHaveClass(
      "w-full",
      "text-left",
      "px-4",
      "py-3",
      "bg-slate-800",
      "hover:bg-slate-700",
      "rounded-lg",
      "transition-colors",
      "group"
    );
  });

  it("should have correct CSS classes for history item text", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const historyText = screen.getByText("Naruto");
    expect(historyText).toHaveClass("text-slate-300", "group-hover:text-white");
  });

  it("should render arrow icon for history items", () => {
    render(
      <SearchHistory
        searchHistory={mockSearchHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });

  it("should have correct CSS classes for empty state", () => {
    render(
      <SearchHistory
        searchHistory={[]}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    const emptyState = screen.getByText(
      "Start typing to search for an anime"
    ).parentElement;
    expect(emptyState).toHaveClass("text-center", "text-slate-400", "py-16");
  });

  it("should handle single search history item", () => {
    const singleHistory = ["Solo Anime"];
    render(
      <SearchHistory
        searchHistory={singleHistory}
        onHistoryClick={vi.fn()}
        onClearHistory={vi.fn()}
      />
    );

    expect(screen.getByText("Solo Anime")).toBeInTheDocument();
    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });
});
