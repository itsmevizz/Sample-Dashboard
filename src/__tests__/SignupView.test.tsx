import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import SignupView from "@/auth/signup";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/UserContext", () => ({
  useUser: jest.fn(),
}));

jest.mock("@/utils/toast", () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn(),
}));

describe("SignupView", () => {
  const mockRouterPush = jest.fn();
  const mockSignup = jest.fn();
  const mockShowErrorToast = showErrorToast;
  const mockShowSuccessToast = showSuccessToast;
  const fireEvent = userEvent.setup();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useUser as jest.Mock).mockReturnValue({ register: mockSignup });
    jest.clearAllMocks();
  });

  it("renders the signup form correctly", () => {
    render(<SignupView />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<SignupView />);

    const submitButton = screen.getByRole("button", { name: /signup/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Confirm Password is required")
    ).toBeInTheDocument();
  });

  it("calls Signup and navigates to dashboard on successful Signup", async () => {
    mockSignup.mockReturnValue(true); // Simulate successful signup
    render(<SignupView />);

    const nameInput = screen.getByLabelText("Name");
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /signup/i });

    await fireEvent.type(nameInput, "test");
    await fireEvent.type(usernameInput, "testuser");
    await fireEvent.type(passwordInput, "password123");
    await fireEvent.type(confirmPasswordInput, "password123");
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        isAdmin: false,
        name: "test",
        password: "password123",
        username: "testuser",
      });
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        "Registration successful!"
      );
      expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows error toast on Signup failure", async () => {
    mockSignup.mockReturnValue(false); // Simulate signup failure
    render(<SignupView />);

    const nameInput = screen.getByLabelText("Name");
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /signup/i });

    await fireEvent.type(nameInput, "test1");
    await fireEvent.type(usernameInput, "testuser1");
    await fireEvent.type(passwordInput, "password123");
    await fireEvent.type(confirmPasswordInput, "password123");
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        isAdmin: false,
        name: "test1",
        password: "password123",
        username: "testuser1",
      });
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        "Registration failed. User may already exist."
      );
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  it("toggles password visibility", async () => {
    render(<SignupView />);

    const passwordInput = screen.getByLabelText("Confirm Password");
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
