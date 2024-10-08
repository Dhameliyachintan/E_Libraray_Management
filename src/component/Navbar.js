import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./form/Authprovider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons"; 

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Successfully logged out!");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-black text-lg font-bold">EBookLibrary Management</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                  >
                    Browse
                    <FontAwesomeIcon icon={faSortDown} className="ml-1" /> 
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to="/trending"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Trending
                        </Link>
                        <Link
                          to="/classic"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Classic
                        </Link>
                        <Link
                          to="/subject"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Subject
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/bookForm"
                  className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                >
                  Book Form
                </Link>
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
