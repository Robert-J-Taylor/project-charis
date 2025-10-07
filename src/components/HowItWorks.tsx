'use client';

import { useState, useEffect, useRef } from 'react';

interface StepData {
  id: string;
  number: number;
  icon: string;
  headline: string;
  description: string;
}

const STEPS: StepData[] = [
  {
    id: 'connect',
    number: 1,
    icon: '💫',
    headline: 'Connect',
    description:
      'Join the Charis Network to discover nonprofits, volunteers, and resources aligned with your mission.',
  },
  {
    id: 'collaborate',
    number: 2,
    icon: '🤝',
    headline: 'Collaborate',
    description:
      'Share tools, data, and insights across organizations to reduce duplicate costs and expand reach.',
  },
  {
    id: 'multiply',
    number: 3,
    icon: '🌱',
    headline: 'Multiply Impact',
    description:
      'Measure progress together and strengthen communities through collective action.',
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSteps, setAnimatedSteps] = useState<{
    [key: string]: boolean;
  }>({});
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Staggered animation for steps
  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show all steps immediately
      const allSteps: { [key: string]: boolean } = {};
      STEPS.forEach((step) => {
        allSteps[step.id] = true;
      });
      setAnimatedSteps(allSteps);
    } else {
      // Animate steps with staggered delay
      STEPS.forEach((step, index) => {
        setTimeout(() => {
          setAnimatedSteps((prev) => ({
            ...prev,
            [step.id]: true,
          }));
        }, index * 300); // 300ms delay between each step
      });
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      {/* Background with navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#223A5E] via-[#1e2f47] to-[#223A5E]"></div>

      {/* Soft gold halo behind icons */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-[#E4C9A1]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="how-it-works-heading"
            className="text-4xl md:text-5xl font-heading text-white mb-4"
          >
            How It Works
          </h2>
          <p className="text-lg md:text-xl font-body text-slate-200 max-w-3xl mx-auto">
            From connection to collective impact — here&apos;s how Project
            Charis empowers nonprofits.
          </p>
        </div>

        {/* Steps Container */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step Content */}
                <div
                  className={`
                    transition-all duration-700 ease-out flex flex-col items-center text-center
                    ${
                      animatedSteps[step.id]
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }
                  `}
                >
                  {/* Circular Icon Container with Ripple Outline */}
                  <div className="relative mb-6 flex justify-center">
                    {/* Ripple outline rings */}
                    <div className="absolute inset-0 w-24 h-24 rounded-full border border-slate-300/40 animate-pulse"></div>
                    <div
                      className="absolute inset-2 w-20 h-20 rounded-full border border-slate-200/60 animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    ></div>

                    {/* Main icon container */}
                    <div className="relative w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-200">
                      <span className="text-3xl">{step.icon}</span>

                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#E4C9A1] text-[#223A5E] text-sm font-heading font-semibold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4">
                    {step.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg font-body text-slate-200 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (only between steps, not after last) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 -translate-y-1/2">
                    <div className="w-full h-full bg-gradient-to-r from-[#E4C9A1] via-[#E2EBF3] to-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile connector line (vertical) */}
          <div className="lg:hidden flex justify-center mt-8">
            <div className="w-0.5 h-16 bg-gradient-to-b from-[#E4C9A1] via-[#E2EBF3] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
