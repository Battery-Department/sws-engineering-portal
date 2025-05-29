// Quiz V2 Type Definitions - Multi-Brand Support

export interface QuizBrand {
  id: string;
  name: string;
  displayName: string; // Text-only display (no logos)
  color: string;
  voltage: string;
  voltageOptions?: string[]; // For brands with multiple voltage platforms
  marketShare?: string;
  popularWith?: string[];
  category?: 'professional' | 'diy' | 'outdoor';
}

export interface QuizQuestion {
  id: string;
  type: 'visual-cards' | 'brand-grid' | 'single-choice' | 'multi-choice' | 'scale' | 'ranking' | 'slider';
  question: string;
  subtitle?: string;
  options: QuizOption[];
  category?: string;
  required?: boolean;
  userTypeFilter?: 'professional' | 'personal' | 'all';
}

export interface QuizOption {
  id: string;
  value: string | number;
  label: string;
  title?: string;
  description?: string;
  icon?: string; // Icon name or emoji
  highlights?: string[];
  color?: string;
  visualCard?: {
    background: string;
    hoverEffect?: string;
    selectionAnimation?: string;
  };
}

export interface QuizSession {
  sessionId: string;
  userType?: 'professional' | 'personal';
  selectedBrand?: string;
  trade?: string;
  crewSize?: number;
  companyName?: string;
  responses: Record<string, any>;
  currentStep: number;
  startTime: Date;
  lastActivity: Date;
  utmParams: Record<string, string>;
  deviceInfo?: any;
  leadQualityScore?: number;
}

export interface BrandVoltageOptions {
  dewalt: {
    name: 'DeWalt',
    voltages: ['12V MAX', '20V MAX', '60V MAX', 'FLEXVOLT'],
    capacities: {
      '12V MAX': ['2.0Ah', '3.0Ah', '4.0Ah'],
      '20V MAX': ['2.0Ah', '3.0Ah', '4.0Ah', '5.0Ah', '6.0Ah', '8.0Ah', '9.0Ah', '10.0Ah'],
      '60V MAX': ['6.0Ah', '9.0Ah', '12.0Ah', '15.0Ah'],
      'FLEXVOLT': ['6.0Ah', '9.0Ah', '12.0Ah', '15.0Ah']
    }
  };
  milwaukee: {
    name: 'Milwaukee',
    voltages: ['M12', 'M18', 'MX FUEL'],
    capacities: {
      'M12': ['2.0Ah', '3.0Ah', '4.0Ah', '6.0Ah'],
      'M18': ['2.0Ah', '3.0Ah', '5.0Ah', '6.0Ah', '8.0Ah', '12.0Ah'],
      'MX FUEL': ['6.0Ah', '9.0Ah']
    }
  };
  makita: {
    name: 'Makita',
    voltages: ['12V max CXT', '18V LXT', '36V (18V X2)', '40V max XGT'],
    capacities: {
      '12V max CXT': ['2.0Ah', '4.0Ah'],
      '18V LXT': ['2.0Ah', '3.0Ah', '4.0Ah', '5.0Ah', '6.0Ah'],
      '36V (18V X2)': ['5.0Ah', '6.0Ah'],
      '40V max XGT': ['2.5Ah', '4.0Ah', '5.0Ah']
    }
  };
  bosch: {
    name: 'Bosch',
    voltages: ['12V', '18V', '36V'],
    capacities: {
      '12V': ['2.0Ah', '3.0Ah', '4.0Ah'],
      '18V': ['2.0Ah', '4.0Ah', '5.0Ah', '6.0Ah', '8.0Ah'],
      '36V': ['4.0Ah', '6.0Ah']
    }
  };
  ridgid: {
    name: 'RIDGID',
    voltages: ['12V', '18V'],
    capacities: {
      '12V': ['2.0Ah', '4.0Ah'],
      '18V': ['2.0Ah', '4.0Ah', '6.0Ah', '9.0Ah']
    }
  };
  metabo: {
    name: 'Metabo HPT',
    voltages: ['12V', '18V', '36V MultiVolt'],
    capacities: {
      '12V': ['2.0Ah', '4.0Ah'],
      '18V': ['2.0Ah', '4.0Ah', '5.0Ah', '6.0Ah'],
      '36V MultiVolt': ['2.5Ah', '4.0Ah', '8.0Ah']
    }
  };
  ryobi: {
    name: 'Ryobi',
    voltages: ['18V ONE+', '40V'],
    capacities: {
      '18V ONE+': ['2.0Ah', '3.0Ah', '4.0Ah', '6.0Ah', '9.0Ah'],
      '40V': ['4.0Ah', '5.0Ah', '6.0Ah']
    }
  };
  craftsman: {
    name: 'Craftsman',
    voltages: ['20V MAX'],
    capacities: {
      '20V MAX': ['2.0Ah', '4.0Ah', '5.0Ah', '6.0Ah']
    }
  };
  ego: {
    name: 'EGO',
    voltages: ['56V'],
    capacities: {
      '56V': ['2.5Ah', '4.0Ah', '5.0Ah', '7.5Ah', '10.0Ah']
    }
  };
  greenworks: {
    name: 'Greenworks',
    voltages: ['24V', '40V', '60V', '80V'],
    capacities: {
      '24V': ['2.0Ah', '4.0Ah'],
      '40V': ['2.0Ah', '2.5Ah', '4.0Ah', '5.0Ah'],
      '60V': ['2.5Ah', '4.0Ah', '6.0Ah'],
      '80V': ['2.0Ah', '4.0Ah', '5.0Ah']
    }
  };
  worx: {
    name: 'WORX',
    voltages: ['20V PowerShare', '40V'],
    capacities: {
      '20V PowerShare': ['2.0Ah', '4.0Ah', '5.0Ah'],
      '40V': ['2.5Ah', '4.0Ah']
    }
  };
  aeg: {
    name: 'AEG',
    voltages: ['12V', '18V'],
    capacities: {
      '12V': ['2.0Ah', '4.0Ah'],
      '18V': ['2.0Ah', '4.0Ah', '5.0Ah', '6.0Ah', '9.0Ah']
    }
  };
  hikoki: {
    name: 'HiKOKI',
    voltages: ['12V', '18V', '36V MultiVolt'],
    capacities: {
      '12V': ['2.0Ah', '4.0Ah'],
      '18V': ['2.0Ah', '4.0Ah', '5.0Ah', '6.0Ah'],
      '36V MultiVolt': ['2.5Ah', '4.0Ah', '8.0Ah']
    }
  };
  kobalt: {
    name: 'Kobalt',
    voltages: ['24V', '40V', '80V'],
    capacities: {
      '24V': ['2.0Ah', '4.0Ah'],
      '40V': ['2.5Ah', '4.0Ah', '5.0Ah'],
      '80V': ['2.0Ah', '2.5Ah', '5.0Ah']
    }
  };
}

export interface MicroInteraction {
  sessionId: string;
  timestamp: number;
  questionId: string;
  type: 'click' | 'hover' | 'scroll' | 'swipe' | 'hesitation' | 'focus' | 'blur';
  element?: string;
  position?: { x: number; y: number };
  viewport?: { w: number; h: number };
  duration?: number;
  value?: any;
}

export interface QuizRecommendation {
  brand: string;
  voltage: string;
  products: RecommendedProduct[];
  totalSavings: number;
  monthlyPayment?: number;
  features: string[];
}

export interface RecommendedProduct {
  id: string;
  name: string;
  capacity: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  quantity: number;
  features: string[];
}