import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export function CTABox() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Container>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            🎊 Siap Party Gratis di Jakarta?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Daftar sekarang dan ikut hosting crowd di event minggu ini! 
            Join 1,000+ members yang sudah merasakan nightlife Jakarta berbeda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full transition-all shadow-lg hover:shadow-xl">
                Join Komunitas (Free!)
              </button>
            </Link>
            <a href="https://schedule.jakartapartysquad.com" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all font-semibold">
                Lihat Event Minggu Ini
              </button>
            </a>
          </div>

          {/* Trust Bar */}
          <div className="mt-10 pt-10 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>1,000+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>50+ Events/Month</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>20+ Partner Clubs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>Trusted Since 2023</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
