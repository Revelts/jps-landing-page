import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { PartyPopper, CheckCircle2 } from 'lucide-react';

export function CTABox() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-accent/20 to-secondary/20 animate-gradient-shift bg-[length:200%_200%]" />
      <div className="absolute inset-0 backdrop-blur-3xl bg-surface/30" />
      
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text tracking-wide inline-flex items-center justify-center gap-3 flex-wrap">
            <PartyPopper className="w-10 h-10 md:w-12 md:h-12 text-secondary" />
            Siap Party Gratis di Jakarta?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-text-secondary max-w-2xl mx-auto">
            Daftar sekarang dan ikut hosting crowd di event minggu ini! 
            Join 1,000+ members yang sudah merasakan nightlife Jakarta berbeda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <button className="w-full sm:w-auto bg-gradient-to-r from-secondary to-accent text-bg-primary hover:shadow-glow-lg font-bold px-8 py-4 text-lg rounded-full transition-all duration-400 hover:-translate-y-1">
                Join Komunitas (Free!)
              </button>
            </Link>
            <a href="https://schedule.jakartapartysquad.com" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 text-lg rounded-full transition-all duration-400 font-semibold hover:-translate-y-1">
                Lihat Event Minggu Ini
              </button>
            </a>
          </div>

          {/* Trust Bar */}
          <div className="mt-10 pt-10 border-t border-secondary/20">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-text-primary">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>1,000+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>50+ Events/Month</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>20+ Partner Clubs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>Trusted Since 2023</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
