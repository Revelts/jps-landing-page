import { Container } from '@/components/ui/Container';
import { Sparkles, Handshake, PartyPopper, Camera } from 'lucide-react';

const benefits = [
  {
    icon: Sparkles,
    title: 'Party Gratis (Hemat Jutaan!)',
    description: 'Bayangkan, budget clubbing Jakarta biasanya Rp 150K-400K/orang. Kalau ikut hosting crowd? GRATIS! Bahkan kadang dapat botol free.',
  },
  {
    icon: Handshake,
    title: 'Networking Premium',
    description: 'Ketemu KOL party Jakarta, influencer, entrepreneur muda, dan circle baru yang satu frekuensi. Bangun relasi yang bermanfaat.',
  },
  {
    icon: PartyPopper,
    title: 'Access Event Exclusive',
    description: 'Guest DJ internasional, festival musik Jakarta, brand activation eksklusif, private party venue premium. Member priority!',
  },
  {
    icon: Camera,
    title: 'Content Creator Friendly',
    description: 'Foto & video berkualitas tinggi, tag & credit di IG JPS (10K+ followers), boost personal branding kamu.',
  },
];

export function BenefitsGrid() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
      
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text tracking-wide">
            Benefit Jadi Host Crowd Jakarta Party Squad
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Lebih dari sekadar party gratis – ini adalah lifestyle upgrade!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="p-6 glass rounded-xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1 group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  {benefit.title}
                </h3>
                <p className="text-text-tertiary">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
