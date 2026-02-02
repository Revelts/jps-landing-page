/**
 * Privacy Policy Page
 * Single Responsibility: Display privacy policy
 * SEO: Basic privacy policy page
 */
import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata: Metadata = genMeta({
  title: 'Privacy Policy',
  description: 'Privacy policy for Jakarta Party Squad. Learn how we collect, use, and protect your information.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <Section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
        </div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <Heading level={1} align="center" className="gradient-text tracking-wide">
            Privacy Policy
          </Heading>
          
          <div className="space-y-6">
            <Text size="sm" color="muted" align="center" className="text-text-tertiary">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>

            <div className="space-y-8 glass-strong p-8 rounded-2xl border border-secondary/20">
              <div className="space-y-3">
                <Heading level={2} className="text-secondary">1. Information We Collect</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  Jakarta Party Squad collects information that you voluntarily provide when joining our community, such as your name and contact details through WhatsApp groups or social media platforms.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">2. How We Use Your Information</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  We use the information we collect to communicate event updates, share community activities, and improve our services. Your information is never sold to third parties.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">3. Data Protection</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">4. Third-Party Services</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  Our website may contain links to third-party platforms like Instagram, TikTok, and WhatsApp. We are not responsible for the privacy practices of these external services.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-accent">5. Your Rights</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  You have the right to access, update, or delete your personal information at any time. Contact us through our social media channels to exercise these rights.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">6. Contact Us</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  If you have questions about this Privacy Policy, please contact us via Instagram @jakartapartysquad or through our WhatsApp community.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
