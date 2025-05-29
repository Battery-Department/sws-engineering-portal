'use client';

import React, { memo } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OptimizedAnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const OptimizedAnalyticsCard = memo(function OptimizedAnalyticsCard({
  title,
  value,
  change,
  icon,
  loading = false
}: OptimizedAnalyticsCardProps) {
  // Early return for loading state
  if (loading) {
    return (
      <Card className="border-2 border-default-200">
        <CardBody className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-default-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-default-200 rounded w-3/4"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const isPositive = change && change > 0;
  const changeColor = isPositive ? 'text-success' : 'text-danger';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="border-2 border-default-200 hover:border-primary transition-colors">
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-default-600">{title}</p>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center gap-1 mt-2 ${changeColor}`}>
                <TrendIcon size={16} />
                <span className="text-sm font-medium">
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.title === nextProps.title &&
    prevProps.value === nextProps.value &&
    prevProps.change === nextProps.change &&
    prevProps.loading === nextProps.loading
  );
});

// Batch update wrapper for multiple cards
interface AnalyticsGridProps {
  cards: OptimizedAnalyticsCardProps[];
  loading?: boolean;
}

export const OptimizedAnalyticsGrid = memo(function OptimizedAnalyticsGrid({
  cards,
  loading = false
}: AnalyticsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <OptimizedAnalyticsCard
          key={`${card.title}-${index}`}
          {...card}
          loading={loading}
        />
      ))}
    </div>
  );
});