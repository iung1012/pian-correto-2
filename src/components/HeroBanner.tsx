import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://i.postimg.cc/KcLHwP2v/slide-familia.jpg',
      alt: 'Pian Alimentos - Família'
    },
    {
      image: 'https://i.postimg.cc/NjNJmb1b/slide-mikcat.jpg',
      alt: 'Pian Alimentos - MikCat'
    },
    {
      image: 'https://i.postimg.cc/fTfgTMyG/slide-priorita.jpg',
      alt: 'Pian Alimentos - Prioritá'
    },
    {
      image: 'https://i.postimg.cc/Gm3g46sH/slide-saches.jpg',
      alt: 'Pian Alimentos - Sachês'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-banner relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center hero-banner-image sm:object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={index === 0 ? "high" : "auto"}
              onError={(e) => {
                console.log('Image failed to load:', slide.image);
                // Fallback to a gradient background if image fails
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)';
              }}
            />
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 sm:p-3 transition-all duration-300 hover:scale-110 z-20 touch-manipulation"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 sm:p-3 transition-all duration-300 hover:scale-110 z-20 touch-manipulation"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
              index === currentSlide ? 'scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            style={index === currentSlide ? { backgroundColor: '#FDD528' } : {}}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;