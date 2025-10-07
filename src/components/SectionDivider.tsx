'use client';

interface SectionDividerProps {
  variant?: 'ripple' | 'wave' | 'dots';
  className?: string;
}

export default function SectionDivider({
  variant = 'ripple',
  className = '',
}: SectionDividerProps) {
  if (variant === 'ripple') {
    return (
      <div className={`w-full py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <svg
            width="100%"
            height="60"
            viewBox="0 0 1200 60"
            className="text-[#D5E1EC]"
            preserveAspectRatio="none"
          >
            {/* Main ripple wave */}
            <path
              d="M0,30 Q300,10 600,30 T1200,30 L1200,60 L0,60 Z"
              fill="url(#rippleGradient)"
              opacity="0.6"
            />

            {/* Secondary ripple for depth */}
            <path
              d="M0,35 Q400,15 800,35 T1200,35 L1200,60 L0,60 Z"
              fill="url(#rippleGradient2)"
              opacity="0.3"
            />

            {/* Subtle top ripple */}
            <path
              d="M0,25 Q200,5 400,25 T800,25 T1200,25 L1200,60 L0,60 Z"
              fill="url(#rippleGradient3)"
              opacity="0.2"
            />

            {/* Gradient definitions */}
            <defs>
              <linearGradient
                id="rippleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#E2EBF3" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#D5E1EC" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E2EBF3" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient
                id="rippleGradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#F3F6FB" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#E8F0F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F3F6FB" stopOpacity="0.4" />
              </linearGradient>

              <linearGradient
                id="rippleGradient3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#E4C9A1" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#E2EBF3" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#E4C9A1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={`w-full py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <svg
            width="100%"
            height="40"
            viewBox="0 0 1200 40"
            className="text-[#D5E1EC]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q300,5 600,20 T1200,20 L1200,40 L0,40 Z"
              fill="url(#waveGradient)"
              opacity="0.5"
            />

            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#E2EBF3" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#D5E1EC" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#E2EBF3" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`w-full py-12 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#D5E1EC] opacity-60"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animation: 'pulse 2s infinite',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
