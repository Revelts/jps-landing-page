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

interface PaymentInfo {
  accountName: string;
  bank: string;
  accountNumber: string;
}

interface InvoicePDFGeneratorProps {
  items: InvoiceItem[];
  total: number;
  date: Date;
  recipient: string;
  paymentInfo: PaymentInfo;
  onComplete: () => void;
}

// PDF Styles - Dark Theme
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#1a1a1a',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
    borderBottomStyle: 'solid',
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
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#9ca3af',
  },
  dateSection: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e5e7eb',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#e5e7eb',
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
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
    borderBottomStyle: 'solid',
  },
  tableRowText: {
    fontSize: 10,
    color: '#d1d5db',
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#6366f1',
    borderTopStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e5e7eb',
    marginRight: 30,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#818cf8',
  },
  paymentSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#404040',
    borderStyle: 'solid',
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e5e7eb',
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
    color: '#9ca3af',
  },
  paymentValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#6b7280',
    borderTopWidth: 1,
    borderTopColor: '#404040',
    borderTopStyle: 'solid',
    paddingTop: 15,
  },
  recipientSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    borderLeftStyle: 'solid',
  },
  recipientLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 6,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  recipientValue: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

// PDF Document Component
const InvoiceDocument = ({ items, total, date, recipient, paymentInfo }: Omit<InvoicePDFGeneratorProps, 'onComplete'>) => {
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
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
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

        {/* Recipient Section */}
        {recipient && (
          <View style={styles.recipientSection}>
            <Text style={styles.recipientLabel}>Kepada / Recipient:</Text>
            <Text style={styles.recipientValue}>{recipient}</Text>
          </View>
        )}

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
            <Text style={styles.paymentValue}>{paymentInfo.accountName}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Bank:</Text>
            <Text style={styles.paymentValue}>{paymentInfo.bank}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Account Number:</Text>
            <Text style={styles.paymentValue}>{paymentInfo.accountNumber}</Text>
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
export default function InvoicePDFGenerator({ items, total, date, recipient, paymentInfo, onComplete }: InvoicePDFGeneratorProps) {
  useEffect(() => {
    const generatePDF = async () => {
      try {
        // Generate PDF blob
        const blob = await pdf(
          <InvoiceDocument items={items} total={total} date={date} recipient={recipient} paymentInfo={paymentInfo} />
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
  }, [items, total, date, recipient, paymentInfo, onComplete]);

  return null; // No UI needed, just triggers download
}
