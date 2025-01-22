"use client";
import { useUser } from "@/context/UserContext";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const AppHeader = () => {
  const { user, logout } = useUser();
  const router = useRouter(); // Initialize useRouter
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push("/login"); // Redirect to the login page after logout
  };

  // Close logout dropdown on outside click
  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  // Close mob dropdown on outside click
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  return (
    <div>
      <div className="h-[56px]  min-w-full bg-[#FFFFFF] items-center container flex justify-between">
        <div className="flex gap-10">
          <div className="">
            <img
              alt="logo"
              className="h-[34px] w-[77px] "
              src="/assets/logo-main.png"
            />
          </div>
        </div>

        {/* User Profile and Dropdown */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <div
            className="w-fit h-full bg-primary-main bg-opacity-50 rounded-[50px] flex items-center pl-1 pt-1 pb-1 pr-3 gap-3 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img
              className="h-[32px] rounded-full w-[32px] "
              src="/assets/user_1.png"
            />
            <span className="text-text-primary capitalize text-sm font-geist-medium">
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

        {/* Burger Menu (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-primary-main focus:outline-none focus:ring-1 focus:ring-white "
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav ref={menuRef} className="md:hidden flex justify-center">
          <div className="bg-white text-black rounded-xl font-geist-bold shadow-md absolute top-14 w-[95%]">
            <ul className="w-full h-full  p-3  cursor-pointer border-b">
              <li className="flex items-center gap-3">
                <img
                  className="h-[32px] rounded-full w-[32px] "
                  src="/assets/user_1.png"
                />
                <span className="text-text-primary text-sm font-geist-medium capitalize">
                  {user?.username}
                </span>
              </li>
            </ul>
            <ul onClick={handleLogout} className="font-geist-medium p-3 mx-11 ">
              <li className="hover:text-primary-main duration-300 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppHeader;
