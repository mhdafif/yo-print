import React from "react";
import { render, screen } from "@testing-library/react";
import { AnimeImage } from "../AnimeImage";

const mockAnime = {
  images: {
    jpg: {
      large_image_url: "https://example.com/large-image.jpg",
    },
  },
  title: "Test Anime",
};

describe("AnimeImage", () => {
  it("should render anime image correctly", () => {
    render(<AnimeImage anime={mockAnime} />);

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/large-image.jpg");
    expect(img).toHaveAttribute("alt", "Test Anime");
  });

  it("should have correct CSS classes for container", () => {
    render(<AnimeImage anime={mockAnime} />);

    const container = screen.getByRole("img").closest("div")?.parentElement;
    expect(container).toHaveClass("md:col-span-1");
  });

  it("should have correct CSS classes for sticky wrapper", () => {
    render(<AnimeImage anime={mockAnime} />);

    const stickyWrapper = screen.getByRole("img").parentElement;
    expect(stickyWrapper).toHaveClass("sticky", "top-8");
  });

  it("should have correct CSS classes for image", () => {
    render(<AnimeImage anime={mockAnime} />);

    const img = screen.getByRole("img");
    expect(img).toHaveClass("w-full", "rounded-lg", "shadow-2xl");
  });

  it("should handle anime with missing images", () => {
    const animeWithMissingImages = {
      images: {
        jpg: {
          large_image_url: "",
        },
      },
      title: "Anime with Missing Image",
    };

    render(<AnimeImage anime={animeWithMissingImages} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "");
    expect(img).toHaveAttribute("alt", "Anime with Missing Image");
  });

  it("should handle anime with null images", () => {
    const animeWithNullImages = {
      images: {
        jpg: {
          large_image_url: null,
        },
      },
      title: "Anime with Null Image",
    };

    render(<AnimeImage anime={animeWithNullImages} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Anime with Null Image");
    // When src is null, the attribute is removed/not present
    expect(img.getAttribute("src")).toBeNull();
  });

  it("should handle anime with complex title", () => {
    const animeWithComplexTitle = {
      images: {
        jpg: {
          large_image_url: "https://example.com/complex.jpg",
        },
      },
      title: "Anime: The Complex Title (Season 2) [Special]",
    };

    render(<AnimeImage anime={animeWithComplexTitle} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "alt",
      "Anime: The Complex Title (Season 2) [Special]"
    );
  });

  it("should handle different image URLs", () => {
    const animeWithDifferentUrl = {
      images: {
        jpg: {
          large_image_url:
            "https://cdn.example.com/anime/image_12345_large.jpg?v=2",
        },
      },
      title: "Different URL Anime",
    };

    render(<AnimeImage anime={animeWithDifferentUrl} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://cdn.example.com/anime/image_12345_large.jpg?v=2"
    );
  });

  it("should render within correct grid structure", () => {
    render(<AnimeImage anime={mockAnime} />);

    // Test that the component has the correct grid class (AnimeImage itself is the grid column)
    const imageColumn = screen.getByRole("img").closest("div")?.parentElement;
    expect(imageColumn).toHaveClass("md:col-span-1");
  });
});
