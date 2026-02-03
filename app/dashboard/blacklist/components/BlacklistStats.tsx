/**
 * Blacklist Stats Component
 * Display statistics about blacklist entries
 */

'use client';

import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

interface BlacklistStatsProps {
  stats: {
    total: number;
    withPhone: number;
    withInstagram: number;
    withBoth: number;
  };
}

export function BlacklistStats({ stats }: BlacklistStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card 
        padding="lg"
        className="text-center glass-strong border-2 border-red-500/30 hover:border-red-500/50 hover:shadow-glow transition-all duration-300 group"
      >
        <div className="space-y-3">
          <div className="text-4xl sm:text-5xl font-black gradient-text group-hover:scale-110 transition-transform">
            {stats.total}
          </div>
          <Text size="sm" className="text-text-tertiary font-semibold uppercase tracking-wider text-xs">
            Total Entries
          </Text>
        </div>
      </Card>

      <Card 
        padding="lg"
        className="text-center glass-strong border-2 border-secondary/30 hover:border-secondary/50 hover:shadow-glow-sm transition-all duration-300 group"
      >
        <div className="space-y-3">
          <div className="text-4xl sm:text-5xl font-black gradient-text group-hover:scale-110 transition-transform">
            {stats.withPhone}
          </div>
          <Text size="sm" className="text-text-tertiary font-semibold uppercase tracking-wider text-xs">
            With Phone
          </Text>
        </div>
      </Card>

      <Card 
        padding="lg"
        className="text-center glass-strong border-2 border-accent/30 hover:border-accent/50 hover:shadow-glow-purple-sm transition-all duration-300 group"
      >
        <div className="space-y-3">
          <div className="text-4xl sm:text-5xl font-black gradient-text group-hover:scale-110 transition-transform">
            {stats.withInstagram}
          </div>
          <Text size="sm" className="text-text-tertiary font-semibold uppercase tracking-wider text-xs">
            With Instagram
          </Text>
        </div>
      </Card>

      <Card 
        padding="lg"
        className="text-center glass-strong border-2 border-secondary/30 hover:border-secondary/50 hover:shadow-glow-sm transition-all duration-300 group"
      >
        <div className="space-y-3">
          <div className="text-4xl sm:text-5xl font-black gradient-text group-hover:scale-110 transition-transform">
            {stats.withBoth}
          </div>
          <Text size="sm" className="text-text-tertiary font-semibold uppercase tracking-wider text-xs">
            Complete Data
          </Text>
        </div>
      </Card>
    </div>
  );
}
