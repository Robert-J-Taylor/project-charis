'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  involvement: string[];
  challenge: string;
  otherChallenge?: string;
  helpText: string;
  extra?: string;
  updatesOptIn: boolean;
  scheduleCall: boolean;
  honeypot?: string;
}

const INVOLVEMENT_OPTIONS = [
  'I represent a nonprofit or community organization',
  'I want to volunteer or collaborate',
  'I\'m exploring partnerships or funding',
  'I just want to learn more'
];

const CHALLENGE_OPTIONS = [
  'Managing technology or admin work',
  'Attracting volunteers or donors',
  'Building a better online presence',
  'Coordinating with other nonprofits',
  'Other'
];

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError
  } = useForm<ContactFormData>();

  const selectedChallenge = watch('challenge');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        // Handle validation errors
        if (result.errors) {
          Object.keys(result.errors).forEach((field) => {
            setError(field as keyof ContactFormData, {
              type: 'manual',
              message: result.errors[field][0]
            });
          });
        } else {
          // Handle other errors (rate limiting, server errors)
          console.error('Form submission error:', result.message);
          alert(result.message || 'An error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-[#E4C9A1] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-3xl font-heading text-[#223A5E] mb-4">
          Thanks for reaching out
        </h2>
        <p className="text-lg font-body text-[#718B9E] mb-2">
          — we&apos;ll be in touch soon.
        </p>
        <p className="text-lg font-body text-[#718B9E]">
          You&apos;re helping build something that matters.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Your Info Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading text-[#223A5E] mb-6">Your Info</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#223A5E] mb-2">
              Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-[#E2EBF3] rounded-lg focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#223A5E] mb-2">
              Email *
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-[#E2EBF3] rounded-lg focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-[#223A5E] mb-2">
            Organization
          </label>
          <input
            {...register('organization')}
            type="text"
            id="organization"
            className="w-full px-4 py-3 border border-[#E2EBF3] rounded-lg focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200"
            placeholder="Your organization name (optional)"
          />
        </div>
      </div>

      {/* Involvement Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading text-[#223A5E] mb-6">
          How are you looking to get involved?
        </h2>
        
        <div className="space-y-4">
          {INVOLVEMENT_OPTIONS.map((option, index) => (
            <label key={index} className="flex items-start space-x-3 cursor-pointer">
              <input
                {...register('involvement', { required: 'Please select at least one option' })}
                type="checkbox"
                value={option}
                className="mt-1 h-4 w-4 text-[#E4C9A1] border-[#E2EBF3] rounded focus:ring-[#E4C9A1]"
              />
              <span className="text-[#223A5E] font-body">{option}</span>
            </label>
          ))}
          {errors.involvement && (
            <p className="text-sm text-red-600">{errors.involvement.message}</p>
          )}
        </div>
      </div>

      {/* Challenge Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading text-[#223A5E] mb-6">
          What&apos;s your biggest challenge right now?
        </h2>
        
        <div>
          <select
            {...register('challenge', { required: 'Please select a challenge' })}
            className="w-full px-4 py-3 border border-[#E2EBF3] rounded-lg focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select your biggest challenge</option>
            {CHALLENGE_OPTIONS.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.challenge && (
            <p className="mt-1 text-sm text-red-600">{errors.challenge.message}</p>
          )}
        </div>

        {selectedChallenge === 'Other' && (
          <div>
            <label htmlFor="otherChallenge" className="block text-sm font-medium text-[#223A5E] mb-2">
              Please tell us more
            </label>
            <input
              {...register('otherChallenge', { 
                required: selectedChallenge === 'Other' ? 'Please describe your challenge' : false 
              })}
              type="text"
              id="otherChallenge"
              className="w-full px-4 py-3 border border-[#E2EBF3] rounded-lg focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200"
              placeholder="Describe your specific challenge"
            />
            {errors.otherChallenge && (
              <p className="mt-1 text-sm text-red-600">{errors.otherChallenge.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading text-[#223A5E] mb-6">
          How can we help you most?
        </h2>
        
        <div>
          <textarea
            {...register('helpText', { required: 'Please tell us how we can help' })}
            id="helpText"
            rows={4}
            className="w-full px-4 py-3 border border-[#E2EBF3] rounded-lg focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200"
            placeholder="Tell us about your goals and how Project Charis might support you..."
          />
          {errors.helpText && (
            <p className="mt-1 text-sm text-red-600">{errors.helpText.message}</p>
          )}
        </div>
      </div>

      {/* Additional Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading text-[#223A5E] mb-6">
          Anything else you&apos;d like to share?
        </h2>
        
        <div>
          <textarea
            {...register('extra')}
            id="extra"
            rows={3}
            className="w-full px-4 py-3 border border-[#E2EBF3] rounded-lg focus:ring-2 focus:ring-[#E4C9A1] focus:border-transparent transition-all duration-200"
            placeholder="Any additional thoughts, questions, or ideas you'd like to share?"
          />
        </div>
      </div>

      {/* Stay Connected Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-heading text-[#223A5E] mb-6">
          Stay Connected
        </h2>
        
        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              {...register('updatesOptIn')}
              type="checkbox"
              className="mt-1 h-4 w-4 text-[#E4C9A1] border-[#E2EBF3] rounded focus:ring-[#E4C9A1]"
            />
            <span className="text-[#223A5E] font-body">
              Keep me updated about the Charis beta launch
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              {...register('scheduleCall')}
              type="checkbox"
              className="mt-1 h-4 w-4 text-[#E4C9A1] border-[#E2EBF3] rounded focus:ring-[#E4C9A1]"
            />
            <span className="text-[#223A5E] font-body">
              I&apos;d like to schedule a call
            </span>
          </label>
        </div>
      </div>

      {/* Honeypot field (hidden from users) */}
      <div style={{ display: 'none' }}>
        <input
          {...register('honeypot')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-8">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-[#E4C9A1] text-[#223A5E] hover:bg-[#E4C9A1]/90 font-heading text-lg px-8 py-4 rounded-full ring-2 ring-transparent hover:ring-[#E4C9A1]/50 transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'Sharing...' : 'Share My Answers'}
        </Button>
      </div>
    </form>
  );
}
