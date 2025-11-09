import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeSynopsis } from "../AnimeSynopsis";

const mockAnimeWithSynopsis = {
  synopsis:
    "This is a test synopsis for the anime. It contains multiple sentences and provides information about the plot.",
};

const mockAnimeWithoutSynopsis = {
  synopsis: "",
};

const mockAnimeWithNullSynopsis = {
  synopsis: null,
};

const mockAnimeWithUndefinedSynopsis = {
  synopsis: undefined,
};

describe("AnimeSynopsis", () => {
  it("should render anime synopsis correctly", () => {
    render(<AnimeSynopsis anime={mockAnimeWithSynopsis} />);

    expect(screen.getByText("Synopsis")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This is a test synopsis for the anime. It contains multiple sentences and provides information about the plot."
      )
    ).toBeInTheDocument();
  });

  it("should not render anything when synopsis is empty string", () => {
    render(<AnimeSynopsis anime={mockAnimeWithoutSynopsis} />);

    expect(screen.queryByText("Synopsis")).not.toBeInTheDocument();
    expect(
      screen.queryByText("This is a test synopsis")
    ).not.toBeInTheDocument();
  });

  it("should not render anything when synopsis is null", () => {
    render(<AnimeSynopsis anime={mockAnimeWithNullSynopsis} />);

    expect(screen.queryByText("Synopsis")).not.toBeInTheDocument();
  });

  it("should not render anything when synopsis is undefined", () => {
    render(<AnimeSynopsis anime={mockAnimeWithUndefinedSynopsis} />);

    expect(screen.queryByText("Synopsis")).not.toBeInTheDocument();
  });

  it("should have correct CSS classes for container", () => {
    render(<AnimeSynopsis anime={mockAnimeWithSynopsis} />);

    const container = screen.getByText("Synopsis").parentElement;
    expect(container).toBeInTheDocument();
  });

  it("should have correct CSS classes for heading", () => {
    render(<AnimeSynopsis anime={mockAnimeWithSynopsis} />);

    const heading = screen.getByText("Synopsis");
    expect(heading).toHaveClass(
      "text-xl",
      "font-semibold",
      "text-white",
      "mb-3"
    );
  });

  it("should have correct CSS classes for synopsis text", () => {
    render(<AnimeSynopsis anime={mockAnimeWithSynopsis} />);

    const synopsisText = screen.getByText(
      "This is a test synopsis for the anime. It contains multiple sentences and provides information about the plot."
    );
    expect(synopsisText).toHaveClass(
      "text-slate-300",
      "leading-relaxed",
      "whitespace-pre-wrap"
    );
  });

  it("should preserve whitespace in synopsis", () => {
    const animeWithWhitespaceSynopsis = {
      synopsis: "Line 1\n\nLine 2\n\nLine 3",
    };

    render(<AnimeSynopsis anime={animeWithWhitespaceSynopsis} />);

    const synopsisText = screen.getByText(/Line 1/);
    expect(synopsisText).toBeInTheDocument();
    expect(synopsisText).toHaveClass("whitespace-pre-wrap");
  });

  it("should handle short synopsis", () => {
    const animeWithShortSynopsis = {
      synopsis: "Short synopsis.",
    };

    render(<AnimeSynopsis anime={animeWithShortSynopsis} />);

    expect(screen.getByText("Short synopsis.")).toBeInTheDocument();
  });

  it("should handle long synopsis", () => {
    const longSynopsis = "A".repeat(1000);
    const animeWithLongSynopsis = {
      synopsis: longSynopsis,
    };

    render(<AnimeSynopsis anime={animeWithLongSynopsis} />);

    expect(screen.getByText(longSynopsis)).toBeInTheDocument();
  });
});
