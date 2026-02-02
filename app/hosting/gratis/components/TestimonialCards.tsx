import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Kevin Hartanto',
    role: 'Host Crowd Member',
    avatar: '/assets/images/kevin.png',
    rating: 5,
    text: 'Gila sih, gue udah 5x ikut hosting JPS dan semua event selalu seru! Hemat budget banget dan ketemu banyak orang baru. Recommended!',
    event: 'The H Club',
  },
  {
    name: 'Wilhelmina Puspa',
    role: 'Regular Member',
    avatar: '/assets/images/wilhelmina.png',
    rating: 5,
    text: 'Pertama kali cobain hosting gratis, skeptis. Tapi ternyata beneran dapet botol free dan vibes-nya keren banget. Sekarang jadi rutin ikut setiap weekend!',
    event: 'Fyne Jakarta',
  },
  {
    name: 'Firman',
    role: 'Host Crowd Leader',
    avatar: '/assets/images/firman.png',
    rating: 5,
    text: 'Best decision join JPS. Networking-nya gokil, event-nya berkelas, dan yang paling penting: party gratis di nightclub top Jakarta!',
    event: 'Bengkel SCBD',
  },
];

export function TestimonialCards() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
      
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text tracking-wide inline-flex items-center justify-center gap-3 flex-wrap">
            Apa Kata Host Crowd Kami?
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </h2>
          <p className="text-lg text-text-secondary">
            1,000+ members sudah merasakan pengalaman nightlife Jakarta berbeda!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 glass-strong rounded-xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-secondary mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="rounded-full overflow-hidden border-2 border-secondary/30">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} - ${testimonial.role} Jakarta Party Squad`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-text-tertiary">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-secondary font-medium">
                    @ {testimonial.event}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
