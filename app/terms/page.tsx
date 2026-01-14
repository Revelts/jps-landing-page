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
      <Section className="bg-gradient-to-b from-gray-50 to-white pt-24 sm:pt-28">
        <div className="max-w-4xl mx-auto space-y-8">
          <Heading level={1} align="center">
            Terms of Service
          </Heading>
          
          <div className="space-y-6">
            <Text size="sm" color="muted" align="center">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>

            <div className="space-y-8">
              <div className="space-y-3">
                <Heading level={2}>1. Acceptance of Terms</Heading>
                <Text size="base" color="secondary">
                  By accessing and using Jakarta Party Squad services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </Text>
              </div>

              <div className="space-y-3">
                <Heading level={2}>2. Community Guidelines</Heading>
                <Text size="base" color="secondary">
                  Members are expected to treat each other with respect, maintain appropriate behavior at events, and follow venue rules. Harassment, discrimination, or disruptive behavior will not be tolerated.
                </Text>
              </div>

              <div className="space-y-3">
                <Heading level={2}>3. Event Participation</Heading>
                <Text size="base" color="secondary">
                  When participating in events organized or promoted by Jakarta Party Squad, you agree to follow venue regulations, local laws, and our community standards. You are responsible for your own safety and behavior.
                </Text>
              </div>

              <div className="space-y-3">
                <Heading level={2}>4. Content and Media</Heading>
                <Text size="base" color="secondary">
                  By attending our events, you consent to being photographed or filmed for promotional purposes. We respect your privacy and will remove any content upon request.
                </Text>
              </div>

              <div className="space-y-3">
                <Heading level={2}>5. Partnership Terms</Heading>
                <Text size="base" color="secondary">
                  Business partnerships and collaborations are subject to separate agreements. Contact us directly to discuss partnership opportunities and specific terms.
                </Text>
              </div>

              <div className="space-y-3">
                <Heading level={2}>6. Liability Disclaimer</Heading>
                <Text size="base" color="secondary">
                  Jakarta Party Squad is not liable for any injuries, losses, or damages that may occur during events. Participants attend at their own risk and responsibility.
                </Text>
              </div>

              <div className="space-y-3">
                <Heading level={2}>7. Changes to Terms</Heading>
                <Text size="base" color="secondary">
                  We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.
                </Text>
              </div>

              <div className="space-y-3">
                <Heading level={2}>8. Contact Information</Heading>
                <Text size="base" color="secondary">
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
