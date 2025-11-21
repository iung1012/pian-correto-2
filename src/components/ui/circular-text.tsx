"use client";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "pause" | "speedUp" | "reverse";
  className?: string;
  radius?: number;
  fontSize?: number;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "pause",
  className,
  radius = 100,
  fontSize = 16,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(spinDuration);

  useEffect(() => {
    if (onHover === "speedUp" && isHovered) {
      setAnimationDuration(spinDuration / 3);
    } else if (onHover === "pause" && isHovered) {
      setAnimationDuration(0);
    } else if (onHover === "reverse" && isHovered) {
      setAnimationDuration(-spinDuration);
    } else {
      setAnimationDuration(spinDuration);
    }
  }, [isHovered, onHover, spinDuration]);

  const circumference = 2 * Math.PI * radius;
  const textLength = text.length;
  const letterSpacing = circumference / textLength;

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        ref={svgRef}
        width={radius * 2 + 40}
        height={radius * 2 + 40}
        viewBox={`0 0 ${radius * 2 + 40} ${radius * 2 + 40}`}
        className="overflow-visible"
      >
        <defs>
          <path
            id="circle-path"
            d={`M ${radius + 20} 20 A ${radius} ${radius} 0 1 1 ${radius + 19.9} 20`}
            fill="none"
          />
        </defs>
        
        <text
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="Montserrat, sans-serif"
          letterSpacing={letterSpacing / 10}
          className="fill-current"
        >
          <textPath
            href="#circle-path"
            startOffset="0%"
            className="tracking-wider"
          >
            <animate
              attributeName="startOffset"
              values="0%;100%"
              dur={`${Math.abs(animationDuration)}s`}
              repeatCount="indefinite"
              direction={animationDuration < 0 ? "reverse" : "normal"}
            />
            {text}
          </textPath>
        </text>
      </svg>
      
      {/* Center content area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularText;