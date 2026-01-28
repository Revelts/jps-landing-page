/**
 * Fluid Form Example
 * 
 * Demonstrates:
 * - Fluid input sizing
 * - Touch-friendly buttons (44px min height)
 * - Responsive form layout
 * - Accessible labels and focus states
 * 
 * Form adapts perfectly on all screen sizes
 * while maintaining usability and accessibility
 */

'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export function FluidFormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Section spacing="lg" container containerSize="sm">
      <Heading level={2} align="center">
        Get In Touch
      </Heading>
      <Text align="center" color="muted" className="mb-[var(--space-xl)]">
        Have questions? We'd love to hear from you.
      </Text>

      <Card padding="lg">
        <CardBody>
          <form onSubmit={handleSubmit} className="stack-lg">
            {/* Name Input - Fluid */}
            <div className="space-y-[var(--space-xs)]">
              <label
                htmlFor="name"
                className="block text-[var(--text-sm)] font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="
                  w-full
                  px-[var(--space-md)]
                  py-[var(--space-sm)]
                  text-[var(--text-base)]
                  rounded-[var(--radius-md)]
                  border border-gray-300
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all
                "
                placeholder="Your name"
              />
            </div>

            {/* Email Input - Fluid */}
            <div className="space-y-[var(--space-xs)]">
              <label
                htmlFor="email"
                className="block text-[var(--text-sm)] font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="
                  w-full
                  px-[var(--space-md)]
                  py-[var(--space-sm)]
                  text-[var(--text-base)]
                  rounded-[var(--radius-md)]
                  border border-gray-300
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all
                "
                placeholder="your@email.com"
              />
            </div>

            {/* Message Textarea - Fluid */}
            <div className="space-y-[var(--space-xs)]">
              <label
                htmlFor="message"
                className="block text-[var(--text-sm)] font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="
                  w-full
                  px-[var(--space-md)]
                  py-[var(--space-sm)]
                  text-[var(--text-base)]
                  rounded-[var(--radius-md)]
                  border border-gray-300
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all
                  resize-none
                "
                placeholder="Tell us what you're thinking..."
              />
            </div>

            {/* Submit Button - Touch-friendly */}
            <Button type="submit" size="lg" fullWidth>
              Send Message
            </Button>
          </form>
        </CardBody>
      </Card>
    </Section>
  );
}
