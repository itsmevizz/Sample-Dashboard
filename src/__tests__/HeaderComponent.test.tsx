import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/layout/header";

// Mocking `useUser` context and `useRouter` hook
jest.mock("@/context/UserContext", () => ({
  useUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AppHeader", () => {
  const mockLogout = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      user: { username: "TestUser" },
      logout: mockLogout,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders header correctly", () => {
    render(<AppHeader />);

    // Check if the logo is rendered
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

    // Check if the username is displayed
    expect(screen.getByText("TestUser")).toBeInTheDocument();
  });

  test("toggles the dropdown menu", () => {
    render(<AppHeader />);

    const profileIcon = screen.getByText("TestUser").parentElement;

    // Open the dropdown menu
    fireEvent.click(profileIcon!);
    expect(screen.getByText("Logout")).toBeInTheDocument();

    fireEvent.click(profileIcon!);
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("handles logout functionality", async () => {
    render(<AppHeader />);

    // Open the dropdown menu
    fireEvent.click(screen.getByText("TestUser").parentElement!);

    const logoutButton = screen.getByText("Logout");

    // Simulate logout click
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/login"));
  });

  test("toggles the burger menu on mobile", async () => {
    global.innerWidth = 500;
    global.innerHeight = 800;
    global.dispatchEvent(new Event("resize"));
    render(<AppHeader />);

    const burgerButton = screen.getByRole("button");

    // Open the burger menu
    fireEvent.click(burgerButton);

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(burgerButton);

    // Check if the mobile menu is closed
    await waitFor(() => {
      expect(screen.queryByText("Logout")).not.toBeInTheDocument();
    });
  });
});
