"use client";
import dayjs from "dayjs";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface User {
  username: string;
  name: string;
  isAdmin: boolean;
  password: string;
  dateOfJoin?: string;
}

interface UserContextProps {
  user: User | null;
  users: User[];
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (user: User) => boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // Store registered users (can be fetched from API or localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // On initial load, check if user data is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user if found in localStorage
      setIsLoggedIn(true);
    }
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers)); // Load users from localStorage
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    let foundUser;

    // Check if it's the admin user
    if (username === "admin" && password === "admin") {
      foundUser = {
        username: "admin",
        name: "Admin User",
        isAdmin: true,
        password: "admin",
      };
    } else {
      // Check among regular users
      foundUser = users.find(
        (u) => u.username === username && u.password === password
      );
    }

    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(foundUser)); // Store user data in localStorage
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  const register = (newUser: User): boolean => {
    // Check if the username exists or is "admin"
    if (
      users.some((u) => u.username === newUser.username) ||
      newUser.username.toLowerCase() === "admin"
    ) {
      return false; // Can't create user or admin username is reserved
    }

    // Get the current date formatted as "DD/MM/YYYY"
    const currentDate = dayjs().format("DD/MM/YYYY");

    // Create the user object with the dateOfJoin field
    const userWithDateOfJoin: User = {
      ...newUser,
      dateOfJoin: currentDate,
    };

    // Register the user
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, userWithDateOfJoin];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Store updated users in localStorage
      return updatedUsers;
    });

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(newUser)); // Store user data in localStorage
    return true;
  };

  return (
    <UserContext.Provider
      value={{ user, users, isLoggedIn, login, logout, register }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
