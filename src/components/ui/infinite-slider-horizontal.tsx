"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function InfiniteSlider({
  children,
  direction = "horizontal",
  reverse = false,
  pauseOnHover = true,
  className,
  speed = "normal",
}: InfiniteSliderProps) {
  const speedMap = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  const animationDuration = speedMap[speed];

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        direction === "horizontal" ? "w-full" : "h-full",
        className
      )}
    >
      <div
        className={cn(
          "flex",
          direction === "horizontal" ? "animate-scroll-horizontal gap-0" : "animate-scroll-vertical gap-0",
          reverse && "reverse",
          pauseOnHover && "hover:pause"
        )}
        style={{
          animationDuration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {/* First set of items */}
        <div className={cn("flex", direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-4", "flex-shrink-0")}>
          {children}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className={cn("flex", direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-4", "flex-shrink-0")}>
          {children}
        </div>
      </div>
    </div>
  );
}