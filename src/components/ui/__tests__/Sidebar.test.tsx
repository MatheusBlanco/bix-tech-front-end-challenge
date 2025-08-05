import { Home, Logout } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { muiTheme } from "../../../styles/theme";
import { DrawerEntry, ResponsiveDrawer } from "../ResponsiveDrawer";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

const mockEntries: DrawerEntry[] = [
  { icon: <Home />, name: "Home", action: jest.fn() },
  { icon: <Logout />, name: "Logout", action: jest.fn() },
];

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={muiTheme}>{component}</ThemeProvider>);
};

describe("ResponsiveDrawer", () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(true);
  });

  it("renders drawer with title and menu items", () => {
    renderWithTheme(
      <ResponsiveDrawer entries={mockEntries} title="Test Dashboard" />
    );

    expect(screen.getByText("Test Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls action when menu item is clicked", () => {
    renderWithTheme(
      <ResponsiveDrawer entries={mockEntries} title="Test Dashboard" />
    );

    const homeItem = screen.getByText("Home");
    fireEvent.click(homeItem);

    expect(mockEntries[0].action).toHaveBeenCalled();
  });

  it("uses default title when none provided", () => {
    renderWithTheme(<ResponsiveDrawer entries={mockEntries} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
