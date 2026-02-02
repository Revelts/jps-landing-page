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

export default function InvoicePageClient() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, details: '', cost: 0 },
  ]);
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [downloadPDF, setDownloadPDF] = useState(false);

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
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <Heading level={1} align="center" className="mb-2 gradient-text tracking-wide">
              Invoice Generator
            </Heading>
            <p className="text-text-secondary">
              Create professional invoices for Jakarta Party Squad events
            </p>
          </div>

          {/* Invoice Card */}
          <div className="glass-strong rounded-2xl shadow-glass border-2 border-secondary/20 p-8 md:p-12">
            {/* Invoice Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-secondary/20">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                {/* Logo */}
                <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-glow border border-secondary/30">
                  <Image
                    src="/assets/images/logo_3.png"
                    alt="Jakarta Party Squad Logo"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-text-primary tracking-wide">INVOICE</h2>
                  <p className="text-sm text-text-tertiary">Jakarta Party Squad</p>
                </div>
              </div>

              {/* Date Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2 px-4 py-2 border border-secondary/30 bg-surface/50 rounded-lg hover:border-secondary hover:shadow-glow-sm transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-text-primary">
                    {format(invoiceDate, 'dd MMM yyyy')}
                  </span>
                </button>

                {/* Simple Date Display (can be enhanced with react-datepicker) */}
                {showDatePicker && (
                  <div className="absolute right-0 mt-2 p-4 glass-strong border border-secondary/30 rounded-lg shadow-glass z-10">
                    <input
                      type="date"
                      value={format(invoiceDate, 'yyyy-MM-dd')}
                      onChange={(e) => {
                        setInvoiceDate(new Date(e.target.value));
                        setShowDatePicker(false);
                      }}
                      className="px-3 py-2 bg-surface/50 border border-secondary/30 text-text-primary rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <div className="grid grid-cols-12 gap-4 mb-3 text-sm font-semibold text-text-primary tracking-wide">
                <div className="col-span-7">DETAILS</div>
                <div className="col-span-3 text-right">COST</div>
                <div className="col-span-2"></div>
              </div>

              {/* Item Rows */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-center bg-surface/40 backdrop-blur-sm p-3 rounded-lg border border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-300"
                  >
                    {/* Details Input */}
                    <div className="col-span-7">
                      <input
                        type="text"
                        value={item.details}
                        onChange={(e) => handleUpdateDetails(item.id, e.target.value)}
                        placeholder="e.g., DJ Performance - Saturday Night"
                        className="w-full px-3 py-2 bg-surface/50 border border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm"
                      />
                    </div>

                    {/* Cost Input */}
                    <div className="col-span-3">
                      <input
                        type="number"
                        value={item.cost || ''}
                        onChange={(e) => handleUpdateCost(item.id, Number(e.target.value))}
                        min="0"
                        placeholder="0"
                        className="w-full px-3 py-2 bg-surface/50 border border-secondary/30 text-text-primary placeholder:text-text-muted rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm text-right"
                      />
                    </div>

                    {/* Delete Button */}
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => handleRemoveRow(item.id)}
                        disabled={items.length === 1}
                        className="p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Row Button */}
              <button
                onClick={handleAddRow}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-secondary hover:bg-secondary/10 rounded-lg transition-all duration-300 font-medium border border-secondary/20 hover:border-secondary/40"
              >
                <Plus className="w-4 h-4" />
                Add Row
              </button>
            </div>

            {/* Total Section */}
            <div className="border-t border-secondary/20 pt-6 mb-8">
              <div className="flex justify-end items-center gap-8">
                <span className="text-lg font-semibold text-text-secondary tracking-wide">TOTAL:</span>
                <span className="text-3xl font-bold gradient-text">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-6 mb-8 border border-secondary/20">
              <h3 className="text-sm font-semibold text-text-primary mb-3 tracking-wide">PAYMENT INFORMATION</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span className="font-medium">Account Name:</span>
                  <span className="font-semibold text-text-primary">WILHELMINA</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Bank:</span>
                  <span className="font-semibold text-text-primary">BCA</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Number:</span>
                  <span className="font-semibold text-secondary">2730116341</span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => setDownloadPDF(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-secondary to-accent text-bg-primary rounded-xl hover:shadow-glow-lg transition-all duration-400 font-bold text-lg hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-text-tertiary">
            <p>Jakarta Party Squad • Professional Event Services</p>
          </div>
        </div>
      </Container>

      {/* PDF Generator (Hidden, only triggers download) */}
      {downloadPDF && (
        <InvoicePDFGenerator
          items={items}
          total={calculateTotal()}
          date={invoiceDate}
          onComplete={() => setDownloadPDF(false)}
        />
      )}
    </div>
  );
}
