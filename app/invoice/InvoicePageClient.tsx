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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <Heading level={1} align="center" className="mb-2">
              Invoice Generator
            </Heading>
            <p className="text-gray-600">
              Create professional invoices for Jakarta Party Squad events
            </p>
          </div>

          {/* Invoice Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Invoice Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                {/* Logo */}
                <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-lg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}>
                  <Image
                    src="/assets/images/logo_3.png"
                    alt="Jakarta Party Squad Logo"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
                  <p className="text-sm text-gray-500">Jakarta Party Squad</p>
                </div>
              </div>

              {/* Date Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-indigo-500 transition"
                >
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {format(invoiceDate, 'dd MMM yyyy')}
                  </span>
                </button>

                {/* Simple Date Display (can be enhanced with react-datepicker) */}
                {showDatePicker && (
                  <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <input
                      type="date"
                      value={format(invoiceDate, 'yyyy-MM-dd')}
                      onChange={(e) => {
                        setInvoiceDate(new Date(e.target.value));
                        setShowDatePicker(false);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <div className="grid grid-cols-12 gap-4 mb-3 text-sm font-semibold text-gray-700">
                <div className="col-span-7">DETAILS</div>
                <div className="col-span-3 text-right">COST</div>
                <div className="col-span-2"></div>
              </div>

              {/* Item Rows */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 transition"
                  >
                    {/* Details Input */}
                    <div className="col-span-7">
                      <input
                        type="text"
                        value={item.details}
                        onChange={(e) => handleUpdateDetails(item.id, e.target.value)}
                        placeholder="e.g., DJ Performance - Saturday Night"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-right"
                      />
                    </div>

                    {/* Delete Button */}
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => handleRemoveRow(item.id)}
                        disabled={items.length === 1}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
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
                className="mt-4 flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Row
              </button>
            </div>

            {/* Total Section */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-end items-center gap-8">
                <span className="text-lg font-semibold text-gray-700">TOTAL:</span>
                <span className="text-3xl font-bold text-indigo-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">PAYMENT INFORMATION</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Account Name:</span>
                  <span className="font-semibold text-gray-900">WILHELMINA</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Bank:</span>
                  <span className="font-semibold text-gray-900">BCA</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Number:</span>
                  <span className="font-semibold text-indigo-600">2730116341</span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => setDownloadPDF(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
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
