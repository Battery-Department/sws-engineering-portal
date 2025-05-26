'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, ArrowLeft, ArrowRight, Clock, Hammer, Weight, Battery, Plus, Minus, Check, 
  Zap, Package, Users, Target, Truck, Shield, DollarSign, Star, ChevronDown, 
  ChevronUp, ChevronRight, Settings, Calculator, AlertCircle, CheckCircle,
  Lock, MapPin, Wrench
} from 'lucide-react';

// Force dynamic rendering with no cache
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Types
interface BatteryType {
  id: string;
  capacity: '6Ah' | '9Ah' | '15Ah';
  price: number;
  msrp: number;
  runtime: string;
  workOutput: string;
  weight: string;
  chargingTime: string;
  popular?: boolean;
  stockCount?: number;
  socialProof?: string;
}

interface ConfigurationState {
  jobDuration: string;
  crewSize: number;
  tools: string[];
  usageIntensity: 'light' | 'moderate' | 'heavy';
}

// Battery data with enhanced info
const batteriesData: BatteryType[] = [
  {
    id: '6ah',
    capacity: '6Ah',
    price: 95,
    msrp: 169,
    runtime: 'Up to 4 hours',
    workOutput: '225 screws / 175 ft cuts',
    weight: '1.9 lbs',
    chargingTime: '45 minutes',
    stockCount: 23,
    socialProof: '89% of small crews choose this'
  },
  {
    id: '9ah',
    capacity: '9Ah',
    price: 125,
    msrp: 249,
    runtime: 'Up to 6.5 hours',
    workOutput: '340 screws / 260 ft cuts',
    weight: '2.4 lbs',
    chargingTime: '55 minutes',
    popular: true,
    socialProof: '73% of customers choose this'
  },
  {
    id: '15ah',
    capacity: '15Ah',
    price: 245,
    msrp: 379,
    runtime: 'Up to 10 hours',
    workOutput: '560 screws / 430 ft cuts',
    weight: '3.2 lbs',
    chargingTime: '90 minutes',
    stockCount: 12,
    socialProof: 'Preferred by enterprise teams'
  },
];

const toolsData = [
  { id: 'drill', name: 'Drill', consumption: 2 },
  { id: 'impactDriver', name: 'Impact Driver', consumption: 3 },
  { id: 'circularSaw', name: 'Circular Saw', consumption: 5 },
  { id: 'recipSaw', name: 'Reciprocating Saw', consumption: 4.5 },
  { id: 'grinder', name: 'Angle Grinder', consumption: 5.5 },
];

// NEW: Sticky Cart Summary Component
const StickyCartSummary: React.FC<{
  totalItems: number;
  subtotal: number;
  total: number;
  discountAmount: number;
  discountPercentage: number;
  nextDiscountTier: number;
  nextDiscountAmount: number;
  onCheckout: () => void;
  cartItems: any[];
}> = ({ 
  totalItems, 
  subtotal, 
  total, 
  discountAmount, 
  discountPercentage,
  nextDiscountTier,
  nextDiscountAmount,
  onCheckout,
  cartItems 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const discountProgress = nextDiscountAmount > 0 ? 
    ((subtotal / (subtotal + nextDiscountAmount)) * 100) : 100;

  if (totalItems === 0) return null;

  return (
    <>
      {/* Desktop Sticky Cart Bar */}
      <div className="sticky top-0 z-40 bg-white border-y border-gray-200 shadow-sm hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Cart Summary */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{totalItems} items</span>
              </div>
              
              {/* Discount Progress Inline */}
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${discountProgress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {nextDiscountAmount > 0 
                    ? `$${nextDiscountAmount.toFixed(0)} more for ${nextDiscountTier}% off`
                    : `${discountPercentage}% discount applied!`
                  }
                </span>
              </div>
            </div>
            
            {/* Right: Total and CTA */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                {discountAmount > 0 && (
                  <div className="text-sm text-gray-500 line-through">
                    ${subtotal.toFixed(2)}
                  </div>
                )}
                <div className="text-2xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </div>
              </div>
              <button 
                onClick={onCheckout}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
              >
                Continue to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Cart Details */}
      <div className="bg-gray-50 border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4 py-4">
          <details className="group" open={showDetails}>
            <summary 
              className="flex items-center justify-between cursor-pointer list-none hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setShowDetails(!showDetails);
              }}
            >
              <span className="text-sm font-medium">View Cart Details</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </summary>
            
            {showDetails && (
              <div className="mt-4 space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Battery className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{item.capacity} Battery</div>
                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-sm text-gray-600">${item.price} each</div>
                    </div>
                  </div>
                ))}
                
                {/* Savings Summary */}
                {discountAmount > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span>Bulk Discount ({discountPercentage}%)</span>
                      <span className="text-green-600 font-medium">-${discountAmount.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </details>
        </div>
      </div>

      {/* Mobile Cart Bar (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 md:hidden z-50 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-gray-500">{totalItems} items</div>
            <div className="text-2xl font-bold">${total.toFixed(2)}</div>
          </div>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 text-sm font-medium"
          >
            {showDetails ? 'Hide' : 'View'} Details
          </button>
        </div>
        
        {/* Discount Progress */}
        <div className="mb-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
              style={{ width: `${discountProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {nextDiscountAmount > 0 
              ? `$${nextDiscountAmount.toFixed(0)} more for ${nextDiscountTier}% off`
              : `${discountPercentage}% discount applied!`
            }
          </p>
        </div>
        
        <button 
          onClick={onCheckout}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg active:scale-95 transition-transform"
        >
          Checkout - ${total.toFixed(2)}
        </button>
      </div>
    </>
  );
};

// ENHANCED: Battery Card Component
const EnhancedBatteryCard: React.FC<{
  battery: BatteryType;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}> = ({ battery, quantity, onQuantityChange }) => {
  const savings = battery.msrp - battery.price;
  const savePercent = Math.round((savings / battery.msrp) * 100);
  const isLowStock = battery.stockCount && battery.stockCount < 20;

  return (
    <div className={`
      relative bg-white rounded-xl border-2 transition-all duration-300
      ${battery.popular ? 'border-green-500 shadow-xl scale-105 z-10' : 'border-gray-200'}
      ${quantity > 0 ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      hover:shadow-lg hover:border-blue-400 group
    `}>
      {/* Popular Badge - Enhanced */}
      {battery.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <Star className="w-4 h-4 fill-white" />
            <span className="font-bold text-sm">MOST POPULAR</span>
            <Star className="w-4 h-4 fill-white" />
          </div>
        </div>
      )}
      
      {/* Quantity Badge */}
      {quantity > 0 && (
        <div className="absolute -top-3 -right-3 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
          {quantity}
        </div>
      )}
      
      <div className="p-6">
        {/* Battery Visual */}
        <div className="relative h-40 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Battery className="w-20 h-20 text-blue-600" />
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
              {battery.capacity}
            </div>
          </div>
        </div>
        
        {/* Title with Capacity Emphasis */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          <span className="text-3xl text-blue-600">{battery.capacity}</span> FlexVolt Battery
        </h3>
        
        {/* Price Section - Bigger, Bolder */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">${battery.price}</span>
            <span className="text-lg text-gray-500 line-through">${battery.msrp}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Save ${savings} ({savePercent}%)
            </div>
            {battery.socialProof && (
              <div className="text-xs text-gray-600">
                ⭐ {battery.socialProof}
              </div>
            )}
          </div>
        </div>
        
        {/* Specs with Icons - Enhanced */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold">{battery.runtime}</div>
              <div className="text-sm text-gray-500">Runtime</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Hammer className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="font-semibold">{battery.workOutput}</div>
              <div className="text-sm text-gray-500">Work Output</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Weight className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold">{battery.weight}</div>
              <div className="text-sm text-gray-500">Weight</div>
            </div>
          </div>
        </div>

        {/* Low Stock Warning */}
        {isLowStock && (
          <div className="flex items-center gap-2 text-orange-600 text-sm mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>Only {battery.stockCount} left at this price</span>
          </div>
        )}
        
        {/* Quantity Selector - Enhanced */}
        <div className="space-y-3">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              disabled={quantity <= 0}
              className="w-14 h-14 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <div className="flex-1 text-center font-medium text-lg py-4 px-4">
              {quantity}
            </div>
            
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-14 h-14 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <button 
            onClick={() => onQuantityChange(quantity > 0 ? 0 : 1)}
            className={`
              w-full py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95
              ${quantity > 0 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }
            `}
          >
            {quantity > 0 ? `✓ Added (${quantity})` : 'Add to Fleet'}
          </button>
        </div>

        {/* Social Proof */}
        {battery.socialProof && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-blue-800">
              <strong>17 contractors</strong> from your area bought this in the last week
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ENHANCED: Configuration Tool - Always Visible
const AlwaysVisibleConfigTool: React.FC<{
  configuration: ConfigurationState;
  onConfigurationChange: (config: ConfigurationState) => void;
  onAddConfiguration: () => void;
}> = ({ configuration, onConfigurationChange, onAddConfiguration }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Value Prop */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Smart Fleet Configuration
            </h2>
            <p className="text-lg text-gray-600">
              Get the exact batteries you need based on your job requirements
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>AI-Powered Recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Save 30% on Average</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No More Guesswork</span>
              </div>
            </div>
          </div>
          
          {/* Configuration Tool - Always Open */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Progress Indicator */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {['Job Details', 'Tool Selection', 'Get Results'].map((step, i) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${i <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-300 text-gray-500'
                      }
                    `}>
                      {i + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium
                      ${i <= currentStep ? 'text-gray-900' : 'text-gray-500'}
                    `}>
                      {step}
                    </span>
                    {i < 2 && (
                      <ChevronRight className="w-5 h-5 mx-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tool Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Duration</label>
                    <select 
                      value={configuration.jobDuration}
                      onChange={(e) => onConfigurationChange({ ...configuration, jobDuration: e.target.value })}
                      className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base"
                    >
                      <option value="4">Half Day (4 hrs)</option>
                      <option value="8">Full Day (8 hrs)</option>
                      <option value="16">2 Days</option>
                      <option value="24">3 Days</option>
                      <option value="40">Full Week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crew Size</label>
                    <input
                      type="number"
                      value={configuration.crewSize}
                      onChange={(e) => onConfigurationChange({ ...configuration, crewSize: parseInt(e.target.value) || 1 })}
                      className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base"
                      min="1"
                      max="20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Usage Intensity</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'light', label: 'Light (30%)' },
                        { value: 'moderate', label: 'Moderate (60%)' },
                        { value: 'heavy', label: 'Heavy (90%)' }
                      ].map((intensity) => (
                        <button
                          key={intensity.value}
                          onClick={() => onConfigurationChange({ ...configuration, usageIntensity: intensity.value as any })}
                          className={`
                            py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all duration-200
                            ${configuration.usageIntensity === intensity.value ? 
                              'bg-blue-600 text-white border-blue-600' : 
                              'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                            }
                          `}
                        >
                          {intensity.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Recommended Configuration</h4>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <span className="font-medium">9Ah Batteries</span>
                      <span className="text-blue-600 font-bold">8 units</span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <span className="font-medium">Fast Chargers</span>
                      <span className="text-blue-600 font-bold">3 units</span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <span className="font-medium">Total Cost</span>
                      <span className="text-green-600 font-bold">$1,267</span>
                    </div>
                  </div>

                  <button 
                    onClick={onAddConfiguration}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Add Configuration to Cart</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trust Signals Component
const TrustSignals: React.FC = () => (
  <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600 flex-wrap">
    <div className="flex items-center gap-2">
      <Shield className="w-4 h-4 text-green-500" />
      <span>30-Day Returns</span>
    </div>
    <div className="flex items-center gap-2">
      <Truck className="w-4 h-4 text-blue-500" />
      <span>Free Shipping</span>
    </div>
    <div className="flex items-center gap-2">
      <Lock className="w-4 h-4 text-gray-500" />
      <span>Secure Checkout</span>
    </div>
  </div>
);

// Main Component
export default function ConfigurationProPage() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    '6ah': 0,
    '9ah': 0,
    '15ah': 0,
  });

  const [configuration, setConfiguration] = useState<ConfigurationState>({
    jobDuration: '8',
    crewSize: 4,
    tools: ['drill', 'impactDriver'],
    usageIntensity: 'moderate',
  });

  // Calculate totals and discounts
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const subtotal = Object.entries(quantities).reduce((sum, [batteryId, qty]) => {
    const battery = batteriesData.find(b => b.id === batteryId);
    return sum + (battery ? battery.price * qty : 0);
  }, 0);

  // Discount tiers
  const discountTiers = [
    { threshold: 1000, percentage: 10 },
    { threshold: 2500, percentage: 15 },
    { threshold: 5000, percentage: 20 }
  ];

  let discountPercentage = 0;
  let nextDiscountTier = 10;
  let nextDiscountAmount = 1000 - subtotal;

  for (const tier of discountTiers.reverse()) {
    if (subtotal >= tier.threshold) {
      discountPercentage = tier.percentage;
      const nextTier = discountTiers.find(t => t.threshold > subtotal);
      if (nextTier) {
        nextDiscountTier = nextTier.percentage;
        nextDiscountAmount = nextTier.threshold - subtotal;
      } else {
        nextDiscountAmount = 0;
      }
      break;
    }
  }
  discountTiers.reverse();

  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal - discountAmount;

  // Convert to cart items
  const cartItemsData = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([batteryId, qty]) => {
      const battery = batteriesData.find(b => b.id === batteryId)!;
      return {
        id: battery.id,
        capacity: battery.capacity,
        quantity: qty,
        price: battery.price
      };
    });

  const updateQuantity = useCallback((batteryId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [batteryId]: Math.max(0, quantity)
    }));
  }, []);

  const handleCheckout = useCallback(() => {
    window.location.href = '/customer/payment';
  }, []);

  const handleAddConfiguration = useCallback(() => {
    setQuantities(prev => ({
      ...prev,
      '9ah': prev['9ah'] + 8
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Battery Department</h1>
                <p className="text-sm text-gray-600">Configuration Pro</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              <TrustSignals />
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Cart Summary */}
      <StickyCartSummary
        totalItems={totalItems}
        subtotal={subtotal}
        total={total}
        discountAmount={discountAmount}
        discountPercentage={discountPercentage}
        nextDiscountTier={nextDiscountTier}
        nextDiscountAmount={nextDiscountAmount}
        onCheckout={handleCheckout}
        cartItems={cartItemsData}
      />

      {/* Main Content */}
      <div className="pb-32 md:pb-8">
        {/* Smart Configuration Tool */}
        <AlwaysVisibleConfigTool
          configuration={configuration}
          onConfigurationChange={setConfiguration}
          onAddConfiguration={handleAddConfiguration}
        />

        {/* Battery Selection */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Choose Your Fleet Batteries
              </h2>
              <p className="text-lg text-gray-600">
                Professional-grade FlexVolt solutions for every job
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {batteriesData.map((battery) => (
                <EnhancedBatteryCard
                  key={battery.id}
                  battery={battery}
                  quantity={quantities[battery.id] || 0}
                  onQuantityChange={(qty) => updateQuantity(battery.id, qty)}
                />
              ))}
            </div>

            {/* Trust Signals - Mobile */}
            <div className="md:hidden mt-8">
              <TrustSignals />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}