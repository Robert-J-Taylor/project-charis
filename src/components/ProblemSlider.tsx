'use client';

import { useState } from 'react';

interface SlideData {
  image: string;
  imageAlt: string;
  problem: string;
  solution: string;
}

interface ProblemSliderProps {
  slides: SlideData[];
}

export default function ProblemSlider({ slides }: ProblemSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-slate-800 mb-4">
              The Problems We See
            </h2>
            <p className="text-lg md:text-xl font-body text-slate-600 max-w-3xl mx-auto">
              Understanding the challenges nonprofits and communities face today
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Slides Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => {
                  // Define alternating background colors: ivory → mist blue → navy → ivory → mist blue → navy
                  const backgroundColors = [
                    'bg-amber-50', // ivory (slide 1)
                    'bg-blue-50', // mist blue (slide 2)
                    'bg-slate-800', // navy (slide 3)
                    'bg-amber-50', // ivory (slide 4)
                    'bg-blue-50', // mist blue (slide 5)
                    'bg-slate-800', // navy (slide 6)
                  ];

                  const textColors = [
                    'text-slate-900', // dark text on ivory
                    'text-slate-800', // dark text on mist blue
                    'text-slate-100', // light text on navy
                    'text-slate-900', // dark text on ivory
                    'text-slate-800', // dark text on mist blue
                    'text-slate-100', // light text on navy
                  ];

                  const currentBgColor = backgroundColors[index];
                  const currentTextColor = textColors[index];

                  return (
                    <div key={index} className="w-full flex-shrink-0">
                      <div
                        className={`${currentBgColor} rounded-2xl p-8 lg:p-12 transition-colors duration-500`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                          {/* Left: Visual */}
                          <div className="order-1 lg:order-1">
                            <div className="relative">
                              <div className="w-full h-96 lg:h-[28rem] rounded-2xl overflow-hidden">
                                <img
                                  src={slide.image}
                                  alt={slide.imageAlt}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Right: Text Block */}
                          <div className="order-2 lg:order-2 space-y-6">
                            {/* Problem */}
                            <div>
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                                  index === 2 || index === 5
                                    ? 'bg-red-200 text-red-800' // navy background (slides 3 & 6)
                                    : 'bg-red-100 text-red-700' // light backgrounds
                                }`}
                              >
                                Problem
                              </div>
                              <p
                                className={`text-lg md:text-xl font-body ${currentTextColor} leading-relaxed`}
                              >
                                {slide.problem}
                              </p>
                            </div>

                            {/* Divider */}
                            <div className="flex justify-center">
                              <div
                                className={`w-16 h-0.5 rounded-full ripple-line ${
                                  index === 2 || index === 5
                                    ? 'bg-gradient-to-r from-transparent via-slate-300 to-transparent' // navy background (slides 3 & 6)
                                    : 'bg-gradient-to-r from-transparent via-accent to-transparent' // light backgrounds
                                }`}
                              ></div>
                            </div>

                            {/* Solution */}
                            <div>
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                                  index === 2 || index === 5
                                    ? 'bg-accent/30 text-accent' // navy background (slides 3 & 6)
                                    : 'bg-accent/20 text-accent' // light backgrounds
                                }`}
                              >
                                Solution
                              </div>
                              <p
                                className={`text-lg md:text-xl font-body ${currentTextColor} leading-relaxed`}
                              >
                                {slide.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-0">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-0">
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index
                      ? 'bg-accent'
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
