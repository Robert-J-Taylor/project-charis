'use client';

import { useState, useEffect, useRef } from 'react';

interface StatData {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon?: string;
  sourceName?: string;
  sourceUrl?: string;
}

const STATS: StatData[] = [
  {
    id: 'digital-gap',
    value: 1,
    suffix: ' in 3',
    label: 'nonprofits report digital skill gaps',
    icon: '💻',
    sourceName: 'NTEN Digital Adoption (2023)',
    sourceUrl: '#',
  },
  {
    id: 'costs',
    value: 70,
    suffix: '%',
    label: 'say tech costs limit modernization',
    icon: '💰',
    sourceName: 'TechSoup Survey (2023)',
    sourceUrl: '#',
  },
  {
    id: 'admin',
    value: 60,
    suffix: '%',
    label: 'of staff time goes to admin work',
    icon: '🕓',
    sourceName: 'Independent Sector (2024)',
    sourceUrl: '#',
  },
  {
    id: 'burnout',
    value: 95,
    suffix: '%',
    label: 'leaders cite burnout as a concern',
    icon: '🧠',
    sourceName: 'Nonprofit Quarterly (2024)',
    sourceUrl: '#',
  },
  {
    id: 'housing',
    value: 37,
    suffix: 'M+',
    label: 'U.S. households are cost-burdened',
    icon: '🏠',
    sourceName: 'HUD/Census (2024)',
    sourceUrl: '#',
  },
  {
    id: 'donors',
    value: 80,
    suffix: '%',
    label: 'donors want deeper connection',
    icon: '🤝',
    sourceName: 'Giving USA (2024)',
    sourceUrl: '#',
  },
];

export default function StatsPanorama() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{
    [key: string]: number;
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

  // Count-up animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1200; // 1.2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const newValues: { [key: string]: number } = {};
      STATS.forEach((stat) => {
        newValues[stat.id] = Math.floor(stat.value * easeOutCubic);
      });

      setAnimatedValues(newValues);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Set final values immediately
      const finalValues: { [key: string]: number } = {};
      STATS.forEach((stat) => {
        finalValues[stat.id] = stat.value;
      });
      setAnimatedValues(finalValues);
    } else {
      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Background with gradient and ripples */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-blue-50 to-slate-100">
        {/* Concentric ripple outlines */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-[#E2EBF3]/30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full border border-[#D5E1EC]/40 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border border-[#E2EBF3]/20 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="stats-heading"
            className="text-4xl md:text-5xl font-heading text-[#223A5E] mb-4"
          >
            The Numbers Tell the Story
          </h2>
          <p className="text-lg md:text-xl font-body text-[#718B9E] max-w-3xl mx-auto">
            Nonprofits are stretched thin. Technology is out of reach. Community
            needs are rising.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {STATS.slice(0, 3).map((stat, index) => (
              <StatPill
                key={stat.id}
                stat={stat}
                animatedValue={animatedValues[stat.id] || 0}
                isVisible={isVisible}
                delay={index * 150}
              />
            ))}
          </div>

          {/* Connector Line */}
          <div className="flex justify-center mb-8">
            <svg
              width="200"
              height="40"
              viewBox="0 0 200 40"
              className="text-[#D5E1EC]"
            >
              <path
                d="M20 20 Q100 40 180 20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,4"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATS.slice(3, 6).map((stat, index) => (
              <StatPill
                key={stat.id}
                stat={stat}
                animatedValue={animatedValues[stat.id] || 0}
                isVisible={isVisible}
                delay={(index + 3) * 150}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatPillProps {
  stat: StatData;
  animatedValue: number;
  isVisible: boolean;
  delay: number;
}

function StatPill({ stat, animatedValue, isVisible, delay }: StatPillProps) {
  const [isPillVisible, setIsPillVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsPillVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      className={`
        relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 
        ring-1 ring-[#E2EBF3] shadow-sm
        transition-all duration-700 ease-out
        ${isPillVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {/* Gold accent blob */}
      <div className="absolute top-3 right-3 w-3 h-3 bg-[#F7EFE3] rounded-full"></div>

      {/* Icon */}
      {stat.icon && <div className="text-2xl mb-3">{stat.icon}</div>}

      {/* Number */}
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-heading text-[#223A5E] font-bold">
          {animatedValue}
        </span>
        {stat.suffix && (
          <span className="text-2xl md:text-3xl font-heading text-[#223A5E] ml-1">
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-sm md:text-base font-body text-[#718B9E] leading-relaxed mb-3">
        {stat.label}
      </p>

      {/* Source */}
      {stat.sourceName && (
        <div className="text-xs text-[#718B9E]">
          <a
            href={stat.sourceUrl}
            className="border-b border-dotted border-[#718B9E] hover:border-[#223A5E] hover:text-[#223A5E] transition-colors"
          >
            {stat.sourceName}
          </a>
        </div>
      )}
    </div>
  );
}
