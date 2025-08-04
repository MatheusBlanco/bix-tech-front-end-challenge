import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
  it("renders with label and value", () => {
    render(<Input label="Email" value="test" onChange={() => {}} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveValue("test");
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<Input label="Email" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "abc" },
    });
    expect(handleChange).toHaveBeenCalled();
  });
});
