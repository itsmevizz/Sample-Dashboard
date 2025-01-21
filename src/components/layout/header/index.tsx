"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AppHeader = () => {
  const { user, logout } = useUser();
  const router = useRouter(); // Initialize useRouter
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push("/login"); // Redirect to the login page after logout
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="h-[56px]  min-w-full bg-[#FFFFFF] items-center container flex justify-between">
        <div className="flex gap-10">
          <div className="">
            <img className="h-[34px] w-[77px] " src="/assets/logo-main.png" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="font-geist-medium text-base text-text-primary">
              <Link href={"/dashboard"}>Dashboard</Link>
            </div>
          </div>
        </div>

        {/* User Profile and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-fit h-fut bg-primary-main bg-opacity-50 rounded-[50px] flex items-center pl-1 pt-1 pb-1 pr-3 gap-3 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img
              className="h-[32px] rounded-full w-[32px] "
              src="/assets/user_1.png"
            />
            <span className="text-text-primary text-sm font-geist-medium">
              {user?.username}
            </span>
          </div>
          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute z-10 right-10 w-[150px] bg-white border rounded-lg shadow-md">
              <button
                className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-secondary-main rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
