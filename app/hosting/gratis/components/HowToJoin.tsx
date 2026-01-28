import { Container } from '@/components/ui/Container';

const steps = [
  {
    number: 1,
    title: 'Join Komunitas',
    description: 'Klik tombol "Join Komunitas", follow IG @jakartapartysquad, dan isi form data diri (nama, IG, nomor WA). Gratis!',
    icon: '👥',
  },
  {
    number: 2,
    title: 'Pilih Event',
    description: 'Cek jadwal event di Event Calendar, pilih event yang kamu mau, dan pastikan ada slot hosting available',
    icon: '📅',
  },
  {
    number: 3,
    title: 'RSVP & Konfirmasi',
    description: 'DM admin JPS dengan detail crowd, tunggu approval (max 24 jam), dan dapat info detail event & dress code',
    icon: '✅',
  },
  {
    number: 4,
    title: 'Datang & Party!',
    description: 'Datang on-time ke venue, check-in via admin JPS, nikmati party & networking, post to IG story & tag @jakartapartysquad 🎉',
    icon: '🎉',
  },
];

export function HowToJoin() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Cara Daftar Hosting Party Jakarta
          </h2>
          <p className="text-lg text-gray-600">
            Mudah! Hanya 4 langkah dan kamu sudah bisa party gratis 🎊
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 to-purple-600 md:left-12" />
              )}

              {/* Step Card */}
              <div className="flex gap-6 mb-8 relative">
                {/* Number Circle */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg md:w-24 md:h-24 md:text-3xl z-10">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-4xl">{step.icon}</span>
                    <h3 className="text-2xl font-bold text-black">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/community"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition text-lg"
          >
            Mulai Step 1: Join Komunitas (Free!) 🚀
          </a>
        </div>
      </Container>
    </section>
  );
}
