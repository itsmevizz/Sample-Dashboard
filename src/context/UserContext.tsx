"use client";
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
}

interface UserContextProps {
  user: User | null;
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

  // On initial load, check if user data is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user if found in localStorage
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
      localStorage.setItem("user", JSON.stringify(foundUser)); // Store user data in localStorage
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
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

    // Register the user
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Store updated users in localStorage
      return updatedUsers;
    });

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // Store user data in localStorage
    return true;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
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
