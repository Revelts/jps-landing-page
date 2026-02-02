import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { PartyPopper, ArrowRight, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-accent/20 to-secondary/20 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="badge-cyber mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span>1,000+ Members Sudah Join!</span>
          </div>

          {/* H1 - Main Keyword */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight gradient-text tracking-wide">
            Hosting Party Gratis Jakarta
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-text-primary">
            Cara Clubbing Tanpa Bayar – Nikmati Nightlife Jakarta Gratis!
          </p>

          {/* Description with Keywords */}
          <p className="text-lg mb-10 text-text-secondary max-w-3xl mx-auto">
            Jadi <strong className="text-secondary">host crowd</strong> Jakarta Party Squad dan party gratis di{' '}
            <strong className="text-accent">nightclub Jakarta</strong> setiap weekend! Dapat botol gratis, VIP access,
            networking premium. Event di SCBD, Kemang, PIK.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <button className="w-full sm:w-auto bg-gradient-to-r from-secondary to-accent text-bg-primary hover:shadow-glow-lg font-bold px-8 py-4 text-lg rounded-full transition-all duration-400 hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                <PartyPopper className="w-5 h-5" />
                Daftar Hosting Gratis
              </button>
            </Link>
            <a href="https://schedule.jakartapartysquad.com" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 text-lg rounded-full transition-all duration-400 font-semibold hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                Lihat Event Minggu Ini
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
            <div className="flex items-center gap-2 text-text-primary">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              <span>1,000+ Members</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              <span>50+ Events/Bulan</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              <span>20+ Nightclub Partner</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              <span>100% Legal & Aman</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
