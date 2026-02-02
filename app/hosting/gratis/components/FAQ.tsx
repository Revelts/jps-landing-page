'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MessageCircle, Instagram } from 'lucide-react';

const faqs = [
  {
    q: 'Apakah hosting party gratis Jakarta benar-benar gratis?',
    a: 'Ya! Kamu tidak bayar entry fee, bahkan bisa dapat botol gratis tergantung event. Yang perlu kamu bawa hanya diri sendiri, teman-teman, dan energi positif.',
  },
  {
    q: 'Minimal berapa orang untuk hosting crowd?',
    a: 'Biasanya 5-8 orang tergantung venue dan event. Semakin banyak crowd, semakin besar benefit yang didapat seperti botol gratis.',
  },
  {
    q: 'Umur minimal berapa untuk ikut hosting party Jakarta?',
    a: '18+ wajib. Semua venue nightclub Jakarta memiliki age restriction. Bawa KTP untuk verifikasi di pintu masuk.',
  },
  {
    q: 'Apakah bisa request venue atau event tertentu?',
    a: 'Bisa! Tapi tergantung availability dan partnership JPS dengan venue tersebut. DM admin untuk request khusus.',
  },
  {
    q: 'Bagaimana dress code untuk hosting party gratis?',
    a: 'Smart casual atau club attire. Hindari: sandal jepit, kaos oblong, celana pendek. Venue berhak menolak jika dress code tidak sesuai.',
  },
  {
    q: 'Apakah aman untuk cewek ikut hosting crowd sendirian?',
    a: 'Aman! Komunitas JPS memiliki Code of Conduct yang ketat. Tapi kami tetap rekomendasikan datang dengan teman. Jakarta Party Squad punya zero tolerance untuk harassment.',
  },
  {
    q: 'Berapa lama proses approval hosting?',
    a: 'Maksimal 24 jam. Biasanya lebih cepat (2-6 jam) jika kamu apply H-3 event. Last minute request sulit di-approve karena slot terbatas.',
  },
  {
    q: 'Apakah ada biaya membership untuk join JPS?',
    a: 'TIDAK! Join komunitas Jakarta Party Squad 100% GRATIS. Tidak ada biaya membership, tidak ada iuran bulanan. Free forever!',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text tracking-wide">
              Pertanyaan Sering Ditanyakan (FAQ)
            </h2>
            <p className="text-lg text-text-secondary">
              Masih ada pertanyaan? Cek FAQ di bawah atau DM kami!
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-strong border-2 border-secondary/20 rounded-xl overflow-hidden hover:border-secondary/40 transition-all duration-500"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/5 transition-all duration-300"
                >
                  <span className="font-semibold text-lg pr-8 text-text-primary">
                    {faq.q}
                  </span>
                  <span className="text-2xl flex-shrink-0 text-secondary">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-text-secondary leading-relaxed border-t border-secondary/20 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-6 glass-strong rounded-xl border border-secondary/20">
            <p className="text-lg mb-4 text-text-primary font-semibold">
              Masih ada pertanyaan? Hubungi kami!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://chat.whatsapp.com/INOwwV4aSCFCWISZtoTmGG"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-bg-primary rounded-full hover:bg-green-600 hover:shadow-glow transition-all duration-400 font-medium hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Group
              </a>
              <a
                href="https://instagram.com/jakartapartysquad"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-bg-primary rounded-full hover:shadow-glow-purple transition-all duration-400 font-medium hover:-translate-y-0.5"
              >
                <Instagram className="w-5 h-5" />
                Instagram DM
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
