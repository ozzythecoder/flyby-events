"use client";
import Link from "next/link";
import useSwipe from "@/lib/hooks/useSwipe";
import { useState } from "react";
import { X, MenuIcon, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { links } from "@/lib/navigation";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function SideNav() {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  const { user } = useUser();

  const swipeHandlers = useSwipe({
    onSwipeRight: () => setMenuOpen(true),
    onSwipeLeft: () => setMenuOpen(false),
    minSwipeDistance: 80,
  });

  const eventProps = {
    onFocus: () => setMenuOpen(true),
    onBlur: () => setMenuOpen(false),
  };

  return (
    <div
      {...swipeHandlers}
      className={`z-20 absolute drop-shadow-4xl h-[100vh] w-[15vw]`}
    >
      <button
        className="fixed m-8 h-8 w-fit bg-transparent text-center z-20"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
        ) : (
          <MenuIcon className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
        )}
      </button>
      <div
        className={`overflow-hidden bg-primary-200 max-w-[400px] m-2 rounded-md transition-[width] w-[60vw] sm:w-[40vw] ${
          menuOpen ? "translate-x-0" : "-translate-x-[100dvw]"
        }`}
      >
        <nav className="font-body text-xl m-16">
          <ul
            className={`flex flex-col gap-4 text-primary-950 overflow-x-hidden sm:whitespace-nowrap`}
          >
            {links.map((link) => (
              <li
                key={link.name}
                className="hover:underline hover:text-primary-950 "
              >
                <Link
                  className="focus:underline focus:text-primary-950"
                  target={link.target}
                  rel="noopener noreferrer"
                  href={link.url}
                  {...eventProps}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-row justify-evenly mt-8 w-full">
            <li>
              {user ? (
                <Link
                  className="group"
                  aria-label="User Profile"
                  href="/user-profile"
                  {...eventProps}
                >
                  <img
                    className="transition-all group-hover:scale-125 rounded-full h-6"
                    src={user.imageUrl}
                  />
                </Link>
              ) : (
                <SignInButton>
                  <button
                    className="group"
                    aria-label="Sign In"
                    type="button"
                    {...eventProps}
                  >
                    <User className="font-body text-primary-800 transition-all group-hover:text-primary-950 group-hover:scale-125 group-hover:cursor-pointer" />
                  </button>
                </SignInButton>
              )}
            </li>
            <li>
              <ThemeToggle {...eventProps} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
