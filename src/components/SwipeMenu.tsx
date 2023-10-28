"use client";
import useSwipe from "@/hooks/useSwipe";
import { useState } from "react";
import { X, MenuIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

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
      className={`absolute drop-shadow-4xl z-10 h-[100vh] w-[100vw]`}
    >
      <button
        className="fixed m-8 h-8 w-fit bg-transparent text-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X className="text-primary-800" />
        ) : (
          <MenuIcon className="text-primary-800" />
        )}
      </button>
      <div
        className={`overflow-hidden bg-black h-[100vh] transition-[width] ${
          menuOpen ? "w-[40vw] min-w-[300px]" : "w-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-xl mx-16 my-16 text-primary-800 whitespace-nowrap">
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
