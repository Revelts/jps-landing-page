/**
 * Hosting CTA Section
 * SEO: Promote hosting gratis page
 */
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { PartyPopper, ArrowRight, CheckCircle2 } from 'lucide-react';

export function HostingCTA() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Premium gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-accent/20 to-secondary/20 animate-gradient-shift bg-[length:200%_200%]" />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-surface/30" />
      
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      
      <Container className="relative z-10">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Badge */}
            <div className="badge-cyber mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>Program Paling Dicari!</span>
            </div>

            {/* Title & Description Group */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              <Heading level={2} align="center" className="text-text-primary mb-0 text-4xl md:text-5xl tracking-wide inline-flex items-center justify-center gap-3 flex-wrap">
                <PartyPopper className="w-10 h-10 md:w-12 md:h-12 text-secondary" />
                Hosting Party Gratis Jakarta
              </Heading>
              
              <Text size="xl" className="gradient-text text-center w-full font-semibold">
                Mau Party di Nightclub Tanpa Bayar?
              </Text>
              
              <Text size="base" className="text-text-secondary text-center max-w-2xl">
                Jadi <strong className="text-secondary">host crowd</strong> Jakarta Party Squad dan nikmati party gratis 
                di nightclub SCBD, Kemang, PIK. Dapat botol gratis, VIP access, dan networking premium!
              </Text>
            </div>

            {/* Benefits Quick List */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-secondary/20 text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Entry Gratis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-secondary/20 text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Botol Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-secondary/20 text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>VIP Access</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-secondary/20 text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Networking</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/hosting/gratis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-bg-primary font-bold rounded-full hover:shadow-glow-lg transition-all duration-400 text-lg mb-6 hover:-translate-y-1"
            >
              Pelajari Hosting Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Trust Signal */}
            <Text size="sm" className="text-text-tertiary text-center">
              Join 1,000+ members yang sudah merasakan party gratis!
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
