/**
 * Hosting Party Gratis Jakarta Page
 * HIGH PRIORITY SEO PAGE - Target: "hosting party gratis jakarta"
 */
import { Metadata } from 'next';
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/metadata';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { HeroSection } from './components/HeroSection';
import { BenefitsGrid } from './components/BenefitsGrid';
import { HowToJoin } from './components/HowToJoin';
import { FAQ } from './components/FAQ';
import { TestimonialCards } from './components/TestimonialCards';
import { CTABox } from './components/CTABox';

// SEO Metadata - Optimized for conversion
export const metadata: Metadata = genMeta({
  title: 'Hosting Party Gratis Jakarta - Cara Clubbing Tanpa Bayar | JPS',
  description: 'Mau party gratis di nightclub Jakarta? Jadi host crowd JPS dan nikmati botol gratis, VIP access, networking premium. Event setiap weekend di SCBD, Kemang, PIK. Join sekarang!',
  keywords: 'hosting party gratis Jakarta, party gratis Jakarta, cara party gratis, hosting crowd Jakarta, free party Jakarta, party tanpa bayar Jakarta, clubbing gratis Jakarta, nightclub free entry Jakarta, komunitas party Jakarta',
  canonical: '/hosting/gratis',
  ogImage: '/assets/images/header.jpg',
});

// Schema Markup
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Hosting', url: '/hosting' },
  { name: 'Party Gratis Jakarta', url: '/hosting/gratis' },
]);

const faqSchema = generateFAQSchema([
  {
    question: 'Apakah hosting party gratis Jakarta benar-benar gratis?',
    answer: 'Ya! Kamu tidak bayar entry fee, bahkan bisa dapat botol gratis tergantung event. Yang perlu kamu bawa hanya diri sendiri, teman-teman, dan energi positif.',
  },
  {
    question: 'Minimal berapa orang untuk hosting crowd?',
    answer: 'Biasanya 5-8 orang tergantung venue dan event. Semakin banyak crowd, semakin besar benefit yang didapat seperti botol gratis.',
  },
  {
    question: 'Umur minimal berapa untuk ikut hosting party Jakarta?',
    answer: '18+ wajib. Semua venue nightclub Jakarta memiliki age restriction. Bawa KTP untuk verifikasi di pintu masuk.',
  },
  {
    question: 'Apakah bisa request venue atau event tertentu?',
    answer: 'Bisa! Tapi tergantung availability dan partnership JPS dengan venue tersebut. DM admin untuk request khusus.',
  },
  {
    question: 'Bagaimana dress code untuk hosting party gratis?',
    answer: 'Smart casual atau club attire. Hindari: sandal jepit, kaos oblong, celana pendek. Venue berhak menolak jika dress code tidak sesuai.',
  },
  {
    question: 'Apakah aman untuk cewek ikut hosting crowd sendirian?',
    answer: 'Aman! Komunitas JPS memiliki Code of Conduct yang ketat. Tapi kami tetap rekomendasikan datang dengan teman. Jakarta Party Squad punya zero tolerance untuk harassment.',
  },
  {
    question: 'Berapa lama proses approval hosting?',
    answer: 'Maksimal 24 jam. Biasanya lebih cepat (2-6 jam) jika kamu apply H-3 event. Last minute request sulit di-approve karena slot terbatas.',
  },
  {
    question: 'Apakah ada biaya membership untuk join JPS?',
    answer: 'TIDAK! Join komunitas Jakarta Party Squad 100% GRATIS. Tidak ada biaya membership, tidak ada iuran bulanan. Free forever!',
  },
]);

export default function HostingGratisPage() {
  return (
    <>
      {/* Analytics Tracking */}
      <PageViewTracker 
        pageType="other" 
        pageName="Hosting Gratis" 
        pageCategory="conversion" 
      />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* FAQ Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="hosting-gratis-page">
        {/* Hero Section */}
        <HeroSection />

        {/* What is Hosting Crowd */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">
              Apa Itu Hosting Crowd?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                <strong className="text-black">Hosting crowd</strong> adalah konsep di mana kamu dan teman-teman 
                datang ke event nightclub sebagai <strong className="text-black">crowd</strong> yang membawa energi 
                dan vibes seru. Sebagai timbal balik, nightclub dan Jakarta Party Squad 
                memberikan benefit seperti:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-indigo-100">
                  <span className="text-3xl">🍾</span>
                  <span className="text-black"><strong>Botol gratis</strong> (biasanya 1 botol per 5-8 orang)</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-indigo-100">
                  <span className="text-3xl">🎟️</span>
                  <span className="text-black"><strong>Free entry</strong> atau priority access</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-indigo-100">
                  <span className="text-3xl">📸</span>
                  <span className="text-black"><strong>Dokumentasi profesional</strong> foto & video</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-indigo-100">
                  <span className="text-3xl">🎉</span>
                  <span className="text-black"><strong>Event exclusive</strong> dengan guest DJ internasional</span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Cocok banget buat kamu yang suka party bareng circle, cari pengalaman baru, 
                atau pengen explore <strong className="text-black">nightlife Jakarta</strong> tanpa biaya mahal!
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <BenefitsGrid />

        {/* How to Join */}
        <HowToJoin />

        {/* Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
              Syarat Hosting Party Gratis Jakarta
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 transition bg-gradient-to-br from-white to-indigo-50">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  1. Join Komunitas (Free!)
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Follow IG @jakartapartysquad</li>
                  <li>✅ Join WhatsApp group</li>
                  <li>✅ Isi form member (5 menit)</li>
                </ul>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 transition bg-gradient-to-br from-white to-purple-50">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  2. Ajak Minimal 5-8 Orang
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Crowd minimal 5-8 orang</li>
                  <li>✅ Semua wajib 18+ (bawa KTP)</li>
                  <li>✅ Dress code: Smart casual</li>
                </ul>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 transition bg-gradient-to-br from-white to-violet-50">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  3. Ikuti Regulasi Event
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Datang on-time (21:00-22:00)</li>
                  <li>✅ Bawa energi & vibes positif</li>
                  <li>✅ Patuhi aturan venue</li>
                </ul>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 transition bg-gradient-to-br from-white to-blue-50">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  4. RSVP via Admin JPS
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Konfirmasi H-3</li>
                  <li>✅ Kirim data crowd</li>
                  <li>✅ Tunggu approval</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialCards />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <CTABox />

        {/* Disclaimer */}
        <section className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              <strong>Disclaimer:</strong> Program hosting gratis tersedia sesuai availability 
              dan partnership dengan venue. Jakarta Party Squad berhak menolak atau membatalkan 
              hosting tanpa pemberitahuan sebelumnya. Semua peserta wajib mematuhi aturan venue 
              dan regulasi event. <strong>18+ only</strong>. Drink responsibly.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
