import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "../index";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("@/providers/SnackbarProvider", () => ({
  useSnackbar: () => ({
    showSnackbar: jest.fn(),
  }),
}));

jest.mock("@/lib/api", () => ({
  api: {
    post: jest.fn(() =>
      Promise.resolve({
        data: { data: { token: "fake-token" } },
      })
    ),
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

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

  it("submits the form and redirects", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });
});
