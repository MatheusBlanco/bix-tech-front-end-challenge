import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { DrawerEntry, ResponsiveDrawer } from "../ResponsiveDrawer";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockUseMediaQuery = require("@mui/material").useMediaQuery;

const mockEntries: DrawerEntry[] = [
  {
    icon: <span data-testid="icon-1">🏠</span>,
    name: "Home",
    action: jest.fn(),
  },
  {
    icon: <span data-testid="icon-2">📊</span>,
    name: "Dashboard",
    action: jest.fn(),
  },
];

describe("ResponsiveDrawer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default title", () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(<ResponsiveDrawer entries={mockEntries} />);

    expect(
      screen.getByRole("heading", { name: "Dashboard" })
    ).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(<ResponsiveDrawer entries={mockEntries} title="Custom Title" />);

    expect(
      screen.getByRole("heading", { name: "Custom Title" })
    ).toBeInTheDocument();
  });

  it("renders all drawer entries", () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(<ResponsiveDrawer entries={mockEntries} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getAllByText("Dashboard")).toHaveLength(2);
    expect(screen.getByTestId("icon-1")).toBeInTheDocument();
    expect(screen.getByTestId("icon-2")).toBeInTheDocument();
  });

  it("calls entry action when clicked", () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(<ResponsiveDrawer entries={mockEntries} />);

    fireEvent.click(screen.getByText("Home"));
    expect(mockEntries[0].action).toHaveBeenCalled();
  });

  it("shows hamburger menu on mobile", () => {
    mockUseMediaQuery.mockReturnValue(false);
    render(<ResponsiveDrawer entries={mockEntries} />);

    expect(screen.getByLabelText("open drawer")).toBeInTheDocument();
  });

  it("hides hamburger menu on desktop", () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(<ResponsiveDrawer entries={mockEntries} />);

    expect(screen.queryByLabelText("open drawer")).not.toBeInTheDocument();
  });

  it("toggles drawer on mobile when hamburger is clicked", () => {
    mockUseMediaQuery.mockReturnValue(false);
    render(<ResponsiveDrawer entries={mockEntries} />);

    const hamburgerButton = screen.getByLabelText("open drawer");
    fireEvent.click(hamburgerButton);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
