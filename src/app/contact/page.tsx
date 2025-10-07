import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 relative overflow-hidden bg-gradient-to-br from-[#F3F6FB] to-white">
        {/* Subtle ripple outlines */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-[#E2EBF3]/30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-[#E2EBF3]/20 translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border border-[#E2EBF3]/25 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-[#223A5E] mb-6 leading-tight">
              Let&apos;s build something good together.
            </h1>
            <p className="text-lg md:text-xl font-body text-[#718B9E] max-w-2xl mx-auto leading-relaxed">
              Tell us a bit about yourself so we can connect you to the right people.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Email Section */}
      <section className="py-12 bg-[#F3F6FB]/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#718B9E] font-body">
            Prefer email? Reach us at{' '}
            <a 
              href="mailto:contact@projectcharis.org" 
              className="text-[#223A5E] hover:text-[#E4C9A1] transition-colors duration-200 font-medium"
            >
              contact@projectcharis.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
