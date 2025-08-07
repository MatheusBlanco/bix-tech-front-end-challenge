import { ThemeProvider } from "@/providers/ThemeProvider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  Skeleton,
  SkeletonCard,
  SkeletonChart,
  SkeletonStats,
  SkeletonText,
  SkeletonTitle,
} from "../Skeleton";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("Skeleton Components", () => {
  describe("Skeleton", () => {
    it("renders with default props", () => {
      renderWithTheme(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    it("renders with custom width and height", () => {
      renderWithTheme(
        <Skeleton
          data-testid="skeleton"
          width="200px"
          height="50px"
          borderRadius="10px"
        />
      );
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe("SkeletonCard", () => {
    it("renders skeleton card", () => {
      renderWithTheme(<SkeletonCard data-testid="skeleton-card" />);
      const card = screen.getByTestId("skeleton-card");
      expect(card).toBeInTheDocument();
    });
  });

  describe("SkeletonChart", () => {
    it("renders skeleton chart", () => {
      renderWithTheme(<SkeletonChart data-testid="skeleton-chart" />);
      const chart = screen.getByTestId("skeleton-chart");
      expect(chart).toBeInTheDocument();
    });
  });

  describe("SkeletonText", () => {
    it("renders skeleton text with default props", () => {
      renderWithTheme(<SkeletonText data-testid="skeleton-text" />);
      const text = screen.getByTestId("skeleton-text");
      expect(text).toBeInTheDocument();
    });

    it("renders skeleton text with custom lines", () => {
      renderWithTheme(<SkeletonText data-testid="skeleton-text" lines={3} />);
      const text = screen.getByTestId("skeleton-text");
      expect(text).toBeInTheDocument();
    });
  });

  describe("SkeletonTitle", () => {
    it("renders skeleton title", () => {
      renderWithTheme(<SkeletonTitle data-testid="skeleton-title" />);
      const title = screen.getByTestId("skeleton-title");
      expect(title).toBeInTheDocument();
    });
  });

  describe("SkeletonStats", () => {
    it("renders skeleton stats", () => {
      renderWithTheme(<SkeletonStats data-testid="skeleton-stats" />);
      const stats = screen.getByTestId("skeleton-stats");
      expect(stats).toBeInTheDocument();
    });
  });
});
