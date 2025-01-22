import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import LoginView from "@/auth/login";
import { showErrorToast } from "@/utils/toast";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/UserContext", () => ({
  useUser: jest.fn(),
}));

jest.mock("@/utils/toast", () => ({
  showErrorToast: jest.fn(),
}));

describe("LoginView", () => {
  // Reset mocks before each test
  const mockRouterPush = jest.fn();
  const mockLogin = jest.fn();
  const mockShowErrorToast = showErrorToast;
  const fireEvent = userEvent.setup();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useUser as jest.Mock).mockReturnValue({ login: mockLogin });
    jest.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(<LoginView />);

    const welcomeBackElements = screen.getAllByText(/welcome back/i);
    expect(welcomeBackElements.length).toBeGreaterThan(0);
    welcomeBackElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(screen.getByText(/please enter your details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<LoginView />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/username is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("calls login and navigates to dashboard on successful login", async () => {
    mockLogin.mockReturnValue(true); // Simulate successful login
    render(<LoginView />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await fireEvent.type(usernameInput, "testuser");
    await fireEvent.type(passwordInput, "password123");
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("testuser", "password123");
      expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows error toast on login failure", async () => {
    mockLogin.mockReturnValue(false); // Simulate login failure
    render(<LoginView />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await fireEvent.type(usernameInput, "wronguser");
    await fireEvent.type(passwordInput, "wrongpassword");
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("wronguser", "wrongpassword");
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        "Invalid username or password"
      );
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  it("toggles password visibility", async () => {
    render(<LoginView />);

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole("button", {
      name: /toggle pass visibility/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    await fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click to hide password
    await fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
