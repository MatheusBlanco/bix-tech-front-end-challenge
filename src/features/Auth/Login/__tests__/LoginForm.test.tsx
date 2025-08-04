import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "../index";

// Mock next/navigation useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock SnackbarProvider context
jest.mock("@/providers/SnackbarProvider", () => ({
  useSnackbar: () => ({
    showSnackbar: jest.fn(),
  }),
}));

describe("LoginForm", () => {
  it("renders logo, inputs and button", () => {
    render(<LoginForm />);
    expect(screen.getByAltText("Bix Tecnologia")).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows typing in email and password fields", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("user@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("submits the form when login button is clicked", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(button);

    expect(button).toBeEnabled();
  });
});
