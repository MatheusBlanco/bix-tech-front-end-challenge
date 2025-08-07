import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider, useSnackbar } from "../SnackbarProvider";

const TestComponent = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <div>
      <button
        onClick={() => showSnackbar("Test message")}
        data-testid="show-success"
      >
        Show Success
      </button>
      <button
        onClick={() => showSnackbar("Error message", "error")}
        data-testid="show-error"
      >
        Show Error
      </button>
      <button
        onClick={() => showSnackbar("Info message", "info")}
        data-testid="show-info"
      >
        Show Info
      </button>
      <button
        onClick={() => showSnackbar("Warning message", "warning")}
        data-testid="show-warning"
      >
        Show Warning
      </button>
    </div>
  );
};

describe("SnackbarProvider", () => {
  it("renders children", () => {
    render(
      <SnackbarProvider>
        <div data-testid="test-child">Test Content</div>
      </SnackbarProvider>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("shows snackbar with success message", async () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByTestId("show-success"));

    await waitFor(() => {
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });
  });

  it("shows snackbar with error message", async () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByTestId("show-error"));

    await waitFor(() => {
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });
  });

  it("shows snackbar with info message", async () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByTestId("show-info"));

    await waitFor(() => {
      expect(screen.getByText("Info message")).toBeInTheDocument();
    });
  });

  it("shows snackbar with warning message", async () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByTestId("show-warning"));

    await waitFor(() => {
      expect(screen.getByText("Warning message")).toBeInTheDocument();
    });
  });

  it("closes snackbar when close button is clicked", async () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByTestId("show-success"));

    await waitFor(() => {
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });
  });

  it("auto-hides snackbar after 3 seconds", async () => {
    jest.useFakeTimers();

    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByTestId("show-success"));

    await waitFor(() => {
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});

describe("useSnackbar hook", () => {
  it("throws error when used outside provider", () => {
    const TestComponentWithoutProvider = () => {
      const { showSnackbar } = useSnackbar();
      return <button onClick={() => showSnackbar("test")}>Test</button>;
    };

    expect(() => {
      render(<TestComponentWithoutProvider />);
    }).toThrow("useSnackbar must be used within a SnackbarProvider");
  });
});
