'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const WAITLIST_CONTENT = {
  heading: 'Join the Charis Waitlist',
  subtext: 'Be among the first to try our beta for nonprofits and volunteers.',
  inputPlaceholder: 'you@organization.org',
  buttonText: 'Join Waitlist',
  microCopy: 'We send occasional updates. No spam.',
  successMessage: "🎉 You're on the list. We'll be in touch soon.",
  errorMessage: 'Something went wrong. Please try again.',
};

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;
    if (!validateEmail(email)) return;

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#F3F6FB] to-[#E8F0F6]">
      {/* Subtle ripple outlines */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-[#D5E1EC]/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-[#E2EBF3]/15 translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border border-[#D5E1EC]/25 translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-heading text-[#223A5E] mb-4">
            {WAITLIST_CONTENT.heading}
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl font-body text-[#718B9E] mb-12">
            {WAITLIST_CONTENT.subtext}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              {/* Email Input */}
              <div className="flex-1">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={WAITLIST_CONTENT.inputPlaceholder}
                  aria-label="Email"
                  className="w-full px-6 py-4 rounded-full border border-[#E2EBF3] focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200 text-[#223A5E] placeholder-[#718B9E] bg-white shadow-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="px-8 py-4 rounded-full bg-[#E4C9A1] text-[#223A5E] hover:bg-[#E4C9A1]/90 font-heading font-medium text-lg ring-2 ring-transparent hover:ring-[#E4C9A1]/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : WAITLIST_CONTENT.buttonText}
              </Button>
            </div>

            {/* Micro Copy */}
            <p className="text-sm text-[#718B9E] font-body">
              {WAITLIST_CONTENT.microCopy}
            </p>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-body text-lg">
                  {WAITLIST_CONTENT.successMessage}
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-body text-lg">
                  {WAITLIST_CONTENT.errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
