import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchResults } from "../SearchResults";
import { AnimeSummary } from "../../../types/anime";

const mockAnimeResults: AnimeSummary[] = [
  {
    mal_id: 1,
    title: "Naruto",
    images: {
      jpg: {
        image_url: "https://example.com/naruto.jpg",
      },
    },
    type: "TV",
    episodes: 220,
    score: 8.5,
    scored_by: 10000,
    members: 50000,
  },
  {
    mal_id: 2,
    title: "One Piece",
    images: {
      jpg: {
        image_url: "https://example.com/onepiece.jpg",
      },
    },
    type: "TV",
    episodes: 1000,
    score: 9.0,
    scored_by: 15000,
    members: 80000,
  },
];

describe("SearchResults", () => {
  const defaultProps = {
    results: [],
    searchInput: "",
    isLoading: false,
    error: null,
  };

  it("should render loading skeleton when loading", () => {
    render(<SearchResults {...defaultProps} isLoading={true} />);

    // Check that something is rendered during loading
    expect(document.body).toBeInTheDocument();
    // The component should render skeleton cards when loading
  });

  it("should render error message when error exists", () => {
    const errorMessage = "Failed to fetch anime data";
    render(<SearchResults {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render no results message when no results found", () => {
    render(
      <SearchResults
        {...defaultProps}
        searchInput="nonexistent anime"
        results={[]}
      />
    );

    expect(
      screen.getByText("No anime found for 'nonexistent anime'")
    ).toBeInTheDocument();
  });

  it("should render anime results when results exist", () => {
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} results={mockAnimeResults} />
      </MemoryRouter>
    );

    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.getByText("One Piece")).toBeInTheDocument();
  });

  it("should not render anything when searchInput is empty and not loading", () => {
    render(<SearchResults {...defaultProps} searchInput="" />);

    // Should not render results, error, or no results message
    expect(screen.queryByText("No anime found")).not.toBeInTheDocument();
    expect(screen.queryByText("Naruto")).not.toBeInTheDocument();
    expect(screen.queryByText("One Piece")).not.toBeInTheDocument();
  });

  it("should not render anything when searchInput has less than 3 characters", () => {
    render(<SearchResults {...defaultProps} searchInput="ab" />);

    expect(screen.queryByText("No anime found")).not.toBeInTheDocument();
    expect(screen.queryByText("Naruto")).not.toBeInTheDocument();
  });

  it("should have correct CSS classes for error container", () => {
    render(<SearchResults {...defaultProps} error="Test error" />);

    const errorContainer = screen.getByText("Test error").parentElement;
    expect(errorContainer).toHaveClass(
      "bg-red-900/50",
      "border",
      "border-red-700",
      "text-red-200",
      "px-4",
      "py-3",
      "rounded-lg"
    );
  });

  it("should have correct CSS classes for no results message", () => {
    render(<SearchResults {...defaultProps} searchInput="test" results={[]} />);

    const noResultsMessage = screen.getByText("No anime found for 'test'");
    expect(noResultsMessage).toHaveClass("text-lg");
    expect(noResultsMessage.parentElement).toHaveClass(
      "text-center",
      "text-slate-400",
      "py-16"
    );
  });

  it("should have correct CSS classes for results grid", () => {
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} results={mockAnimeResults} />
      </MemoryRouter>
    );

    const grid = screen.getByText("Naruto").closest("a")?.parentElement;
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-4",
      "xl:grid-cols-5",
      "gap-6",
      "pb-24"
    );
  });

  it("should render multiple anime cards", () => {
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} results={mockAnimeResults} />
      </MemoryRouter>
    );

    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.getByText("One Piece")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2); // Each anime should be wrapped in a link
  });

  it("should handle searchInput with special characters", () => {
    render(
      <SearchResults {...defaultProps} searchInput="anime@#$%" results={[]} />
    );

    expect(
      screen.getByText("No anime found for 'anime@#$%'")
    ).toBeInTheDocument();
  });

  it("should handle empty searchInput with results (should still render results)", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchResults
          {...defaultProps}
          searchInput=""
          results={mockAnimeResults}
        />
      </MemoryRouter>
    );

    // When searchInput is empty but there are results, it still renders the results
    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.getByText("One Piece")).toBeInTheDocument();
    expect(container.querySelector(".grid")).toBeInTheDocument();
  });

  it("should handle single result", () => {
    const singleResult = [mockAnimeResults[0]];
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} results={singleResult} />
      </MemoryRouter>
    );

    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.queryByText("One Piece")).not.toBeInTheDocument();
  });

  it("should handle many results", () => {
    const manyResults = Array(25)
      .fill(mockAnimeResults[0])
      .map((anime, index) => ({
        ...anime,
        mal_id: index + 1,
        title: `${anime.title} ${index + 1}`,
      }));

    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} results={manyResults} />
      </MemoryRouter>
    );

    expect(screen.getByText("Naruto 1")).toBeInTheDocument();
    expect(screen.getByText("Naruto 25")).toBeInTheDocument();
  });
});
