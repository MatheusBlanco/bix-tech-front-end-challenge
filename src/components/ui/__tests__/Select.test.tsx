import { ThemeProvider } from "@/providers/ThemeProvider";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Option, SelectUI } from "../Select";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

const mockOptions: Option[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("SelectUI", () => {
  it("renders with label", () => {
    renderWithTheme(
      <SelectUI
        label="Test Label"
        options={mockOptions}
        value=""
        onChange={jest.fn()}
      />
    );

    expect(screen.getAllByText("Test Label")).toHaveLength(2);
  });

  it("renders without label", () => {
    renderWithTheme(
      <SelectUI options={mockOptions} value="" onChange={jest.fn()} />
    );

    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
  });

  it("renders all options", () => {
    renderWithTheme(
      <SelectUI
        label="Test Label"
        options={mockOptions}
        value=""
        onChange={jest.fn()}
      />
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("calls onChange when option is selected", () => {
    const mockOnChange = jest.fn();
    renderWithTheme(
      <SelectUI
        label="Test Label"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Option 1"));

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("displays selected value", () => {
    renderWithTheme(
      <SelectUI
        label="Test Label"
        options={mockOptions}
        value="option2"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("handles empty options array", () => {
    renderWithTheme(
      <SelectUI label="Test Label" options={[]} value="" onChange={jest.fn()} />
    );

    expect(screen.getAllByText("Test Label")).toHaveLength(2);
  });
});
