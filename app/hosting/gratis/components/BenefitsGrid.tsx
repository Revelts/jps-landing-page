import { Container } from '@/components/ui/Container';

const benefits = [
  {
    icon: '🍾',
    title: 'Party Gratis (Hemat Jutaan!)',
    description: 'Bayangkan, budget clubbing Jakarta biasanya Rp 150K-400K/orang. Kalau ikut hosting crowd? GRATIS! Bahkan kadang dapat botol free.',
  },
  {
    icon: '🤝',
    title: 'Networking Premium',
    description: 'Ketemu KOL party Jakarta, influencer, entrepreneur muda, dan circle baru yang satu frekuensi. Bangun relasi yang bermanfaat.',
  },
  {
    icon: '🎉',
    title: 'Access Event Exclusive',
    description: 'Guest DJ internasional, festival musik Jakarta, brand activation eksklusif, private party venue premium. Member priority!',
  },
  {
    icon: '📸',
    title: 'Content Creator Friendly',
    description: 'Foto & video berkualitas tinggi, tag & credit di IG JPS (10K+ followers), boost personal branding kamu.',
  },
];

export function BenefitsGrid() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Benefit Jadi Host Crowd Jakarta Party Squad
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lebih dari sekadar party gratis – ini adalah lifestyle upgrade!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-lg transition group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                {benefit.title}
              </h3>
              <p className="text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
