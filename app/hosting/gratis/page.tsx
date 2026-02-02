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
import { Sparkles, Ticket, Camera, PartyPopper, Users, Clipboard, Smartphone, CheckCircle2 } from 'lucide-react';

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
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
          
          <div className="relative z-10 container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text tracking-wide">
              Apa Itu Hosting Crowd?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                <strong className="text-secondary">Hosting crowd</strong> adalah konsep di mana kamu dan teman-teman 
                datang ke event nightclub sebagai <strong className="text-accent">crowd</strong> yang membawa energi 
                dan vibes seru. Sebagai timbal balik, nightclub dan Jakarta Party Squad 
                memberikan benefit seperti:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div className="flex items-start gap-3 p-4 glass rounded-lg border border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500">
                  <Sparkles className="w-8 h-8 text-secondary flex-shrink-0" />
                  <span className="text-text-primary"><strong className="text-secondary">Botol gratis</strong> (biasanya 1 botol per 5-8 orang)</span>
                </div>
                <div className="flex items-start gap-3 p-4 glass rounded-lg border border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500">
                  <Ticket className="w-8 h-8 text-secondary flex-shrink-0" />
                  <span className="text-text-primary"><strong className="text-secondary">Free entry</strong> atau priority access</span>
                </div>
                <div className="flex items-start gap-3 p-4 glass rounded-lg border border-accent/20 hover:border-accent/40 hover:shadow-glow-purple-sm transition-all duration-500">
                  <Camera className="w-8 h-8 text-accent flex-shrink-0" />
                  <span className="text-text-primary"><strong className="text-accent">Dokumentasi profesional</strong> foto & video</span>
                </div>
                <div className="flex items-start gap-3 p-4 glass rounded-lg border border-accent/20 hover:border-accent/40 hover:shadow-glow-purple-sm transition-all duration-500">
                  <PartyPopper className="w-8 h-8 text-accent flex-shrink-0" />
                  <span className="text-text-primary"><strong className="text-accent">Event exclusive</strong> dengan guest DJ internasional</span>
                </div>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">
                Cocok banget buat kamu yang suka party bareng circle, cari pengalaman baru, 
                atau pengen explore <strong className="gradient-text">nightlife Jakarta</strong> tanpa biaya mahal!
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <BenefitsGrid />

        {/* How to Join */}
        <HowToJoin />

        {/* Requirements */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
          
          <div className="relative z-10 container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text tracking-wide">
              Syarat Hosting Party Gratis Jakarta
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 glass rounded-xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1">
                <div className="mb-4">
                  <Users className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  1. Join Komunitas (Free!)
                </h3>
                <ul className="space-y-2 text-text-tertiary">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Follow IG @jakartapartysquad</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Join WhatsApp group</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Isi form member (5 menit)</li>
                </ul>
              </div>

              <div className="p-6 glass rounded-xl border-2 border-accent/20 hover:border-accent/40 hover:shadow-glow-purple-sm transition-all duration-500 hover:-translate-y-1">
                <div className="mb-4">
                  <PartyPopper className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-accent">
                  2. Ajak Minimal 5-8 Orang
                </h3>
                <ul className="space-y-2 text-text-tertiary">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Crowd minimal 5-8 orang</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Semua wajib 18+ (bawa KTP)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Dress code: Smart casual</li>
                </ul>
              </div>

              <div className="p-6 glass rounded-xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1">
                <div className="mb-4">
                  <Clipboard className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  3. Ikuti Regulasi Event
                </h3>
                <ul className="space-y-2 text-text-tertiary">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Datang on-time (21:00-22:00)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Bawa energi & vibes positif</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Patuhi aturan venue</li>
                </ul>
              </div>

              <div className="p-6 glass rounded-xl border-2 border-accent/20 hover:border-accent/40 hover:shadow-glow-purple-sm transition-all duration-500 hover:-translate-y-1">
                <div className="mb-4">
                  <Smartphone className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-accent">
                  4. RSVP via Admin JPS
                </h3>
                <ul className="space-y-2 text-text-tertiary">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Konfirmasi H-3</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Kirim data crowd</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Tunggu approval</li>
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
        <section className="py-8 relative overflow-hidden border-t border-secondary/20">
          <div className="absolute inset-0 bg-bg-secondary" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          
          <div className="relative z-10 container mx-auto px-4 max-w-4xl">
            <p className="text-sm text-text-tertiary text-center leading-relaxed">
              <strong className="text-text-secondary">Disclaimer:</strong> Program hosting gratis tersedia sesuai availability 
              dan partnership dengan venue. Jakarta Party Squad berhak menolak atau membatalkan 
              hosting tanpa pemberitahuan sebelumnya. Semua peserta wajib mematuhi aturan venue 
              dan regulasi event. <strong className="text-secondary">18+ only</strong>. Drink responsibly.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
