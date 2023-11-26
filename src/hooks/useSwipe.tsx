"use client";
import { TouchEvent, useState } from "react";

const LOCAL_DEBUG = false;

interface Position {
  x: number;
  y: number;
}

interface SwipeInput {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance: number;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export default function useSwipe(input: SwipeInput): SwipeOutput {
  const [touchStart, setTouchStart] = useState<Position>({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState<Position>({ x: 0, y: 0 });

  const MIN_SWIPE_DISTANCE = input.minSwipeDistance;

  const onTouchStart = (e: TouchEvent) => {
    // setTouchEnd({ x: 0, y: 0 });
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

    if (LOCAL_DEBUG) {
      console.log("touchStart: ", touchStart.x + "," + touchStart.y);
      console.log("touchEnd: ", touchEnd.x + "," + touchEnd.y);
      console.log("xDistance: ", xDistance);
      console.log("yDistance: ", yDistance);
    }

    const isHorizontalSwipe = Math.abs(xDistance) > Math.abs(yDistance);
    const isVerticalSwipe = Math.abs(yDistance) > Math.abs(xDistance);

    if (isHorizontalSwipe) {
      const isLeftSwipe = xDistance > MIN_SWIPE_DISTANCE;
      const isRightSwipe = xDistance < -MIN_SWIPE_DISTANCE;

      if (isLeftSwipe && input.onSwipeLeft) {
        input.onSwipeLeft();
        if (LOCAL_DEBUG) console.log("swipe left");
      } else if (isRightSwipe && input.onSwipeRight) {
        input.onSwipeRight();
        if (LOCAL_DEBUG) console.log("swipe right");
      }
    } else if (isVerticalSwipe) {
      const isUpSwipe = yDistance > MIN_SWIPE_DISTANCE;
      const isDownSwipe = yDistance < -MIN_SWIPE_DISTANCE;

      if (isUpSwipe && input.onSwipeUp) {
        input.onSwipeUp();
        if (LOCAL_DEBUG) console.log("swipe up");
      } else if (isDownSwipe && input.onSwipeDown) {
        input.onSwipeDown();
        if (LOCAL_DEBUG) console.log("swipe down");
      }
    }

    setTouchEnd({ x: 0, y: 0 });
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
