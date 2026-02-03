/**
 * Invoice PDF Generator Component
 * Uses @react-pdf/renderer for client-side PDF generation
 */
'use client';

import { useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

interface InvoiceItem {
  id: number;
  details: string;
  cost: number;
}

interface InvoicePDFGeneratorProps {
  items: InvoiceItem[];
  total: number;
  date: Date;
  onComplete: () => void;
}

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#6366f1',
    paddingBottom: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 12,
    objectFit: 'contain',
  },
  titleSection: {
    flexDirection: 'column',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#6b7280',
  },
  dateSection: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
  },
  detailsColumn: {
    width: '70%',
  },
  costColumn: {
    width: '30%',
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableRowText: {
    fontSize: 10,
    color: '#374151',
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTop: 2,
    borderTopColor: '#6366f1',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginRight: 30,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  paymentSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  paymentValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 15,
  },
});

// PDF Document Component
const InvoiceDocument = ({ items, total, date }: Omit<InvoicePDFGeneratorProps, 'onComplete'>) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            {/* Logo image for invoice header */}
            <Image
              src="/assets/images/logo_3.png"
              style={styles.logoImage}
            />
            <View style={styles.titleSection}>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.subtitle}>Jakarta Party Squad</Text>
            </View>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.dateLabel}>Date</Text>
            <Text style={styles.dateValue}>{format(date, 'dd MMM yyyy')}</Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.detailsColumn]}>Details</Text>
          <Text style={[styles.tableHeaderText, styles.costColumn]}>Cost</Text>
        </View>

        {/* Table Rows */}
        {items.map((item, index) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.tableRowText, styles.detailsColumn]}>
              {item.details || `Item ${index + 1}`}
            </Text>
            <Text style={[styles.tableRowText, styles.costColumn]}>
              {formatCurrency(item.cost)}
            </Text>
          </View>
        ))}

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Payment Information</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Account Name:</Text>
            <Text style={styles.paymentValue}>WILHELMINA</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Bank:</Text>
            <Text style={styles.paymentValue}>BCA</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Account Number:</Text>
            <Text style={styles.paymentValue}>2730116341</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Jakarta Party Squad • Professional Event Services{'\n'}
          Instagram: @jakartapartysquad • https://jakartapartysquad.com
        </Text>
      </Page>
    </Document>
  );
};

// Main Generator Component
export default function InvoicePDFGenerator({ items, total, date, onComplete }: InvoicePDFGeneratorProps) {
  useEffect(() => {
    const generatePDF = async () => {
      try {
        // Generate PDF blob
        const blob = await pdf(
          <InvoiceDocument items={items} total={total} date={date} />
        ).toBlob();

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `JPS-Invoice-${format(date, 'yyyy-MM-dd')}.pdf`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        URL.revokeObjectURL(url);
        
        // Notify completion
        setTimeout(() => {
          onComplete();
        }, 100);
      } catch (error) {
        console.error('PDF generation failed:', error);
        alert('Failed to generate PDF. Please try again.');
        onComplete();
      }
    };

    generatePDF();
  }, [items, total, date, onComplete]);

  return null; // No UI needed, just triggers download
}
