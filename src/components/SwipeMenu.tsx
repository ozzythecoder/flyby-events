"use client";
import useSwipe from "@/hooks/useSwipe";
import { useState } from "react";
import { X, MenuIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

export default function SwipeMenu() {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  const swipeHandlers = useSwipe({
    onSwipeRight: () => setMenuOpen(true),
    onSwipeLeft: () => setMenuOpen(false),
    minSwipeDistance: 80,
  });

  return (
    <div
      {...swipeHandlers}
      className={`absolute drop-shadow-4xl h-[100vh] w-[15vw] `}
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
        className={`overflow-hidden bg-primary-200 h-[100vh] max-w-[400px] transition-[width] ${
          menuOpen ? "w-[60vw] sm:w-[40vw]" : "w-[0vw]"
        }`}
      >
        <ul className="flex flex-col gap-4 text-xl mx-16 my-16 text-primary-950 whitespace-nowrap">
          <li>thing 1</li>
          <li>thing 2</li>
          <li>thing 3</li>
          <li>thing 4</li>
          <li>
            <UserButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
