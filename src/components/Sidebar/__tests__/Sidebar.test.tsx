import { render, screen } from "@testing-library/react";
import SidebarC from "../index";

describe("SidebarC", () => {
  it("renders Home and Logout items", () => {
    render(<SidebarC />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
