import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("renders username input", () => {
  render(<LoginForm onAuth={() => undefined} />);
  const usernameInput = screen.getByRole("textbox", { name: "Użytkownik" });
  expect(usernameInput).toBeInTheDocument();
});

test("renders password input", () => {
  render(<LoginForm onAuth={() => undefined} />);
  const passwordInput = screen.getByLabelText("Hasło");
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("renders login button", () => {
  render(<LoginForm onAuth={() => undefined} />);
  const loginButton = screen.getByRole("button", { name: "Zaloguj" });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toHaveAttribute("type", "submit");
});
