import { render, screen } from "@testing-library/react";
import { Logo } from "../index";

describe("Logo", () => {
  it("renders with correct src and alt", () => {
    render(<Logo src="logo.png" alt="Logo" />);
    const img = screen.getByAltText("Logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "logo.png");
  });
});
