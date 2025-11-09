import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  ErrorDisplay,
  NetworkError,
  NotFoundError,
  RateLimitError,
  ServerError,
  GenericError,
} from "../ErrorDisplay";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("ErrorDisplay", () => {
  it("should render error message correctly", () => {
    render(<ErrorDisplay error="Test error message" />, { wrapper });

    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("Back to Search")).toBeInTheDocument();
  });

  it("should show retry button when provided", () => {
    const mockRetry = vi.fn();
    render(<ErrorDisplay error="Test error" onRetry={mockRetry} showRetry />, {
      wrapper,
    });

    expect(screen.getByText("Try Again")).toBeInTheDocument();
    expect(screen.getByText("Back to Search")).toBeInTheDocument();
  });

  it("should call retry function when retry button is clicked", async () => {
    const mockRetry = vi.fn();
    const user = userEvent.setup();

    render(<ErrorDisplay error="Test error" onRetry={mockRetry} showRetry />, {
      wrapper,
    });

    await user.click(screen.getByText("Try Again"));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("should not show retry button when showRetry is false", () => {
    render(
      <ErrorDisplay error="Test error" onRetry={vi.fn()} showRetry={false} />,
      { wrapper }
    );

    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
    expect(screen.getByText("Back to Search")).toBeInTheDocument();
  });
});

describe("NetworkError", () => {
  it("should render network error message", () => {
    render(<NetworkError />, { wrapper });

    expect(
      screen.getByText(
        "Failed to fetch anime details. Please check your internet connection and try again."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Back to Search")).toBeInTheDocument();
  });

  it("should show retry button when onRetry is provided", () => {
    const mockRetry = vi.fn();
    render(<NetworkError onRetry={mockRetry} />, { wrapper });

    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  it("should not show retry button when onRetry is not provided", () => {
    render(<NetworkError />, { wrapper });

    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
  });
});

describe("NotFoundError", () => {
  it("should render 404 error with specific styling", () => {
    render(<NotFoundError />, { wrapper });

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Anime Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We couldn't find the anime you're looking for. It might have been removed or the ID is incorrect."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Back to Search")).toBeInTheDocument();
  });

  it("should have circular 404 badge", () => {
    render(<NotFoundError />, { wrapper });

    const badge = screen.getByText("404").parentElement;
    expect(badge).toHaveClass(
      "bg-slate-800",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center"
    );
  });
});

describe("RateLimitError", () => {
  it("should render rate limit error message", () => {
    render(<RateLimitError />, { wrapper });

    expect(
      screen.getByText(
        "The anime API is currently experiencing high traffic. Please wait a moment and try again."
      )
    ).toBeInTheDocument();
  });

  it("should call retry when provided", async () => {
    const mockRetry = vi.fn();
    const user = userEvent.setup();

    render(<RateLimitError onRetry={mockRetry} />, { wrapper });

    await user.click(screen.getByText("Try Again"));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});

describe("ServerError", () => {
  it("should render server error message", () => {
    render(<ServerError />, { wrapper });

    expect(
      screen.getByText(
        "The anime API is currently experiencing issues. Please try again later."
      )
    ).toBeInTheDocument();
  });
});

describe("GenericError", () => {
  it("should render generic error message", () => {
    render(<GenericError />, { wrapper });

    expect(
      screen.getByText(
        "An unexpected error occurred. Please try again or contact support if the problem persists."
      )
    ).toBeInTheDocument();
  });
});

describe("ErrorDisplay Navigation", () => {
  it("should have proper navigation link", () => {
    render(
      <MemoryRouter>
        <ErrorDisplay error="Test error" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Back to Search" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("should have proper link styling", () => {
    render(
      <MemoryRouter>
        <ErrorDisplay error="Test error" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Back to Search" });
    expect(link).toHaveClass(
      "bg-slate-700",
      "text-white",
      "rounded-lg",
      "hover:bg-slate-600"
    );
  });
});

describe("ErrorDisplay Accessibility", () => {
  it("should have proper semantic structure", () => {
    render(<ErrorDisplay error="Test error" />, { wrapper });

    // Check for proper heading structure
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should have proper button focus states", async () => {
    const mockRetry = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ErrorDisplay error="Test error" onRetry={mockRetry} showRetry />
      </MemoryRouter>
    );

    const retryButton = screen.getByRole("button", { name: "Try Again" });

    // Should be focusable
    retryButton.focus();
    expect(retryButton).toHaveFocus();

    // Should be keyboard clickable
    await user.keyboard("{Enter}");
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("should have proper link focus states", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ErrorDisplay error="Test error" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Back to Search" });

    // Should be focusable
    link.focus();
    expect(link).toHaveFocus();

    // Should be keyboard navigable
    await user.keyboard("{Enter}");
    // In a test environment, we can't test actual navigation
  });
});

describe("ErrorDisplay Icons", () => {
  it("should render warning icon", () => {
    render(<ErrorDisplay error="Test error" />, { wrapper });

    const icon = document.querySelector("svg.text-red-400");
    expect(icon).toBeInTheDocument();
  });

  it("should render back arrow icon in NotFoundError", () => {
    render(<NotFoundError />, { wrapper });

    const svg = document.querySelector("a svg");
    expect(svg).toBeInTheDocument();
  });
});
