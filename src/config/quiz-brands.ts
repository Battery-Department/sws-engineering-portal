// Quiz Brand Configuration - Text-based display (no logos)
import { QuizBrand } from '@/types/quiz-v2';

export const QUIZ_BRANDS: QuizBrand[] = [
  // Tier 1 - Most Popular (Industrial)
  {
    id: 'industrial-pro',
    name: 'industrial-pro',
    displayName: 'Industrial Pro',
    color: '#2563EB', // Industrial blue
    voltage: '24V / 48V Industrial',
    voltageOptions: ['12V', '24V', '48V', '110V'],
    marketShare: '35%',
    popularWith: ['Industrial Engineers', 'Plant Maintenance'],
    category: 'professional'
  },
  {
    id: 'steam-tech',
    name: 'steam-tech',
    displayName: 'Steam Tech',
    color: '#DC2626', // Steam red
    voltage: 'ST18 / ST24',
    voltageOptions: ['ST12', 'ST18', 'ST24', 'ST48'],
    marketShare: '32%',
    popularWith: ['Steam Engineers', 'Thermal Systems'],
    category: 'professional'
  },
  {
    id: 'precision-eng',
    name: 'precision-eng',
    displayName: 'Precision Engineering',
    color: '#059669', // Engineering green
    voltage: '18V PE / 36V Industrial',
    voltageOptions: ['12V PE', '18V PE', '36V Industrial', '48V Heavy Duty'],
    marketShare: '28%',
    popularWith: ['Precision Engineers', 'Quality Control'],
    category: 'professional'
  },
  
  // Tier 2 - Professional/Prosumer
  {
    id: 'bosch',
    name: 'bosch',
    displayName: 'Bosch',
    color: '#0A5EB0', // Bosch blue
    voltage: '18V',
    voltageOptions: ['12V', '18V', '36V'],
    category: 'professional'
  },
  {
    id: 'ridgid',
    name: 'ridgid',
    displayName: 'RIDGID',
    color: '#F36F21', // RIDGID orange
    voltage: '18V',
    voltageOptions: ['12V', '18V'],
    popularWith: ['Plumbers', 'HVAC'],
    category: 'professional'
  },
  {
    id: 'metabo',
    name: 'metabo',
    displayName: 'Metabo HPT',
    color: '#00A651', // Metabo green
    voltage: '18V / 36V MultiVolt',
    voltageOptions: ['12V', '18V', '36V MultiVolt'],
    category: 'professional'
  },
  
  // Tier 3 - DIY/Consumer Focused
  {
    id: 'ryobi',
    name: 'ryobi',
    displayName: 'Ryobi',
    color: '#95C11F', // Ryobi green
    voltage: '18V ONE+',
    voltageOptions: ['18V ONE+', '40V'],
    category: 'diy'
  },
  {
    id: 'craftsman',
    name: 'craftsman',
    displayName: 'Craftsman',
    color: '#E31837', // Craftsman red
    voltage: '20V MAX',
    voltageOptions: ['20V MAX'],
    category: 'diy'
  },
  
  // Outdoor Power Equipment
  {
    id: 'ego',
    name: 'ego',
    displayName: 'EGO',
    color: '#76BC21', // EGO green
    voltage: '56V',
    voltageOptions: ['56V'],
    category: 'outdoor'
  },
  {
    id: 'greenworks',
    name: 'greenworks',
    displayName: 'Greenworks',
    color: '#78BE20', // Greenworks green
    voltage: '40V / 60V / 80V',
    voltageOptions: ['24V', '40V', '60V', '80V'],
    category: 'outdoor'
  },
  
  // Additional Brands
  {
    id: 'worx',
    name: 'worx',
    displayName: 'WORX',
    color: '#F37021', // WORX orange
    voltage: '20V PowerShare',
    voltageOptions: ['20V PowerShare', '40V'],
    category: 'diy'
  },
  {
    id: 'aeg',
    name: 'aeg',
    displayName: 'AEG',
    color: '#E30613', // AEG red
    voltage: '18V',
    voltageOptions: ['12V', '18V'],
    category: 'professional'
  },
  {
    id: 'hikoki',
    name: 'hikoki',
    displayName: 'HiKOKI',
    color: '#00A0E9', // HiKOKI blue
    voltage: '18V / 36V MultiVolt',
    voltageOptions: ['12V', '18V', '36V MultiVolt'],
    category: 'professional'
  },
  {
    id: 'kobalt',
    name: 'kobalt',
    displayName: 'Kobalt',
    color: '#0066CC', // Kobalt blue
    voltage: '24V / 40V / 80V',
    voltageOptions: ['24V', '40V', '80V'],
    category: 'diy'
  }
];

// Helper functions
export const getBrandById = (id: string): QuizBrand | undefined => {
  return QUIZ_BRANDS.find(brand => brand.id === id);
};

export const getBrandsByCategory = (category: 'professional' | 'diy' | 'outdoor'): QuizBrand[] => {
  return QUIZ_BRANDS.filter(brand => brand.category === category);
};

export const sortBrandsByRelevance = (userType: 'professional' | 'personal'): QuizBrand[] => {
  if (userType === 'professional') {
    // Show professional brands first, sorted by market share
    const professionalBrands = QUIZ_BRANDS.filter(b => b.category === 'professional')
      .sort((a, b) => {
        const aShare = parseFloat(a.marketShare || '0');
        const bShare = parseFloat(b.marketShare || '0');
        return bShare - aShare;
      });
    const otherBrands = QUIZ_BRANDS.filter(b => b.category !== 'professional');
    return [...professionalBrands, ...otherBrands];
  } else {
    // Show DIY brands first
    const diyBrands = QUIZ_BRANDS.filter(b => b.category === 'diy');
    const outdoorBrands = QUIZ_BRANDS.filter(b => b.category === 'outdoor');
    const professionalBrands = QUIZ_BRANDS.filter(b => b.category === 'professional');
    return [...diyBrands, ...outdoorBrands, ...professionalBrands];
  }
};