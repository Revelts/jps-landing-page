/**
 * Invoice Generator Page
 * Modern invoice creator with PDF export for Jakarta Party Squad
 */
import { Metadata } from 'next';
import InvoicePageClient from './InvoicePageClient';

export const metadata: Metadata = {
  title: 'Invoice Generator - Jakarta Party Squad',
  description: 'Create professional invoices for Jakarta Party Squad events with instant PDF download.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvoicePage() {
  return <InvoicePageClient />;
}
