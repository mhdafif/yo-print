import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeTitles } from "../AnimeTitles";

const mockAnime = {
  title: "Test Anime",
  title_english: "Test Anime English",
  title_japanese: "テストアニメ",
};

describe("AnimeTitles", () => {
  it("should render all anime titles correctly", () => {
    render(<AnimeTitles anime={mockAnime} />);

    expect(screen.getByText("Test Anime")).toBeInTheDocument();
    expect(screen.getByText("Test Anime English")).toBeInTheDocument();
    expect(screen.getByText("テストアニメ")).toBeInTheDocument();
  });

  it("should render only main title when other titles are missing", () => {
    const animeWithOnlyMainTitle = {
      title: "Only Main Title",
    };

    render(<AnimeTitles anime={animeWithOnlyMainTitle} />);

    expect(screen.getByText("Only Main Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Anime English")).not.toBeInTheDocument();
    expect(screen.queryByText("テストアニメ")).not.toBeInTheDocument();
  });

  it("should not render English title when it's the same as main title", () => {
    const animeWithSameEnglishTitle = {
      title: "Same Title",
      title_english: "Same Title",
      title_japanese: "同じタイトル",
    };

    render(<AnimeTitles anime={animeWithSameEnglishTitle} />);

    expect(screen.getByText("Same Title")).toBeInTheDocument();
    // Should only appear once (main title)
    expect(screen.getAllByText("Same Title")).toHaveLength(1);
    expect(screen.getByText("同じタイトル")).toBeInTheDocument();
  });

  it("should have correct CSS classes for main title", () => {
    render(<AnimeTitles anime={mockAnime} />);

    const mainTitle = screen.getByText("Test Anime");
    expect(mainTitle).toHaveClass(
      "text-4xl",
      "font-bold",
      "text-white",
      "mb-2"
    );
  });

  it("should have correct CSS classes for English title", () => {
    render(<AnimeTitles anime={mockAnime} />);

    const englishTitle = screen.getByText("Test Anime English");
    expect(englishTitle).toHaveClass("text-xl", "text-slate-400", "mb-2");
  });

  it("should have correct CSS classes for Japanese title", () => {
    render(<AnimeTitles anime={mockAnime} />);

    const japaneseTitle = screen.getByText("テストアニメ");
    expect(japaneseTitle).toHaveClass("text-lg", "text-slate-500", "mb-4");
  });

  it("should use correct heading levels", () => {
    render(<AnimeTitles anime={mockAnime} />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const h3 = screen.getByRole("heading", { level: 3 });

    expect(h1).toHaveTextContent("Test Anime");
    expect(h2).toHaveTextContent("Test Anime English");
    expect(h3).toHaveTextContent("テストアニメ");
  });
});
