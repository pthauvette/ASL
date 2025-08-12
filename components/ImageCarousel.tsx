'use client';

import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: CarouselSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    title: "Join Our Community",
    subtitle: "Connect with like-minded professionals and grow your network"
  },
  {
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    title: "Build Your Future",
    subtitle: "Access exclusive resources and opportunities for career growth"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    title: "Expert Network",
    subtitle: "Learn from industry leaders and share your expertise"
  }
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-12">
            <div className="max-w-md text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-8 lg:left-12 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}