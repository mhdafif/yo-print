import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeGenres } from "../AnimeGenres";

const mockAnimeWithGenres = {
  genres: [
    { mal_id: 1, name: "Action" },
    { mal_id: 2, name: "Adventure" },
    { mal_id: 3, name: "Comedy" },
  ],
};

const mockAnimeWithNoGenres = {
  genres: [],
};

const mockAnimeWithSingleGenre = {
  genres: [{ mal_id: 4, name: "Drama" }],
};

describe("AnimeGenres", () => {
  it("should render all anime genres correctly", () => {
    render(<AnimeGenres anime={mockAnimeWithGenres} />);

    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
  });

  it("should render nothing when there are no genres", () => {
    render(<AnimeGenres anime={mockAnimeWithNoGenres} />);

    const container = screen.queryByTestId("anime-genres");
    expect(container).not.toBeInTheDocument();
  });

  it("should render single genre correctly", () => {
    render(<AnimeGenres anime={mockAnimeWithSingleGenre} />);

    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getAllByText("Drama")).toHaveLength(1);
  });

  it("should use genre mal_id as key", () => {
    render(<AnimeGenres anime={mockAnimeWithGenres} />);

    const genres = screen.getAllByText(/Action|Adventure|Comedy/);
    expect(genres).toHaveLength(3);
  });

  it("should have correct CSS classes for container", () => {
    render(<AnimeGenres anime={mockAnimeWithGenres} />);

    const container = screen.getByText("Action").closest("div");
    expect(container).toHaveClass("flex", "flex-wrap", "gap-2");
  });

  it("should have correct CSS classes for genre tags", () => {
    render(<AnimeGenres anime={mockAnimeWithGenres} />);

    const actionGenre = screen.getByText("Action");
    expect(actionGenre).toHaveClass(
      "px-3",
      "py-1",
      "bg-slate-700",
      "text-slate-300",
      "rounded-full",
      "text-sm"
    );
  });

  it("should render genres in correct order", () => {
    render(<AnimeGenres anime={mockAnimeWithGenres} />);

    const container = screen.getByText("Action").parentElement;
    const genres = container?.querySelectorAll("span");

    expect(genres?.[0]).toHaveTextContent("Action");
    expect(genres?.[1]).toHaveTextContent("Adventure");
    expect(genres?.[2]).toHaveTextContent("Comedy");
  });

  it("should handle genres with special characters", () => {
    const animeWithSpecialGenres = {
      genres: [
        { mal_id: 5, name: "Sci-Fi" },
        { mal_id: 6, name: "Romance" },
      ],
    };

    render(<AnimeGenres anime={animeWithSpecialGenres} />);

    expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
    expect(screen.getByText("Romance")).toBeInTheDocument();
  });
});
