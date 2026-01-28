/**
 * Hosting CTA Section
 * SEO: Promote hosting gratis page
 */
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export function HostingCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Container>
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-white">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Program Paling Dicari!</span>
            </div>

            {/* Title & Description Group */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              <Heading level={2} align="center" className="text-white mb-0 text-4xl md:text-5xl">
                🎊 Hosting Party Gratis Jakarta
              </Heading>
              
              <Text size="xl" className="text-white/90 text-center w-full">
                Mau Party di Nightclub Tanpa Bayar?
              </Text>
              
              <Text size="base" className="text-white/80 text-center max-w-2xl">
                Jadi <strong>host crowd</strong> Jakarta Party Squad dan nikmati party gratis 
                di nightclub SCBD, Kemang, PIK. Dapat botol gratis, VIP access, dan networking premium!
              </Text>
            </div>

            {/* Benefits Quick List */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm md:text-base text-white">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Entry Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Botol Free</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>VIP Access</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Networking</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/hosting/gratis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition text-lg shadow-2xl mb-6"
            >
              Pelajari Hosting Gratis →
            </Link>

            {/* Trust Signal */}
            <Text size="sm" className="text-white/70 text-center">
              Join 1,000+ members yang sudah merasakan party gratis!
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
