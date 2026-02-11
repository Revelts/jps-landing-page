/**
 * Invoice Generator Page - Client Component
 * Modern invoice creator with PDF export for Jakarta Party Squad
 */
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Trash2, Plus, Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import PDF generator (client-side only)
const InvoicePDFGenerator = dynamic(() => import('./components/InvoicePDFGenerator'), {
  ssr: false,
});

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

export default function InvoicePageClient() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, details: '', cost: 0 },
  ]);
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [downloadPDF, setDownloadPDF] = useState(false);
  const [recipient, setRecipient] = useState<string>('');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    accountName: 'WILHELMINA',
    bank: 'BCA',
    accountNumber: '2730116341',
  });

  // Add new row
  const handleAddRow = () => {
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    setItems([...items, { id: newId, details: '', cost: 0 }]);
  };

  // Remove row
  const handleRemoveRow = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Update item details
  const handleUpdateDetails = (id: number, details: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, details } : item
    ));
  };

  // Update item cost
  const handleUpdateCost = (id: number, cost: number) => {
    // Validate non-negative
    const validCost = Math.max(0, cost);
    setItems(items.map(item =>
      item.id === id ? { ...item, cost: validCost } : item
    ));
  };

  // Calculate total
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.cost || 0), 0);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 sm:py-12 flex items-center justify-center">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      
      <Container className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </a>
          </div>

          {/* Page Header */}
          <div className="text-center mb-10">
            <Heading level={1} align="center" className="mb-3 gradient-text tracking-wide text-4xl sm:text-5xl">
              Invoice Generator
            </Heading>
            <p className="text-text-secondary text-base mx-auto">
              Create professional invoices for Jakarta Party Squad events
            </p>
          </div>

          {/* Invoice Card */}
          <div className="glass-strong rounded-2xl shadow-glass border-2 border-secondary/20 p-6 sm:p-8 lg:p-12 w-full">
            {/* Invoice Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b-2 border-secondary/20 gap-4">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                {/* Logo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-surface/50 flex items-center justify-center shadow-glow border-2 border-secondary/30">
                  <Image
                    src="/assets/images/logo_3.png"
                    alt="Jakarta Party Squad Logo"
                    width={80}
                    height={80}
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide">INVOICE</h2>
                  <p className="text-sm sm:text-base text-text-tertiary mt-1">Jakarta Party Squad</p>
                </div>
              </div>

              {/* Date Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-3 px-5 py-3 border-2 border-secondary/30 bg-surface/50 rounded-xl hover:border-secondary hover:shadow-glow-sm transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="text-sm sm:text-base font-semibold text-text-primary">
                    {format(invoiceDate, 'dd MMM yyyy')}
                  </span>
                </button>

                {/* Simple Date Display (can be enhanced with react-datepicker) */}
                {showDatePicker && (
                  <div className="absolute right-0 mt-2 p-4 glass-strong border-2 border-secondary/30 rounded-xl shadow-glass z-10">
                    <input
                      type="date"
                      value={format(invoiceDate, 'yyyy-MM-dd')}
                      onChange={(e) => {
                        setInvoiceDate(new Date(e.target.value));
                        setShowDatePicker(false);
                      }}
                      className="px-4 py-2.5 bg-surface/50 border-2 border-secondary/30 text-text-primary rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Recipient Section */}
            <div className="mb-8 bg-gradient-to-br from-secondary/10 via-accent/10 to-secondary/10 rounded-2xl p-6 sm:p-8 border-2 border-secondary/20 shadow-glow">
              <h3 className="text-sm sm:text-base font-bold text-text-primary mb-4 tracking-wider uppercase flex items-center gap-2">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Kepada / Recipient
              </h3>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Nama penerima invoice / Client name"
                className="w-full px-4 py-3 bg-surface/50 border-2 border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm sm:text-base"
              />
            </div>

            {/* Items Table */}
            <div className="mb-10 w-full">
              <div className="grid grid-cols-12 gap-3 sm:gap-4 mb-4 pb-3 border-b border-secondary/20">
                <div className="col-span-6 sm:col-span-7 text-xs sm:text-sm font-bold text-text-primary tracking-wider uppercase">Details</div>
                <div className="col-span-4 sm:col-span-3 text-right text-xs sm:text-sm font-bold text-text-primary tracking-wider uppercase">Cost (IDR)</div>
                <div className="col-span-2 text-center text-xs sm:text-sm font-bold text-text-primary tracking-wider uppercase hidden sm:block"></div>
              </div>

              {/* Item Rows */}
              <div className="space-y-3 w-full">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 sm:gap-4 items-center bg-surface/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-300"
                  >
                    {/* Details Input */}
                    <div className="col-span-12 sm:col-span-7">
                      <input
                        type="text"
                        value={item.details}
                        onChange={(e) => handleUpdateDetails(item.id, e.target.value)}
                        placeholder={`Item ${index + 1} - e.g., DJ Performance, Venue Rental`}
                        className="w-full px-4 py-3 bg-surface/50 border-2 border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm sm:text-base"
                      />
                    </div>

                    {/* Cost Input */}
                    <div className="col-span-10 sm:col-span-3">
                      <input
                        type="number"
                        value={item.cost || ''}
                        onChange={(e) => handleUpdateCost(item.id, Number(e.target.value))}
                        min="0"
                        placeholder="0"
                        className="w-full px-4 py-3 bg-surface/50 border-2 border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right font-semibold text-sm sm:text-base"
                      />
                    </div>

                    {/* Delete Button */}
                    <div className="col-span-2 flex justify-center sm:justify-end">
                      <button
                        onClick={() => handleRemoveRow(item.id)}
                        disabled={items.length === 1}
                        className="p-2.5 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-transparent hover:border-red-500/30"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Row Button */}
              <button
                onClick={handleAddRow}
                className="mt-5 flex items-center gap-2 px-5 py-3 text-secondary hover:bg-secondary/10 rounded-xl transition-all duration-300 font-semibold border-2 border-secondary/30 hover:border-secondary/50 hover:shadow-glow-sm"
              >
                <Plus className="w-5 h-5" />
                Add Row
              </button>
            </div>

            {/* Total Section */}
            <div className="border-t-2 border-secondary/20 pt-8 mb-10 w-full">
              <div className="flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-4 sm:gap-12 bg-gradient-to-r from-secondary/5 to-accent/5 p-6 rounded-xl">
                <span className="text-lg sm:text-xl font-bold text-text-secondary tracking-wider uppercase">Total:</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text text-center">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gradient-to-br from-secondary/10 via-accent/10 to-secondary/10 rounded-2xl p-6 sm:p-8 mb-8 border-2 border-secondary/20 shadow-glow w-full">
              <h3 className="text-sm sm:text-base font-bold text-text-primary mb-5 tracking-wider uppercase flex items-center gap-2">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Information
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-text-secondary text-sm">Account Name:</label>
                  <input
                    type="text"
                    value={paymentInfo.accountName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, accountName: e.target.value })}
                    placeholder="e.g., WILHELMINA"
                    className="w-full px-4 py-3 bg-surface/50 border-2 border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm sm:text-base font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-text-secondary text-sm">Bank:</label>
                  <input
                    type="text"
                    value={paymentInfo.bank}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, bank: e.target.value })}
                    placeholder="e.g., BCA, Mandiri, BNI"
                    className="w-full px-4 py-3 bg-surface/50 border-2 border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm sm:text-base font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-text-secondary text-sm">Account Number:</label>
                  <input
                    type="text"
                    value={paymentInfo.accountNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, accountNumber: e.target.value })}
                    placeholder="e.g., 2730116341"
                    className="w-full px-4 py-3 bg-surface/50 border-2 border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm sm:text-base font-semibold tracking-wider"
                  />
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => setDownloadPDF(true)}
              className="w-full flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-secondary to-accent text-white rounded-2xl hover:shadow-glow-lg transition-all duration-400 font-bold text-base sm:text-lg hover:-translate-y-1 border-2 border-secondary/30"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              Download PDF Invoice
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-10 text-xs sm:text-sm text-text-tertiary">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="whitespace-nowrap">Jakarta Party Squad • Professional Event Services</span>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            </div>
          </div>
        </div>
      </Container>

      {/* PDF Generator (Hidden, only triggers download) */}
      {downloadPDF && (
        <InvoicePDFGenerator
          items={items}
          total={calculateTotal()}
          date={invoiceDate}
          recipient={recipient}
          paymentInfo={paymentInfo}
          onComplete={() => setDownloadPDF(false)}
        />
      )}
    </div>
  );
}
