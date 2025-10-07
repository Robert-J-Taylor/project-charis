'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

// Content constants - easily editable
const HERO_CONTENT = {
  heading: 'Built for Good.',
  subheading: 'Project Charis helps nonprofits save time, find volunteers, and build stronger communities without the burnout.',
  primaryCta: {
    text: 'Join the Charis Network',
    href: '#contact'
  },
  secondaryCta: {
    text: 'How it works',
    href: '#how-it-works'
  }
};

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<{ [key: string]: boolean }>({});
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Staggered animation for elements
  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all elements immediately
      setAnimatedElements({
        heading: true,
        subheading: true,
        cta: true,
        visual: true
      });
    } else {
      // Animate elements with staggered delay
      const elements = ['heading', 'subheading', 'cta', 'visual'];
      elements.forEach((element, index) => {
        setTimeout(() => {
          setAnimatedElements(prev => ({
            ...prev,
            [element]: true
          }));
        }, index * 200); // 200ms stagger
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden pt-8 lg:pt-12"
      aria-labelledby="hero-heading"
    >
      {/* Background with soft gradient and ripple motif */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F3F6FB] via-white to-[#E8F0F6]"></div>
      
      {/* Concentric ripple outlines */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-[#E2EBF3]/30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full border border-[#D5E1EC]/40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border border-[#E2EBF3]/20 -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Additional subtle ripples */}
      <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full border border-[#E4C9A1]/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full border border-[#D5E1EC]/25 translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-24">
          
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            
            {/* Heading */}
            <div 
              className={`
                transition-all duration-700 ease-out
                ${animatedElements.heading 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
            >
              <h1 
                id="hero-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-heading text-[#223A5E] leading-tight"
              >
                {HERO_CONTENT.heading}
              </h1>
            </div>

            {/* Subheading */}
            <div 
              className={`
                transition-all duration-700 ease-out delay-200
                ${animatedElements.subheading 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
            >
              <p className="text-xl md:text-2xl font-body text-[#718B9E] leading-relaxed max-w-2xl">
                {HERO_CONTENT.subheading}
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className={`
                flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-400
                ${animatedElements.cta 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
            >
              <Button 
                size="lg" 
                className="
                  bg-[#E4C9A1] text-[#223A5E] hover:bg-[#E4C9A1]/90 
                  hover:brightness-110 hover:ring-2 hover:ring-[#E4C9A1]/50
                  font-heading text-lg px-8 py-6 rounded-full
                  transition-all duration-300
                "
                asChild
              >
                <a href={HERO_CONTENT.primaryCta.href}>
                  {HERO_CONTENT.primaryCta.text}
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="
                  border-[#223A5E] text-[#223A5E] hover:bg-[#223A5E] hover:text-white
                  hover:ring-2 hover:ring-[#223A5E]/20
                  font-heading text-lg px-8 py-6 rounded-full
                  transition-all duration-300
                "
                asChild
              >
                <a href={HERO_CONTENT.secondaryCta.href}>
                  {HERO_CONTENT.secondaryCta.text}
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div 
            className={`
              flex justify-center items-center transition-all duration-700 ease-out delay-600
              ${animatedElements.visual 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
          >
            {/* Animated Ripple Mark */}
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Main ripple circle */}
              <div className="absolute inset-0 rounded-full border-4 border-[#223A5E]/20 animate-pulse"></div>
              
              {/* Expanding ripples */}
              <div className="absolute inset-4 rounded-full border-2 border-[#E4C9A1]/40 animate-ping"></div>
              <div className="absolute inset-8 rounded-full border border-[#D5E1EC]/60 animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-12 rounded-full border border-[#E2EBF3]/40 animate-ping" style={{ animationDelay: '2s' }}></div>
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E4C9A1] to-[#E4C9A1]/80 flex items-center justify-center shadow-lg">
                  <span className="text-4xl">💫</span>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-[#E4C9A1]/60 animate-bounce"></div>
              <div className="absolute top-16 right-12 w-3 h-3 rounded-full bg-[#D5E1EC]/60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-12 left-12 w-2 h-2 rounded-full bg-[#E2EBF3]/60 animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-[#E4C9A1]/40 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
