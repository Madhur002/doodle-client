"use client";

import React, { useState } from "react";
import { ModeToggle } from "./theme-toggle";
import { Separator } from "./ui/separator";
import {
  FaHome,
  FaHashtag,
  FaBell,
  FaEnvelope,
  FaPen,
  FaBookmark,
  FaTwitter,
} from "react-icons/fa";

import { useAuth } from "@/context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { UserProfile } from "./UserProfile";

const Navbar = () => {
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`lg:px-24 md:px-5 px-0 flex transition-all duration-300 ease-in-out justify-between items-center h-16 bg-white/30 dark:bg-black/30 w-full fixed top-0 left-0 z-50 backdrop-filter backdrop-blur-lg shadow-md dark:shadow-sm shadow-gray-100 dark:shadow-black `}
        role="navigation"
      >
        <div className="flex md:order-1 md:items-center order-2 ">
          <a
            href="/"
            className="md:px-5 px-20 text-2xl dark:text-white text-black "
          >
            Doodle
          </a>
          <div className="flex-grow dark:text-gray-400 ml-10 hidden md:flex justify-center items-center md:gap-4">
            <a
              href="/"
              className="flex dark:hover:text-white hover:text-black text-[#818183]"
            >
              <span className="flex md:items-center">
                <FaHome className="mr-2" />
              </span>
              Home
            </a>
            <a
              href="/explore"
              className="flex dark:hover:text-white hover:text-black text-[#818183]"
            >
              <span className="flex md:items-center">
                <FaHashtag className="mr-2" />
              </span>
              Explore
            </a>
            <a
              href="/notifications"
              className="flex dark:hover:text-white hover:text-black text-[#818183]"
            >
              <span className="flex md:items-center">
                <FaBell className="mr-2" />
              </span>
              Notifications
            </a>
            <a
              href="/bookmark"
              className="flex dark:hover:text-white hover:text-black text-[#818183]"
            >
              <span className="flex md:items-center">
                <FaBookmark className="mr-2" />
              </span>
              Bookmarks
            </a>
          </div>
        </div>
        <div className="flex md:order-4 md:items-center order-1">
          {session ? (
            <span className="hidden md:block mr-2 mt-1">
              <UserProfile />
            </span>
          ) : (
            <>
              <a
                href="/login"
                className="hidden md:block p-4 md:p-2 dark:text-gray-400 dark:hover:text-white hover:text-black text-[#4e4e4f]"
              >
                Login
              </a>
              <a
                href="/signup"
                className="hidden md:block p-4 md:p-2 mr-4 dark:text-gray-400 dark:hover:text-white hover:text-black text-[#4e4e4f]"
              >
                Sign Up
              </a>
            </>
          )}
          <Separator
            className="h-7 dark:bg-white bg-black md:block hidden"
            orientation="vertical"
          />
          <a href="https://x.com/chetan7764" className="ml-5 hidden md:block ">
            <FaTwitter className=" text-3xl" />
          </a>

          <div className="p-4 hidden md:block">
            <ModeToggle />
          </div>
        </div>
        <div className="cursor-pointer md:hidden px-5 space-x-4">
          <button
            className="border-2 border-transparent rounded-lg text-black dark:text-white focus:outline-none"
            onClick={handleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="order-3 bg-black mx-5 border-2 border-transparent md:hidden rounded-lg text-black dark:text-white focus:outline-none">
          <ModeToggle />
        </div>
      </nav>
      <div
        className={`md:hidden fixed z-50 top-0 left-0 h-full w-3/4 bg-black/90 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out backdrop-filter backdrop-blur-sm shadow-lg`}
      >
        <div className="p-6 h-full">
          <button
            className="mb-6 border-2 border-transparent rounded-lg text-white focus:outline-none"
            onClick={handleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="flex flex-col h-[90%] justify-between">
            <div className="space-y-4">
              <a
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-lg font-medium dark:hover:text-white hover:text-black text-[#818183] hover:bg-gray-900 hover:rounded-2xl"
              >
                <FaHome className="mr-3" />
                Home
              </a>
              <a
                href="/explore"
                className="flex items-center px-3 py-2 rounded-md text-lg font-medium dark:hover:text-white hover:text-black text-[#818183] hover:bg-gray-900 hover:rounded-2xl"
              >
                <FaHashtag className="mr-3" />
                Explore
              </a>
              <a
                href="/notifications"
                className="flex items-center px-3 py-2 rounded-md text-lg font-medium dark:hover:text-white hover:text-black text-[#818183] hover:bg-gray-900 hover:rounded-2xl"
              >
                <FaBell className="mr-3" />
                Notifications
              </a>
              <a
                href="/contact"
                className="flex items-center px-3 py-2 rounded-md text-lg font-medium dark:hover:text-white hover:text-black text-[#818183] hover:bg-gray-900 hover:rounded-2xl"
              >
                <FaEnvelope className="mr-3" />
                Contact
              </a>
            </div>
            <div className="space-y-4">
              <Separator className="w-full" />
              {session ? (
                <span className="block md:hidden mr-2 mt-1">
                <UserProfile />
              </span>
              ) : (
                <>
                <a
                href="/login"
                className="flex items-center px-3 py-2 rounded-md text-lg font-medium dark:hover:text-white hover:text-black text-[#818183] hover:bg-gray-900 hover:rounded-2xl"
              >
                <FaEnvelope className="mr-3" />
                Login
              </a>
              <a
                href="/signup"
                className="flex items-center px-3 py-2 rounded-md text-lg font-medium dark:hover:text-white hover:text-black text-[#818183] hover:bg-gray-900 hover:rounded-2xl"
              >
                <FaEnvelope className="mr-3" />
                Sign Up
              </a>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
