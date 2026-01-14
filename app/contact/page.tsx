/**
 * Contact Page
 * Single Responsibility: Display contact information and social links
 * SEO: Optimized for "contact" keywords
 */
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Contact - Partnership & Event Collaboration Jakarta Nightlife',
  description:
    'Hubungi Jakarta Party Squad untuk partnership event nightclub, brand activation, media collaboration, atau influencer management. Tim kami siap membantu event nightlife dan party Anda di Jakarta. Contact us now!',
  keywords:
    'contact jakarta party squad, jakarta nightlife partnership, jakarta event collaboration, jakarta nightclub partnership, jakarta party organizer contact, jakarta entertainment partnership, jakarta event agency, jakarta nightlife contact, jakarta party planning, jakarta brand activation',
  canonical: '/contact',
});

export default function ContactPage() {
  const { about, mainHero, company } = siteConfig;

  const contactMethods = [
    {
      title: 'Instagram',
      description: 'Follow us for daily updates and event announcements',
      href: about.socialMedia.instagram,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'text-pink-600',
    },
    {
      title: 'TikTok',
      description: 'Watch our latest event highlights and behind-the-scenes',
      href: about.socialMedia.tiktok,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      color: 'text-gray-900',
    },
    {
      title: 'Discord',
      description: 'Join our Discord community for real-time updates',
      href: about.socialMedia.discord,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      color: 'text-indigo-600',
    },
    {
      title: 'WhatsApp Community',
      description: 'Join 2,000+ members in our WhatsApp group',
      href: mainHero.secondaryAction.href,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: 'text-green-600',
    },
  ];

  return (
    <>
      {/* Page Hero */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-gray-50 pt-24 sm:pt-28 md:pt-32">
        <div className="text-center space-y-5 sm:space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact Us
          </div>
          
          {/* Heading */}
          <Heading level={1} align="center" className="!leading-tight">
            Get in Touch
          </Heading>
          
          {/* Description */}
          <Text size="lg" color="secondary" align="center" className="leading-relaxed">
            Have questions or interested in partnership? We'd love to hear from you!
          </Text>
        </div>
      </Section>

      {/* Contact Methods */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {contactMethods.map((method, index) => (
              <Link
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card hover clickable className="h-full border-2 border-gray-100 group-hover:border-primary-200">
                  <div className="flex flex-col items-center text-center space-y-5">
                    {/* Icon */}
                    <div className={`${method.color} p-4 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-200`}>
                      {method.icon}
                    </div>
                    {/* Content */}
                    <div className="space-y-2">
                      <Heading level={3} align="center" className="text-lg sm:text-xl font-semibold">
                        {method.title}
                      </Heading>
                      <Text size="sm" color="secondary" align="center" className="leading-relaxed">
                        {method.description}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Partnership Inquiry */}
      <Section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center border-2 border-gray-100">
            <div className="space-y-8 sm:space-y-10">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Header */}
              <div className="space-y-4">
                <Heading level={2} align="center">
                  Partnership Opportunities
                </Heading>
                <Text size="lg" color="secondary" align="center" className="max-w-2xl mx-auto">
                  We collaborate with venues, brands, influencers, and content creators to bring exceptional nightlife experiences to Jakarta.
                </Text>
              </div>

              {/* Benefits List */}
              <div className="py-6 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <Text size="base" color="default" className="font-medium text-left">
                      Event Partnership
                    </Text>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <Text size="base" color="default" className="font-medium text-left">
                      Media & Content
                    </Text>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <Text size="base" color="default" className="font-medium text-left">
                      Brand Activation
                    </Text>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <Text size="base" color="default" className="font-medium text-left">
                      Talent Management
                    </Text>
                  </div>
                </div>
              </div>

              {/* CTA Button - dengan spacing yang cukup dari elemen di atasnya */}
              <div className="pt-4 sm:pt-6">
                <Link
                  href={mainHero.primaryAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 active:bg-primary-700 transition-all duration-200 min-h-[48px] text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <span>Start a Partnership</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Location/Info */}
      <Section className="bg-gradient-to-t from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center bg-white/50 backdrop-blur-sm border border-gray-200">
            <div className="space-y-5 sm:space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <Heading level={2} align="center">
                  Where to Find Us
                </Heading>
                <Text size="lg" color="secondary" align="center" className="max-w-2xl mx-auto leading-relaxed">
                  We're active across Jakarta's nightlife scene, hosting events at various venues throughout the city.
                </Text>
                <div className="pt-2">
                  <Text size="base" color="muted" align="center" className="italic">
                    Follow our social media to stay updated on our latest locations and events!
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
