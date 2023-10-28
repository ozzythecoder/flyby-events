"use client";
import { TouchEvent, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SwipeInput {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export default function useSwipe(input: SwipeInput): SwipeOutput {
  const [touchStart, setTouchStart] = useState<Position>({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState<Position>({ x: 0, y: 0 });

  const minSwipeDistance = 10;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd({ x: 0, y: 0 });
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const xDistance = touchStart.x - touchEnd.x;
    const yDistance = touchStart.y - touchEnd.y;

    const isHorizontalSwipe = Math.abs(xDistance) > Math.abs(yDistance);
    const isVerticalSwipe = Math.abs(yDistance) > Math.abs(xDistance);

    if (isHorizontalSwipe) {
      const isLeftSwipe = xDistance > minSwipeDistance;
      const isRightSwipe = xDistance < -minSwipeDistance;

      if (isLeftSwipe && input.onSwipeLeft) {
        input.onSwipeLeft();
      } else if (isRightSwipe && input.onSwipeRight) {
        input.onSwipeRight();
      }
    } else if (isVerticalSwipe) {
      const isUpSwipe = yDistance > minSwipeDistance;
      const isDownSwipe = yDistance < -minSwipeDistance;

      if (isUpSwipe && input.onSwipeUp) {
        input.onSwipeUp();
      } else if (isDownSwipe && input.onSwipeDown) {
        input.onSwipeDown();
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}