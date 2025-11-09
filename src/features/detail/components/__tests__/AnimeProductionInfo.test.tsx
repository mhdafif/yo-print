import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeProductionInfo } from "../AnimeProductionInfo";

const mockAnimeWithAllInfo = {
  studios: [{ name: "Studio Ghibli" }, { name: "Tokyo Movie Shinsha" }],
  producers: [{ name: "Producer A" }, { name: "Producer B" }],
  duration: "24 min per ep",
  rating: "PG-13",
};

const mockAnimeWithPartialInfo = {
  studios: [{ name: "Madhouse" }],
  producers: [],
  duration: "1 hr 30 min",
  rating: "R",
};

const mockAnimeWithMinimalInfo = {
  studios: [],
  producers: [],
  duration: null,
  rating: null,
};

describe("AnimeProductionInfo", () => {
  it("should render all production info correctly", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithAllInfo} />);

    expect(screen.getByText("Studios:")).toBeInTheDocument();
    expect(
      screen.getByText("Studio Ghibli, Tokyo Movie Shinsha")
    ).toBeInTheDocument();
    expect(screen.getByText("Producers:")).toBeInTheDocument();
    expect(screen.getByText("Producer A, Producer B")).toBeInTheDocument();
    expect(screen.getByText("Duration:")).toBeInTheDocument();
    expect(screen.getByText("24 min per ep")).toBeInTheDocument();
    expect(screen.getByText("Rating:")).toBeInTheDocument();
    expect(screen.getByText("PG-13")).toBeInTheDocument();
  });

  it("should not render studios section when no studios", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithMinimalInfo} />);

    expect(screen.queryByText("Studios:")).not.toBeInTheDocument();
  });

  it("should not render producers section when no producers", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithMinimalInfo} />);

    expect(screen.queryByText("Producers:")).not.toBeInTheDocument();
  });

  it("should not render duration section when duration is null", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithMinimalInfo} />);

    expect(screen.queryByText("Duration:")).not.toBeInTheDocument();
  });

  it("should not render rating section when rating is null", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithMinimalInfo} />);

    expect(screen.queryByText("Rating:")).not.toBeInTheDocument();
  });

  it("should handle single studio correctly", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithPartialInfo} />);

    expect(screen.getByText("Studios:")).toBeInTheDocument();
    expect(screen.getByText("Madhouse")).toBeInTheDocument();
  });

  it("should handle single producer correctly", () => {
    const animeWithSingleProducer = {
      studios: [],
      producers: [{ name: "Single Producer" }],
      duration: null,
      rating: null,
    };

    render(<AnimeProductionInfo anime={animeWithSingleProducer} />);

    expect(screen.getByText("Producers:")).toBeInTheDocument();
    expect(screen.getByText("Single Producer")).toBeInTheDocument();
  });

  it("should have correct CSS classes for container", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithAllInfo} />);

    const container = screen.getByText("Studios:").parentElement?.parentElement;
    expect(container).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "gap-6",
      "text-sm"
    );
  });

  it("should have correct CSS classes for labels", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithAllInfo} />);

    const studiosLabel = screen.getByText("Studios:");
    expect(studiosLabel).toHaveClass("text-slate-400");

    const durationLabel = screen.getByText("Duration:");
    expect(durationLabel).toHaveClass("text-slate-400");
  });

  it("should have correct CSS classes for values", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithAllInfo} />);

    const studiosValue = screen.getByText("Studio Ghibli, Tokyo Movie Shinsha");
    expect(studiosValue).toHaveClass("text-white", "font-medium");

    const durationValue = screen.getByText("24 min per ep");
    expect(durationValue).toHaveClass("text-white", "font-medium");
  });

  it("should handle different duration formats", () => {
    const animeWithMovieDuration = {
      studios: [],
      producers: [],
      duration: "2 hr 15 min",
      rating: null,
    };

    render(<AnimeProductionInfo anime={animeWithMovieDuration} />);

    expect(screen.getByText("2 hr 15 min")).toBeInTheDocument();
  });

  it("should handle different rating formats", () => {
    const animeWithDifferentRating = {
      studios: [],
      producers: [],
      duration: null,
      rating: "R+",
    };

    render(<AnimeProductionInfo anime={animeWithDifferentRating} />);

    expect(screen.getByText("R+")).toBeInTheDocument();
  });

  it("should join multiple studios with comma and space", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithAllInfo} />);

    const studiosText = screen.getByText("Studio Ghibli, Tokyo Movie Shinsha");
    expect(studiosText).toBeInTheDocument();
  });

  it("should join multiple producers with comma and space", () => {
    render(<AnimeProductionInfo anime={mockAnimeWithAllInfo} />);

    const producersText = screen.getByText("Producer A, Producer B");
    expect(producersText).toBeInTheDocument();
  });
});
