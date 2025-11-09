import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeStats } from "../AnimeStats";

const mockAnimeWithAllStats = {
  score: 8.5,
  scored_by: 10000,
  rank: 100,
  popularity: 1000,
};

const mockAnimeWithPartialStats = {
  score: 7.2,
  scored_by: 5000,
  popularity: 2000,
};

const mockAnimeWithNoScore = {
  scored_by: 0,
  rank: 500,
  popularity: 3000,
};

describe("AnimeStats", () => {
  it("should render all anime stats correctly", () => {
    render(<AnimeStats anime={mockAnimeWithAllStats} />);

    expect(screen.getByText("Score:")).toBeInTheDocument();
    expect(screen.getByText("★ 8.50")).toBeInTheDocument();
    expect(screen.getByText("(10,000 users)")).toBeInTheDocument();
    expect(screen.getByText("Rank:")).toBeInTheDocument();
    expect(screen.getByText("#100")).toBeInTheDocument();
    expect(screen.getByText("Popularity:")).toBeInTheDocument();
    expect(screen.getByText("#1000")).toBeInTheDocument();
  });

  it("should handle missing rank correctly", () => {
    render(<AnimeStats anime={mockAnimeWithPartialStats} />);

    expect(screen.queryByText("Rank:")).not.toBeInTheDocument();
    // Should still show other stats like popularity
    expect(screen.getByText("#2000")).toBeInTheDocument();
  });

  it("should handle missing score correctly", () => {
    render(<AnimeStats anime={mockAnimeWithNoScore} />);

    expect(screen.getByText("Score:")).toBeInTheDocument();
    expect(screen.getByText("★ N/A")).toBeInTheDocument();
    expect(screen.getByText("(0 users)")).toBeInTheDocument();
  });

  it("should format score with 2 decimal places", () => {
    render(<AnimeStats anime={mockAnimeWithAllStats} />);

    expect(screen.getByText("★ 8.50")).toBeInTheDocument();
  });

  it("should format scored_by with locale string", () => {
    render(<AnimeStats anime={mockAnimeWithAllStats} />);

    expect(screen.getByText("(10,000 users)")).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    render(<AnimeStats anime={mockAnimeWithAllStats} />);

    const container = screen.getByText("Score:").parentElement?.parentElement;
    expect(container).toHaveClass("flex", "flex-wrap", "gap-4", "text-sm");

    const scoreLabel = screen.getByText("Score:");
    expect(scoreLabel).toHaveClass("text-slate-400");

    const scoreValue = screen.getByText("★ 8.50");
    expect(scoreValue).toHaveClass("text-yellow-500", "font-bold");

    const usersCount = screen.getByText("(10,000 users)");
    expect(usersCount).toHaveClass("text-slate-500");
  });

  it("should handle zero scored_by correctly", () => {
    render(<AnimeStats anime={mockAnimeWithNoScore} />);

    expect(screen.getByText("(0 users)")).toBeInTheDocument();
  });
});
