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
        className="text-center glass border-2 border-red-500/20 hover:border-red-500/40 hover:shadow-glow-purple-sm transition-all duration-300"
      >
        <div className="space-y-3">
          <div className="text-3xl sm:text-4xl font-bold gradient-text">
            {stats.total}
          </div>
          <Text size="sm" color="secondary" className="text-text-tertiary">
            Total Entries
          </Text>
        </div>
      </Card>

      <Card 
        padding="lg"
        className="text-center glass border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-300"
      >
        <div className="space-y-3">
          <div className="text-3xl sm:text-4xl font-bold gradient-text">
            {stats.withPhone}
          </div>
          <Text size="sm" color="secondary" className="text-text-tertiary">
            With Phone
          </Text>
        </div>
      </Card>

      <Card 
        padding="lg"
        className="text-center glass border-2 border-accent/20 hover:border-accent/40 hover:shadow-glow-purple-sm transition-all duration-300"
      >
        <div className="space-y-3">
          <div className="text-3xl sm:text-4xl font-bold gradient-text">
            {stats.withInstagram}
          </div>
          <Text size="sm" color="secondary" className="text-text-tertiary">
            With Instagram
          </Text>
        </div>
      </Card>

      <Card 
        padding="lg"
        className="text-center glass border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-300"
      >
        <div className="space-y-3">
          <div className="text-3xl sm:text-4xl font-bold gradient-text">
            {stats.withBoth}
          </div>
          <Text size="sm" color="secondary" className="text-text-tertiary">
            Complete Data
          </Text>
        </div>
      </Card>
    </div>
  );
}
