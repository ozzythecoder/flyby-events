"use client";
import useSwipe from "@/hooks/useSwipe";
import { useState } from "react";
import { X, MenuIcon, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
import { links } from "@/lib/navigation";

export default function SwipeMenu() {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  const swipeHandlers = useSwipe({
    onSwipeRight: () => setMenuOpen(true),
    onSwipeLeft: () => setMenuOpen(false),
    minSwipeDistance: 80,
  });

  const eventProps = {
    onBlur: () => setMenuOpen(false),
    onFocus: () => setMenuOpen(true),
  };

  return (
    <div
      {...swipeHandlers}
      className={`absolute drop-shadow-4xl h-[100vh] w-[15vw]`}
    >
      <button
        className="fixed m-8 h-8 w-fit bg-transparent text-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
        ) : (
          <MenuIcon className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
        )}
      </button>
      <div
        className={`overflow-hidden bg-primary-200 max-w-[400px] m-2 rounded-md transition-[width] ${
          menuOpen ? "w-[60vw] sm:w-[40vw]" : "w-[0vw]"
        }`}
      >
        <nav className="font-body text-xl m-16">
          <ul
            className={`flex flex-col gap-4 text-primary-950 overflow-x-hidden sm:whitespace-nowrap`}
          >
            {links.map((link) => (
              <li
                key={link.name}
                className="hover:underline hover:text-primary-950"
              >
                <a
                  target={link.target}
                  rel="noopener noreferrer"
                  href={link.url}
                  {...eventProps}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-row justify-evenly mt-8 w-full">
            <li>
              {/*
                TODO: Figure out onFocus and onBlur for UserButton
              */}
              {/* <UserButton /> */}
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
