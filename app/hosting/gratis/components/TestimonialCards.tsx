import { Container } from '@/components/ui/Container';
import Image from 'next/image';

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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Apa Kata Host Crowd Kami? ⭐
          </h2>
          <p className="text-lg text-gray-600">
            1,000+ members sudah merasakan pengalaman nightlife Jakarta berbeda!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={`${testimonial.name} - ${testimonial.role} Jakarta Party Squad`}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-black">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-indigo-600 font-medium">
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
