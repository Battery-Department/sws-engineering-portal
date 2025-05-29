// React hook for simplified conversion tracking
import { useCallback } from 'react';
import { useMetaEvents } from './useMetaEvents';
import { UserData } from '../services/meta/types';

interface UseConversionTrackingOptions {
  pixelId: string;
  accessToken?: string;
  testMode?: boolean;
  debug?: boolean;
  currency?: string;
  userData?: UserData;
}

interface ConversionData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  [key: string]: any;
}

export function useConversionTracking(options: UseConversionTrackingOptions) {
  const { currency = 'USD', userData, ...metaOptions } = options;

  const metaEvents = useMetaEvents({
    ...metaOptions,
    enablePixel: true,
    enableCAPI: !!options.accessToken,
  });

  // Set user data if provided
  if (userData) {
    metaEvents.setUserData(userData);
  }

  const trackPageView = useCallback(
    async (data?: { content_name?: string; content_category?: string }) => {
      await metaEvents.track('PageView', data);
    },
    [metaEvents]
  );

  const trackViewContent = useCallback(
    async (data: ConversionData) => {
      await metaEvents.track('ViewContent', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackAddToCart = useCallback(
    async (data: ConversionData) => {
      await metaEvents.track('AddToCart', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackInitiateCheckout = useCallback(
    async (data: ConversionData) => {
      await metaEvents.track('InitiateCheckout', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackPurchase = useCallback(
    async (data: ConversionData & { value: number }) => {
      await metaEvents.track('Purchase', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackLead = useCallback(
    async (data?: ConversionData) => {
      await metaEvents.track('Lead', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackCompleteRegistration = useCallback(
    async (data?: ConversionData) => {
      await metaEvents.track('CompleteRegistration', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackSearch = useCallback(
    async (searchString: string, data?: ConversionData) => {
      await metaEvents.track('Search', {
        search_string: searchString,
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackAddPaymentInfo = useCallback(
    async (data?: ConversionData) => {
      await metaEvents.track('AddPaymentInfo', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackAddToWishlist = useCallback(
    async (data: ConversionData) => {
      await metaEvents.track('AddToWishlist', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackStartTrial = useCallback(
    async (data: ConversionData) => {
      await metaEvents.track('StartTrial', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackSubscribe = useCallback(
    async (data: ConversionData & { value: number }) => {
      await metaEvents.track('Subscribe', {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  const trackCustomConversion = useCallback(
    async (eventName: string, data?: any) => {
      await metaEvents.trackCustom(eventName, {
        currency,
        ...data,
      });
    },
    [metaEvents, currency]
  );

  return {
    // Standard conversion events
    trackPageView,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackLead,
    trackCompleteRegistration,
    trackSearch,
    trackAddPaymentInfo,
    trackAddToWishlist,
    trackStartTrial,
    trackSubscribe,
    trackCustomConversion,
    
    // User data management
    setUserData: metaEvents.setUserData,
    updateDataLayer: metaEvents.updateDataLayer,
    
    // Privacy controls
    enableLimitedDataUse: metaEvents.enableLimitedDataUse,
    disableDataProcessing: metaEvents.disableDataProcessing,
    
    // Debugging and monitoring
    getEventHistory: metaEvents.getEventHistory,
    getStatus: metaEvents.getStatus,
    exportEvents: metaEvents.exportEvents,
    flush: metaEvents.flush,
    
    isInitialized: metaEvents.isInitialized,
  };
}