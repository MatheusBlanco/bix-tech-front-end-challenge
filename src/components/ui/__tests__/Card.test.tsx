import { render, screen } from "@testing-library/react";
import { Card, CardTitle, CardValue } from "../Card";

describe("Card", () => {
  it("renders Card with children", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("renders CardTitle and CardValue", () => {
    render(
      <>
        <CardTitle>Title</CardTitle>
        <CardValue>Value</CardValue>
      </>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });
});
