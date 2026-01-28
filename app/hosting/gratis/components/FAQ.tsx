'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';

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
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Pertanyaan Sering Ditanyakan (FAQ)
            </h2>
            <p className="text-lg text-gray-600">
              Masih ada pertanyaan? Cek FAQ di bawah atau DM kami!
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-lg pr-8 text-black">
                    {faq.q}
                  </span>
                  <span className="text-2xl flex-shrink-0 text-indigo-600">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <p className="text-lg mb-4 text-black font-semibold">
              Masih ada pertanyaan? Hubungi kami!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://chat.whatsapp.com/INOwwV4aSCFCWISZtoTmGG"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition font-medium"
              >
                <span>💬</span>
                WhatsApp Group
              </a>
              <a
                href="https://instagram.com/jakartapartysquad"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition font-medium"
              >
                <span>📱</span>
                Instagram DM
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
