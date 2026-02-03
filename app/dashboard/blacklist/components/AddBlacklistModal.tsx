/**
 * Add Blacklist Modal Component
 * Modal for adding new blacklist entries
 */

'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/Text';

interface AddBlacklistModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AddBlacklistModal({ onClose, onSuccess }: AddBlacklistModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    instagram: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.phone && !formData.instagram) {
      setError('Please provide at least phone or Instagram');
      return;
    }

    if (!formData.reason.trim()) {
      setError('Reason is required');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/blacklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add blacklist entry');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding blacklist entry:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-strong border-2 border-secondary/30 rounded-2xl p-8 max-w-lg w-full shadow-glow-lg animate-scale-in">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold gradient-text">Add Blacklist Entry</h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2.5">
              Name <span className="text-text-tertiary font-normal">(Optional)</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition-all"
              placeholder="Enter name"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-2.5">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition-all font-mono"
              placeholder="+62 xxx xxx xxxx"
            />
          </div>

          {/* Instagram */}
          <div>
            <label htmlFor="instagram" className="block text-sm font-semibold text-text-primary mb-2.5">
              Instagram
            </label>
            <input
              id="instagram"
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition-all"
              placeholder="@username"
            />
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-semibold text-text-primary mb-2.5">
              Reason <span className="text-red-400">*</span>
            </label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 resize-none transition-all"
              placeholder="Enter reason for blacklisting"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/20 border-2 border-red-500/30 rounded-xl animate-shake">
              <Text size="sm" className="text-red-300 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </Text>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-text-primary font-semibold rounded-xl transition-all border-2 border-white/10 hover:border-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-xl hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-secondary/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
