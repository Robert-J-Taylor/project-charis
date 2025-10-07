import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import ProjectCharisLogo from '@/components/ProjectCharisLogo';
import ProblemSlider from '@/components/ProblemSlider';
import StatsPanorama from '@/components/StatsPanorama';
import HowItWorks from '@/components/HowItWorks';
import Waitlist from '@/components/Waitlist';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Mission Statement */}
        <section id="mission" className="py-24 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/2 via-transparent to-accent/3"></div>

          {/* Ripple Line Divider */}
          <div className="flex justify-center mb-16">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full ripple-line"></div>
          </div>

          {/* Mission Content */}
          <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
            {/* Headline with Enhanced Halo Effect */}
            <div className="relative mb-8">
              <h2 className="text-6xl md:text-7xl font-heading text-accent relative z-10">
                Our mission
              </h2>
              {/* Enhanced halo effect behind title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-20 mission-halo rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl font-body text-muted-foreground mb-16 leading-relaxed max-w-4xl mx-auto">
              Empowering nonprofits to work smarter, connect deeper, and
              multiply their impact.
            </p>

            {/* Mission Statement */}
            <div className="space-y-6 text-lg md:text-xl font-body text-foreground leading-relaxed max-w-4xl mx-auto">
              <div className="p-6 rounded-lg border border-accent/20 bg-accent/5">
                <p className="text-lg md:text-xl leading-relaxed">
                  Project Charis was born from a simple belief: that volunteer
                  work should be a fun and rewarding experience. Too many
                  organizations fighting for good causes are weighed down by
                  inefficiency, isolation, and burnout. We&apos;re here to
                  change that by creating digital infrastructure that simplifies
                  the entire experience of running a nonprofit, Our aim is to
                  take away distractions and get you focused back on what truly
                  matters: people and purpose.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-accent/10 bg-accent/3">
                <p className="text-lg md:text-xl text-accent font-medium leading-relaxed">
                  Through modern technology, advanced AI tools, and a community
                  built on goodwill, Project Charis turns compassion into
                  connection so every act of kindness makes an impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Slider */}
        <ProblemSlider
          slides={[
            {
              image: '/admin-burden-illustration.png',
              imageAlt: 'Woman at desk explaining administrative burden',
              problem:
                'Nonprofits are weighed down by administrative burden, data reporting, and compliance — many staff spend 25% or more of their time just managing data.',
              solution:
                'Charis centralizes and automates backend work — freeing nonprofits to focus on direct impact, not paperwork.',
            },
            {
              image: '/disconnect.png',
              imageAlt: 'People experiencing disconnection and isolation',
              problem:
                'Many people today suffer from isolation, lack of meaning, and disconnection — mental health is deteriorating, and community engagement is fractured.',
              solution:
                'Project Charis bridges that gap — helping people connect to causes, find purpose, and build belonging through shared nonprofit networks and opportunities to serve.',
            },
            {
              image: '/engaged.png',
              imageAlt:
                'People engaged in community activities and volunteer work',
              problem:
                "Volunteers and donors often disengage because they don't feel linked to mission over time or lack continuity in their involvement.",
              solution:
                'Charis helps sustain engagement by connecting supporters to stories, projects, and communities they care about — increasing retention.',
            },
            {
              image: '/tech.png',
              imageAlt: 'Technology and digital tools for nonprofits',
              problem:
                'Small nonprofits often lack the budget or design expertise to have high-quality websites or digital presence.',
              solution:
                'We provide website-as-a-service and templated digital tools so every nonprofit can look professional and be visible — no technical team required.',
            },
            {
              image: '/tools.png',
              imageAlt:
                'Digital tools and resources for nonprofit organizations',
              problem:
                'Small nonprofits often lack the budget or design expertise to have high-quality websites or digital presence.',
              solution:
                'We provide website-as-a-service and templated digital tools so every nonprofit can look professional and be visible — no technical team required.',
            },
            {
              image: '/inflation.png',
              imageAlt:
                'Economic challenges and rising costs affecting communities',
              problem:
                'Rising inflation, housing instability, and food insecurity are pushing more people into need than ever before, and safety nets are overextended.',
              solution:
                'Through efficient nonprofit tools and shared infrastructure, Charis enables organizations to scale, mobilize resources, and respond faster in crisis.',
            },
          ]}
        />

        {/* Stats Snapshot */}
        <StatsPanorama />

        {/* How It Works */}
        <HowItWorks />

        {/* Features Section */}
        <section id="products" className="pt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading text-foreground mb-4">
              Our Future Products
            </h2>
            <p className="text-xl font-body text-muted-foreground max-w-3xl mx-auto">
              Everything your nonprofit needs to amplify impact and streamline
              operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Website-as-a-Service */}
            <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ripple-effect border-l-4 border-l-accent">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 mb-4 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl">
                  Website-as-a-Service
                </CardTitle>
                <CardDescription className="font-body text-base leading-relaxed">
                  Launch a modern, optimized site for your nonprofit — no tech
                  team required. Secure hosting, updates, and integrations
                  included.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2: Donation & CRM Integrations */}
            <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ripple-effect border-l-4 border-l-primary">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl">
                  Donation & CRM Integrations
                </CardTitle>
                <CardDescription className="font-body text-base leading-relaxed">
                  Manage donations, donors, and recurring gifts in one place —
                  sync with Stripe, PayPal, or your existing CRM.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3: Volunteer Management Hub */}
            <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ripple-effect border-l-4 border-l-secondary">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 mb-4 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl">
                  Volunteer Management Hub
                </CardTitle>
                <CardDescription className="font-body text-base leading-relaxed">
                  Track volunteer hours, match skills to causes, and schedule
                  shifts seamlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4: AI Assistant for Grant Writing */}
            <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ripple-effect border-l-4 border-l-accent">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 mb-4 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl">
                  AI Assistant for Grant Writing
                </CardTitle>
                <CardDescription className="font-body text-base leading-relaxed">
                  Save hours drafting grant proposals, donor letters, and impact
                  reports with an AI tool trained on nonprofit language.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5: Shared Vendor Marketplace */}
            <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ripple-effect border-l-4 border-l-primary">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl">
                  Shared Vendor Marketplace
                </CardTitle>
                <CardDescription className="font-body text-base leading-relaxed">
                  Access discounted tools, shared service providers, and
                  cooperative pricing through the Charis community.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6: Community Collaboration Tools */}
            <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ripple-effect border-l-4 border-l-secondary">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 mb-4 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl">
                  Community Collaboration Tools
                </CardTitle>
                <CardDescription className="font-body text-base leading-relaxed">
                  Message, share documents, and collaborate across organizations
                  — because grace works better together.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      {/* Waitlist Section */}
      <Waitlist />

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-4">
            <ProjectCharisLogo size="md" variant="light" showText={false} />
            <p className="text-center font-body text-muted-foreground">
              Grace in action — connecting nonprofits with the tools they
              deserve.
            </p>
            <p className="text-center text-sm font-body text-muted-foreground">
              © 2024 Project Charis. Built with Next.js, Tailwind CSS, and
              shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
