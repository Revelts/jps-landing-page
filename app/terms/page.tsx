/**
 * Terms of Service Page
 * Single Responsibility: Display terms of service
 * SEO: Basic terms page
 */
import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata: Metadata = genMeta({
  title: 'Terms of Service',
  description: 'Terms of Service for Jakarta Party Squad. Read our community guidelines and usage terms.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <Section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-secondary/5 animate-gradient-shift bg-[length:200%_200%]" />
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <Heading level={1} align="center" className="gradient-text tracking-wide">
            Terms of Service
          </Heading>
          
          <div className="space-y-6">
            <Text size="sm" color="muted" align="center" className="text-text-tertiary">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>

            <div className="space-y-8 glass-strong p-8 rounded-2xl border border-secondary/20">
              <div className="space-y-3">
                <Heading level={2} className="text-secondary">1. Acceptance of Terms</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  By accessing and using Jakarta Party Squad services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">2. Community Guidelines</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  Members are expected to treat each other with respect, maintain appropriate behavior at events, and follow venue rules. Harassment, discrimination, or disruptive behavior will not be tolerated.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">3. Event Participation</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  When participating in events organized or promoted by Jakarta Party Squad, you agree to follow venue regulations, local laws, and our community standards. You are responsible for your own safety and behavior.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-accent">4. Content and Media</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  By attending our events, you consent to being photographed or filmed for promotional purposes. We respect your privacy and will remove any content upon request.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">5. Partnership Terms</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  Business partnerships and collaborations are subject to separate agreements. Contact us directly to discuss partnership opportunities and specific terms.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">6. Liability Disclaimer</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  Jakarta Party Squad is not liable for any injuries, losses, or damages that may occur during events. Participants attend at their own risk and responsibility.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-secondary">7. Changes to Terms</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-secondary/20">
                <Heading level={2} className="text-accent">8. Contact Information</Heading>
                <Text size="base" color="secondary" className="text-text-secondary">
                  For questions about these Terms of Service, contact us via Instagram @jakartapartysquad or through our WhatsApp community.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
