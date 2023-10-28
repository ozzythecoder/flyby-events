"use client";
import useSwipe from "@/hooks/useSwipe";
import { useState } from "react";

export default function SwipeMenu() {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  const swipeHandlers = useSwipe({
    onSwipeRight: () => setMenuOpen(true),
    onSwipeLeft: () => setMenuOpen(false),
  });

  return (
    <div
      {...swipeHandlers}
      className={`h-40 w-40  ${menuOpen ? "bg-black" : "bg-white"}`}
    ></div>
  );
}
