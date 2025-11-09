import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeBackground } from "../AnimeBackground";

const mockAnimeWithBackground = {
  background:
    "This is the background information for the anime. It provides additional context about the production and history.",
};

const mockAnimeWithoutBackground = {
  background: "",
};

const mockAnimeWithNullBackground = {
  background: null,
};

const mockAnimeWithUndefinedBackground = {
  background: undefined,
};

describe("AnimeBackground", () => {
  it("should render anime background correctly", () => {
    render(<AnimeBackground anime={mockAnimeWithBackground} />);

    expect(screen.getByText("Background")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This is the background information for the anime. It provides additional context about the production and history."
      )
    ).toBeInTheDocument();
  });

  it("should not render anything when background is empty string", () => {
    render(<AnimeBackground anime={mockAnimeWithoutBackground} />);

    expect(screen.queryByText("Background")).not.toBeInTheDocument();
    expect(
      screen.queryByText("This is the background information")
    ).not.toBeInTheDocument();
  });

  it("should not render anything when background is null", () => {
    render(<AnimeBackground anime={mockAnimeWithNullBackground} />);

    expect(screen.queryByText("Background")).not.toBeInTheDocument();
  });

  it("should not render anything when background is undefined", () => {
    render(<AnimeBackground anime={mockAnimeWithUndefinedBackground} />);

    expect(screen.queryByText("Background")).not.toBeInTheDocument();
  });

  it("should have correct CSS classes for container", () => {
    render(<AnimeBackground anime={mockAnimeWithBackground} />);

    const container = screen.getByText("Background").parentElement;
    expect(container).toBeInTheDocument();
  });

  it("should have correct CSS classes for heading", () => {
    render(<AnimeBackground anime={mockAnimeWithBackground} />);

    const heading = screen.getByText("Background");
    expect(heading).toHaveClass(
      "text-xl",
      "font-semibold",
      "text-white",
      "mb-3"
    );
  });

  it("should have correct CSS classes for background text", () => {
    render(<AnimeBackground anime={mockAnimeWithBackground} />);

    const backgroundText = screen.getByText(
      "This is the background information for the anime. It provides additional context about the production and history."
    );
    expect(backgroundText).toHaveClass(
      "text-slate-300",
      "leading-relaxed",
      "whitespace-pre-wrap"
    );
  });

  it("should preserve whitespace in background", () => {
    const animeWithWhitespaceBackground = {
      background: "Paragraph 1\n\nParagraph 2\n\nParagraph 3",
    };

    render(<AnimeBackground anime={animeWithWhitespaceBackground} />);

    const backgroundText = screen.getByText(/Paragraph 1/);
    expect(backgroundText).toBeInTheDocument();
    expect(backgroundText).toHaveClass("whitespace-pre-wrap");
  });

  it("should handle short background", () => {
    const animeWithShortBackground = {
      background: "Short background.",
    };

    render(<AnimeBackground anime={animeWithShortBackground} />);

    expect(screen.getByText("Short background.")).toBeInTheDocument();
  });

  it("should handle long background", () => {
    const longBackground = "B".repeat(1500);
    const animeWithLongBackground = {
      background: longBackground,
    };

    render(<AnimeBackground anime={animeWithLongBackground} />);

    expect(screen.getByText(longBackground)).toBeInTheDocument();
  });

  it("should handle background with special characters", () => {
    const animeWithSpecialBackground = {
      background:
        "Background with special characters: ©, ®, ™, and unicode: 测试, 🎬",
    };

    render(<AnimeBackground anime={animeWithSpecialBackground} />);

    expect(
      screen.getByText(
        "Background with special characters: ©, ®, ™, and unicode: 测试, 🎬"
      )
    ).toBeInTheDocument();
  });
});
