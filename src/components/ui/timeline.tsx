"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Handle scroll to update current index and progress line
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 384; // w-96 = 384px
    const newIndex = Math.round(scrollLeft / itemWidth);
    setCurrentIndex(Math.min(newIndex, data.length - 1));
    setScrollPosition(scrollLeft);
  };

  // Navigate to specific year
  const navigateToYear = (index: number) => {
    if (ref.current) {
      const itemWidth = 384;
      const scrollLeft = index * itemWidth;
      ref.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  // Calculate progress percentage
  const progressPercentage = data.length > 1 ? (currentIndex / (data.length - 1)) * 100 : 0;

  return (
    <div className="w-full bg-white font-sans md:px-10" ref={containerRef}>
      {/* Year Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
          
          {/* Animated Progress Line */}
          <motion.div
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full"
            style={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          {/* Year Buttons */}
          <div className="flex justify-between items-center relative">
            {data.map((item, index) => (
              <button
                key={index}
                onClick={() => navigateToYear(index)}
                className={`relative z-10 min-w-[3.5rem] h-14 px-2 rounded-full border-4 transition-all duration-300 font-bold text-xs ${
                  index <= currentIndex
                    ? 'bg-gradient-to-r from-red-500 to-red-600 border-white text-white shadow-lg scale-110'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:scale-105'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 overflow-x-auto scroll-smooth" onScroll={handleScroll}>
        <div className="flex gap-8 min-w-max pb-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 md:w-96 pt-4"
            >
              <div className="flex flex-col z-40 items-center mb-6">
                <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center transition-colors duration-500 font-barlow-condensed ${
                  index === currentIndex
                    ? 'text-red-600'
                    : index < currentIndex
                      ? 'text-red-500'
                      : 'text-neutral-500'
                }`}>
                  {item.title}
                </h3>
              </div>

              <div className={`relative px-4 w-full transition-all duration-500 ${
                index === currentIndex ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
              }`}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="max-w-7xl mx-auto px-4 pb-8 text-center">
        <p className="text-gray-600 text-sm font-montserrat">
          Clique nos anos acima ou deslize horizontalmente para navegar pela nossa história
        </p>
      </div>
    </div>
  );
};