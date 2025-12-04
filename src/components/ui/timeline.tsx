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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    // Recalculate after a short delay to ensure content is loaded
    setTimeout(updateHeight, 100);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [ref, data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Detect which item is currently in view
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.getBoundingClientRect().top;
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((itemRef, index) => {
        if (itemRef) {
          const itemTop = itemRef.getBoundingClientRect().top;
          const distance = Math.abs(itemTop - viewportCenter);
          
          if (distance < closestDistance && itemTop <= viewportCenter + 200) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.length]);

  return (
    <div
      className="w-full bg-white font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900 max-w-4xl font-barlow-condensed font-black uppercase tracking-wider">
          Nossa História
        </h2>
        <p className="text-gray-700 text-sm md:text-base max-w-2xl font-montserrat">
          Uma jornada de mais de 40 anos dedicados ao amor pelos pets. Conheça os marcos que construíram a Pian Alimentos.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                  <div className={`h-4 w-4 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-pian-red border-2 border-pian-red scale-125' 
                      : 'bg-white border-2 border-gray-300'
                  } p-2`} />
                </div>
                <h3 className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold font-barlow-condensed transition-colors duration-300 ${
                  isActive ? 'text-pian-red' : 'text-gray-400'
                }`}>
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className={`md:hidden block text-2xl mb-4 text-left font-bold font-barlow-condensed transition-colors duration-300 ${
                  isActive ? 'text-pian-red' : 'text-gray-400'
                }`}>
                  {item.title}
                </h3>
                <div className={`timeline-item-content ${isActive ? 'active' : ''}`}>
                  {item.content}{" "}
                </div>
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height > 0 ? height + "px" : "100%",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-pian-red via-red-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
