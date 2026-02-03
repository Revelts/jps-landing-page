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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-bg-secondary border border-white/10 rounded-xl p-6 max-w-md w-full shadow-glow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">Add Blacklist Entry</h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
              Name (Optional)
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              placeholder="Enter name"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              placeholder="Enter phone number"
            />
          </div>

          {/* Instagram */}
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-text-secondary mb-2">
              Instagram
            </label>
            <input
              id="instagram"
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              placeholder="@username"
            />
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-text-secondary mb-2">
              Reason <span className="text-red-400">*</span>
            </label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"
              placeholder="Enter reason for blacklisting"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <Text size="sm" className="text-red-300">
                {error}
              </Text>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-text-primary rounded-lg transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-secondary to-accent text-white font-medium rounded-lg hover:shadow-glow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
