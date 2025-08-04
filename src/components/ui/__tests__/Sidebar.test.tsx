import { render, screen } from "@testing-library/react";
import { Sidebar, SidebarItem } from "../Sidebar";

describe("Sidebar", () => {
  it("renders Sidebar and SidebarItem", () => {
    render(
      <Sidebar>
        <SidebarItem>
          <span>Test Item</span>
        </SidebarItem>
      </Sidebar>
    );
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });
});
