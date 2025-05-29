'use client';

import React, { memo, useRef } from 'react';
import { Card, CardBody, Chip } from '@nextui-org/react';
import { Calendar, User, Tag } from 'lucide-react';
import { useVirtualScroll } from '@/hooks/useMetaOptimized';

interface EventItem {
  id: string;
  eventName: string;
  userId: string;
  timestamp: string;
  source: 'pixel' | 'capi';
  data?: any;
}

interface VirtualEventListProps {
  events: EventItem[];
  height?: number;
  itemHeight?: number;
}

const EventRow = memo(function EventRow({ event }: { event: EventItem }) {
  const eventTime = new Date(event.timestamp);
  const timeAgo = getTimeAgo(eventTime);

  return (
    <div className="flex items-center justify-between p-4 border-b border-default-200 hover:bg-default-50 transition-colors">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-medium">{event.eventName}</p>
          <div className="flex items-center gap-2 mt-1">
            <User size={14} className="text-default-400" />
            <span className="text-sm text-default-500">{event.userId}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Chip
          size="sm"
          variant="flat"
          color={event.source === 'pixel' ? 'primary' : 'secondary'}
        >
          {event.source.toUpperCase()}
        </Chip>
        <div className="flex items-center gap-1 text-sm text-default-500">
          <Calendar size={14} />
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
});

export const VirtualEventList = memo(function VirtualEventList({
  events,
  height = 600,
  itemHeight = 72
}: VirtualEventListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    visibleItems,
    offsetY,
    totalHeight,
    handleScroll
  } = useVirtualScroll(events, itemHeight, height, 5);

  return (
    <Card className="w-full">
      <CardBody className="p-0">
        <div className="p-4 border-b border-default-200">
          <h3 className="text-lg font-semibold">Event Stream</h3>
          <p className="text-sm text-default-500 mt-1">
            Showing {events.length} events
          </p>
        </div>
        
        <div
          ref={containerRef}
          className="overflow-auto"
          style={{ height }}
          onScroll={handleScroll}
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div
              style={{
                transform: `translateY(${offsetY}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
              }}
            >
              {visibleItems.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}