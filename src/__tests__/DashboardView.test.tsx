import { render, screen } from "@testing-library/react";
import UserNameSection from "@/components/dashboard/user";
import { useUser } from "@/context/UserContext";
import * as utils from "@/utils/getGreeting";

// Mock the `useUser` hook to return the correct context values
jest.mock("@/context/UserContext", () => ({
  useUser: jest.fn(),
}));

// Mock the getGreeting function
jest.mock("@/utils/getGreeting", () => ({
  ...jest.requireActual("@/utils/getGreeting"),
  getGreeting: jest.fn(),
}));

describe("UserNameSection", () => {
  it("renders a greeting message with user name when logged in", () => {
    // Mock getGreeting to return "Good Morning"
    (utils.getGreeting as jest.Mock).mockReturnValue("Good Morning");

    (useUser as jest.Mock).mockReturnValue({
      user: {
        name: "vishnu",
        isAdmin: false,
        username: "vizz",
        password: "password",
      },
      users: [],
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    });

    render(<UserNameSection />);

    // Check if the greeting message is displayed
    expect(screen.getByText(/Good Morning, Vishnu/i)).toBeInTheDocument();
  });

  it('renders "No data to display" when user is admin and there are no users', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        name: "Admin",
        isAdmin: true,
        username: "admin",
        password: "admin",
      },
      users: [],
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    });

    render(<UserNameSection />);

    // Check if "No data to display" message is rendered
    expect(screen.getByText("No data to display")).toBeInTheDocument();
  });

  it("renders a list of users when user is admin", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        name: "Admin",
        isAdmin: true,
        username: "admin",
        password: "admin",
      },
      users: [
        {
          name: "User 1",
          dateOfJoin: "2025-01-01",
          username: "123",
        },
        {
          name: "User 2",
          dateOfJoin: "2025-01-01",
          username: "321",
        },
      ],
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    });

    render(<UserNameSection />);

    // Check if the user names are rendered as SmallCard components
    expect(screen.getAllByText("User 1")).toHaveLength(1);
    expect(screen.getAllByText("User 2")).toHaveLength(1);
    expect(screen.getAllByText("Date Of Join: 2025-01-01")).toHaveLength(2);
    expect(screen.getAllByText("User ID: 321")).toHaveLength(1);
    expect(screen.getAllByText("User ID: 123")).toHaveLength(1);
  });

  it("does not render users if user is not admin", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        name: "John Doe",
        isAdmin: false,
        username: "john",
        password: "password",
      },
      users: [
        {
          name: "User 1",
          dateOfJoin: "2021-01-01",
          username: "user1",
          password: "password",
        },
        {
          name: "User 2",
          dateOfJoin: "2022-01-01",
          username: "user2",
          password: "password",
        },
      ],
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    });

    render(<UserNameSection />);

    // Check if no users are rendered
    expect(screen.queryByText("SmallCard")).toBeNull();
  });
});
