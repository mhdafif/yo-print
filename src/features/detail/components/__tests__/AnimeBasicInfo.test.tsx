import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeBasicInfo } from "../AnimeBasicInfo";

const mockAnimeWithAllInfo = {
  type: "TV",
  episodes: 12,
  status: "Completed",
  year: 2023,
};

const mockAnimeWithPartialInfo = {
  type: "Movie",
  episodes: null,
  status: "Airing",
  year: null,
};

const mockAnimeWithUnknownValues = {
  type: "OVA",
  episodes: null,
  status: null,
  year: null,
};

describe("AnimeBasicInfo", () => {
  it("should render all anime basic info correctly", () => {
    render(<AnimeBasicInfo anime={mockAnimeWithAllInfo} />);

    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("TV")).toBeInTheDocument();
    expect(screen.getByText("Episodes:")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Year:")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("should handle null values correctly", () => {
    render(<AnimeBasicInfo anime={mockAnimeWithPartialInfo} />);

    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Movie")).toBeInTheDocument();
    expect(screen.getByText("Episodes:")).toBeInTheDocument();
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Airing")).toBeInTheDocument();
    expect(screen.getByText("Year:")).toBeInTheDocument();
    expect(screen.getAllByText("Unknown")).toHaveLength(2); // Episodes and Year
  });

  it("should display Unknown for null episodes and year", () => {
    render(<AnimeBasicInfo anime={mockAnimeWithUnknownValues} />);

    expect(screen.getAllByText("Unknown")).toHaveLength(2); // episodes and year only, status shows as empty
    expect(screen.getByText("OVA")).toBeInTheDocument(); // type is not null
  });

  it("should have correct CSS classes for container", () => {
    render(<AnimeBasicInfo anime={mockAnimeWithAllInfo} />);

    const container = screen.getByText("Type:").closest("div")?.parentElement;
    expect(container).toHaveClass(
      "grid",
      "grid-cols-2",
      "md:grid-cols-4",
      "gap-4",
      "text-sm"
    );
  });

  it("should have correct CSS classes for labels", () => {
    render(<AnimeBasicInfo anime={mockAnimeWithAllInfo} />);

    const typeLabel = screen.getByText("Type:");
    expect(typeLabel).toHaveClass("text-slate-400");

    const episodesLabel = screen.getByText("Episodes:");
    expect(episodesLabel).toHaveClass("text-slate-400");
  });

  it("should have correct CSS classes for values", () => {
    render(<AnimeBasicInfo anime={mockAnimeWithAllInfo} />);

    const typeValue = screen.getByText("TV");
    expect(typeValue).toHaveClass("text-white", "font-medium");

    const episodesValue = screen.getByText("12");
    expect(episodesValue).toHaveClass("text-white", "font-medium");
  });

  it("should handle different anime types", () => {
    const movieAnime = {
      type: "Movie",
      episodes: 1,
      status: "Completed",
      year: 2022,
    };
    render(<AnimeBasicInfo anime={movieAnime} />);

    expect(screen.getByText("Movie")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  it("should handle episodes with 0 value", () => {
    const animeWithZeroEpisodes = {
      type: "TV",
      episodes: 0,
      status: "Completed",
      year: 2023,
    };
    render(<AnimeBasicInfo anime={animeWithZeroEpisodes} />);

    // 0 is falsy, so it shows "Unknown" instead of "0"
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
