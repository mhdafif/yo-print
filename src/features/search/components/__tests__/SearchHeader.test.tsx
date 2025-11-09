import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchHeader } from "../SearchHeader";

describe("SearchHeader", () => {
  it("should render the search header correctly", () => {
    render(<SearchHeader />);

    expect(screen.getByText("Anime Search")).toBeInTheDocument();
    expect(
      screen.getByText("Search for your favorite anime")
    ).toBeInTheDocument();
  });

  it("should have correct heading hierarchy", () => {
    render(<SearchHeader />);

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent("Anime Search");

    const description = screen.getByText("Search for your favorite anime");
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe("P");
  });

  it("should have correct CSS classes", () => {
    render(<SearchHeader />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("text-center", "mb-8");

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveClass("text-4xl", "font-bold", "text-white", "mb-2");
  });
});
