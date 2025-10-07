'use client';

import { useState } from 'react';
import ProjectCharisLogo from '@/components/ProjectCharisLogo';

const NAVIGATION_LINKS = [
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Stats', href: '/#stats' },
  { name: 'Products', href: '/#products' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E2EBF3]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <ProjectCharisLogo size="lg" variant="light" showText={false} />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#718B9E] hover:text-[#223A5E] font-body font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="/contact"
              className="
                bg-[#E4C9A1] text-[#223A5E] hover:bg-[#E4C9A1]/90
                px-6 py-2 rounded-full font-heading font-medium
                transition-all duration-200 hover:scale-105
              "
            >
              Join Network
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#223A5E] hover:bg-[#F3F6FB] transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2EBF3] bg-white/95 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-[#718B9E] hover:text-[#223A5E] font-body font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-[#E2EBF3]">
                <a
                  href="/contact"
                  className="
                    block w-full text-center
                    bg-[#E4C9A1] text-[#223A5E] hover:bg-[#E4C9A1]/90
                    px-6 py-3 rounded-full font-heading font-medium
                    transition-all duration-200
                  "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Network
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
