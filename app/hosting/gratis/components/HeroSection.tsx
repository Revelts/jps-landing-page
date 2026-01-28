import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>1,000+ Members Sudah Join!</span>
          </div>

          {/* H1 - Main Keyword */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Hosting Party Gratis Jakarta
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Cara Clubbing Tanpa Bayar – Nikmati Nightlife Jakarta Gratis!
          </p>

          {/* Description with Keywords */}
          <p className="text-lg mb-10 text-white/80 max-w-3xl mx-auto">
            Jadi <strong>host crowd</strong> Jakarta Party Squad dan party gratis di{' '}
            <strong>nightclub Jakarta</strong> setiap weekend! Dapat botol gratis, VIP access,
            networking premium. Event di SCBD, Kemang, PIK.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full transition-all shadow-lg hover:shadow-xl">
                🎊 Daftar Hosting Gratis
              </button>
            </Link>
            <a href="https://schedule.jakartapartysquad.com" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all font-semibold">
                Lihat Event Minggu Ini →
              </button>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>1,000+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>50+ Events/Bulan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>20+ Nightclub Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>100% Legal & Aman</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
