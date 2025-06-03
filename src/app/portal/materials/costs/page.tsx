'use client';

import React, { useState } from 'react';
import { 
  Train, 
  Cog, 
  Factory, 
  Wrench, 
  ChevronRight, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Calculator,
  PoundSterling,
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  MapPin,
  Calendar,
  Save,
  Download,
  Upload,
  RefreshCw,
  BarChart3,
  Zap,
  ShoppingCart,
  Database,
  Layers,
  Weight
} from 'lucide-react';

// Sample materials data
const materialsData = [
  {
    id: 'MAT-001',
    category: 'Steel & Metals',
    subcategory: 'Structural Steel',
    name: 'Mild Steel Plate 10mm',
    specification: 'BS EN 10025-2 S235JR',
    unit: 'kg',
    currentPrice: 1.85,
    previousPrice: 1.72,
    supplier: 'Cornwall Steel Supplies',
    leadTime: '3-5 days',
    stockLevel: 2500,
    minimumOrder: 100,
    lastUpdated: '2024-03-15',
    priceHistory: [1.65, 1.68, 1.72, 1.78, 1.85],
    applications: ['Locomotive frames', 'Boiler supports', 'General fabrication'],
    certifications: ['CE marked', 'Mill Test Certificate']
  },
  {
    id: 'MAT-002', 
    category: 'Steel & Metals',
    subcategory: 'Copper Alloys',
    name: 'Copper Pipe 28mm',
    specification: 'BS EN 1057 R250',
    unit: 'metre',
    currentPrice: 12.40,
    previousPrice: 11.80,
    supplier: 'South West Copper Co.',
    leadTime: '1-2 days',
    stockLevel: 850,
    minimumOrder: 50,
    lastUpdated: '2024-03-14',
    priceHistory: [10.95, 11.20, 11.80, 12.10, 12.40],
    applications: ['Steam lines', 'Boiler fittings', 'Hydraulic systems'],
    certifications: ['WRAS approved', 'BS kitemark']
  },
  {
    id: 'MAT-003',
    category: 'Castings & Forgings',
    subcategory: 'Bronze Castings',
    name: 'Gunmetal Bronze LG2',
    specification: 'BS 1400 Grade LG2',
    unit: 'kg',
    currentPrice: 8.75,
    previousPrice: 8.45,
    supplier: 'Heritage Foundry Ltd',
    leadTime: '2-3 weeks',
    stockLevel: 125,
    minimumOrder: 25,
    lastUpdated: '2024-03-12',
    priceHistory: [7.95, 8.15, 8.45, 8.60, 8.75],
    applications: ['Valve bodies', 'Bearing caps', 'Steam fittings'],
    certifications: ['Foundry certified', 'Material traceability']
  },
  {
    id: 'MAT-004',
    category: 'Consumables',
    subcategory: 'Welding Materials',
    name: 'MIG Welding Wire 1.2mm',
    specification: 'AWS ER70S-6',
    unit: 'kg spool',
    currentPrice: 4.25,
    previousPrice: 4.35,
    supplier: 'Cornwall Welding Supplies',
    leadTime: 'Same day',
    stockLevel: 45,
    minimumOrder: 5,
    lastUpdated: '2024-03-16',
    priceHistory: [4.15, 4.20, 4.35, 4.30, 4.25],
    applications: ['General fabrication', 'Repair work', 'Structural welding'],
    certifications: ['AWS certified', 'CE marked']
  },
  {
    id: 'MAT-005',
    category: 'Fasteners & Hardware',
    subcategory: 'High Tensile Bolts',
    name: 'M12 x 80mm Socket Head Cap Screws',
    specification: '316 Stainless Steel',
    unit: 'each',
    currentPrice: 2.15,
    previousPrice: 2.05,
    supplier: 'Precision Fasteners Ltd',
    leadTime: '5-7 days',
    stockLevel: 500,
    minimumOrder: 100,
    lastUpdated: '2024-03-13',
    priceHistory: [1.95, 1.98, 2.05, 2.08, 2.15],
    applications: ['High pressure connections', 'Critical assemblies', 'Marine applications'],
    certifications: ['DIN 912', 'Marine grade']
  },
  {
    id: 'MAT-006',
    category: 'Insulation & Gaskets',
    subcategory: 'High Temperature',
    name: 'Ceramic Fiber Blanket 25mm',
    specification: '1260°C Grade',
    unit: 'm²',
    currentPrice: 18.50,
    previousPrice: 17.90,
    supplier: 'Industrial Insulation Co.',
    leadTime: '1-2 weeks',
    stockLevel: 75,
    minimumOrder: 10,
    lastUpdated: '2024-03-11',
    priceHistory: [16.50, 17.20, 17.90, 18.20, 18.50],
    applications: ['Boiler insulation', 'Furnace lining', 'High temp gaskets'],
    certifications: ['Fire resistant', 'REACH compliant']
  }
];

const categories = [
  'All Categories',
  'Steel & Metals',
  'Castings & Forgings', 
  'Consumables',
  'Fasteners & Hardware',
  'Insulation & Gaskets',
  'Electrical Components',
  'Hydraulic Components'
];

export default function MaterialCostsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState('name');
  const [calculatorMode, setCalculatorMode] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  const filteredMaterials = materialsData.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.specification.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || material.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.currentPrice - b.currentPrice;
      case 'price-high':
        return b.currentPrice - a.currentPrice;
      case 'category':
        return a.category.localeCompare(b.category);
      case 'updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  const addToCalculator = (material: any) => {
    if (!selectedMaterials.find(m => m.id === material.id)) {
      setSelectedMaterials([...selectedMaterials, material]);
      setQuantities({...quantities, [material.id]: 1});
    }
  };

  const removeFromCalculator = (materialId: string) => {
    setSelectedMaterials(selectedMaterials.filter(m => m.id !== materialId));
    const newQuantities = {...quantities};
    delete newQuantities[materialId];
    setQuantities(newQuantities);
  };

  const updateQuantity = (materialId: string, quantity: number) => {
    setQuantities({...quantities, [materialId]: quantity});
  };

  const getTotalCost = () => {
    return selectedMaterials.reduce((total, material) => {
      const quantity = quantities[material.id] || 0;
      return total + (material.currentPrice * quantity);
    }, 0);
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(change).toFixed(1),
      direction: change >= 0 ? 'up' : 'down',
      color: change >= 0 ? '#EF4444' : '#10B981'
    };
  };

  // Calculate summary statistics
  const totalMaterials = materialsData.length;
  const avgPriceIncrease = materialsData.reduce((sum, m) => {
    return sum + (((m.currentPrice - m.previousPrice) / m.previousPrice) * 100);
  }, 0) / materialsData.length;
  const lowStockItems = materialsData.filter(m => m.stockLevel < m.minimumOrder * 2).length;
  const totalValue = materialsData.reduce((sum, m) => sum + (m.currentPrice * m.stockLevel), 0);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                Materials Cost Management
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Real-time pricing, supplier management, and project cost estimation
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCalculatorMode(!calculatorMode)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: calculatorMode ? 'none' : '2px solid white',
                  backgroundColor: calculatorMode ? 'white' : 'transparent',
                  color: calculatorMode ? '#1E3A8A' : 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Calculator size={16} />
                {calculatorMode ? 'Exit Calculator' : 'Cost Calculator'}
              </button>
              <button
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'white',
                  color: '#1E3A8A',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <RefreshCw size={16} />
                Update Prices
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {[
            { 
              label: 'Materials Tracked', 
              value: totalMaterials, 
              color: '#3B82F6', 
              icon: Package,
              subtext: 'Active materials'
            },
            { 
              label: 'Avg Price Change', 
              value: `${avgPriceIncrease >= 0 ? '+' : ''}${avgPriceIncrease.toFixed(1)}%`, 
              color: avgPriceIncrease >= 0 ? '#EF4444' : '#10B981', 
              icon: avgPriceIncrease >= 0 ? TrendingUp : TrendingDown,
              subtext: 'Last update'
            },
            { 
              label: 'Low Stock Alerts', 
              value: lowStockItems, 
              color: '#F59E0B', 
              icon: AlertTriangle,
              subtext: 'Need reordering'
            },
            { 
              label: 'Total Inventory Value', 
              value: `£${totalValue.toLocaleString()}`, 
              color: '#10B981', 
              icon: PoundSterling,
              subtext: 'Current pricing'
            }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  backgroundColor: `${stat.color}15`,
                  padding: '12px',
                  borderRadius: '10px',
                  color: stat.color
                }}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '2px' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {stat.subtext}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Calculator Panel */}
        {calculatorMode && (
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '2px solid #3B82F6',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1E293B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={24} color="#3B82F6" />
              Project Cost Calculator
            </h3>
            
            {selectedMaterials.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '32px',
                color: '#64748B'
              }}>
                <ShoppingCart size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>No materials added yet</p>
                <p style={{ fontSize: '14px' }}>Click "Add to Calculator" on any material below to start building your estimate</p>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  {selectedMaterials.map(material => (
                    <div key={material.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      backgroundColor: '#F8FAFC'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: '#1E293B' }}>{material.name}</div>
                        <div style={{ fontSize: '14px', color: '#64748B' }}>{material.specification}</div>
                        <div style={{ fontSize: '14px', color: '#10B981', fontWeight: '500' }}>
                          £{material.currentPrice.toFixed(2)} per {material.unit}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="number"
                          min="0"
                          value={quantities[material.id] || 0}
                          onChange={(e) => updateQuantity(material.id, parseFloat(e.target.value) || 0)}
                          style={{
                            width: '80px',
                            padding: '6px 8px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            fontSize: '14px',
                            textAlign: 'center'
                          }}
                        />
                        <span style={{ fontSize: '14px', color: '#64748B', minWidth: '60px' }}>
                          {material.unit}
                        </span>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#1E293B', minWidth: '80px', textAlign: 'right' }}>
                          £{((quantities[material.id] || 0) * material.currentPrice).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCalculator(material.id)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #EF4444',
                            backgroundColor: 'white',
                            color: '#EF4444',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{
                  borderTop: '2px solid #E2E8F0',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
                      Total: £{getTotalCost().toFixed(2)}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748B' }}>
                      Excluding VAT, delivery, and markup
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: '1px solid #1E3A8A',
                      backgroundColor: 'white',
                      color: '#1E3A8A',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Save size={14} />
                      Save Estimate
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#1E3A8A',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Download size={14} />
                      Export PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filters Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '16px' }}>
            Search & Filter Materials
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Search */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Search Materials
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by name, spec, or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="name">Material Name</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="category">Category</option>
                <option value="updated">Last Updated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredMaterials.map(material => {
            const priceChange = getPriceChange(material.currentPrice, material.previousPrice);
            const isLowStock = material.stockLevel < material.minimumOrder * 2;
            const isSelected = selectedMaterials.find(m => m.id === material.id);
            
            return (
              <div
                key={material.id}
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        backgroundColor: '#EFF6FF',
                        padding: '8px',
                        borderRadius: '8px',
                        color: '#1E3A8A'
                      }}>
                        <Package size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1E293B', marginBottom: '4px' }}>
                          {material.name}
                        </h3>
                        <div style={{ fontSize: '14px', color: '#64748B' }}>
                          {material.specification} • {material.category} • {material.subcategory}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      <span
                        style={{
                          backgroundColor: '#F0FDF4',
                          color: '#166534',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        {material.category}
                      </span>
                      <span
                        style={{
                          backgroundColor: isLowStock ? '#FEF2F2' : '#F3F4F6',
                          color: isLowStock ? '#991B1B' : '#374151',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {isLowStock && <AlertTriangle size={12} />}
                        Stock: {material.stockLevel} {material.unit}
                      </span>
                      <span
                        style={{
                          backgroundColor: '#FEF3C7',
                          color: '#92400E',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Truck size={12} />
                        {material.leadTime}
                      </span>
                    </div>

                    {/* Price Information */}
                    <div style={{
                      backgroundColor: '#F8FAFC',
                      padding: '16px',
                      borderRadius: '10px',
                      marginBottom: '16px',
                      border: '1px solid #E2E8F0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>
                            £{material.currentPrice.toFixed(2)}
                          </div>
                          <div style={{ fontSize: '14px', color: '#64748B' }}>
                            per {material.unit}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: priceChange.color
                          }}>
                            {priceChange.direction === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            {priceChange.percentage}%
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            vs. £{material.previousPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        Minimum order: {material.minimumOrder} {material.unit} • 
                        Updated: {new Date(material.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Supplier & Details */}
                    <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} />
                        {material.supplier}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Weight size={14} />
                        Min: {material.minimumOrder} {material.unit}
                      </div>
                    </div>

                    {/* Applications */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', fontWeight: '600' }}>
                        APPLICATIONS
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {material.applications.map((app, index) => (
                          <span key={index} style={{
                            backgroundColor: '#F1F5F9',
                            color: '#475569',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px'
                          }}>
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', fontWeight: '600' }}>
                        CERTIFICATIONS
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {material.certifications.map((cert, index) => (
                          <span key={index} style={{
                            backgroundColor: '#ECFDF5',
                            color: '#065F46',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            border: '1px solid #D1FAE5'
                          }}>
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '16px' }}>
                    <button
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                        e.currentTarget.style.borderColor = '#1E3A8A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }}
                    >
                      <BarChart3 size={14} />
                      Price History
                    </button>
                    
                    {calculatorMode && (
                      <button
                        onClick={() => isSelected ? removeFromCalculator(material.id) : addToCalculator(material)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: isSelected ? '1px solid #EF4444' : '1px solid #10B981',
                          backgroundColor: isSelected ? '#FEF2F2' : '#F0FDF4',
                          color: isSelected ? '#991B1B' : '#065F46',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Calculator size={14} />
                        {isSelected ? 'Remove' : 'Add to Calc'}
                      </button>
                    )}
                    
                    <button
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#1E3A8A',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShoppingCart size={14} />
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMaterials.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '48px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <Package size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No materials found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
              Try adjusting your search criteria or category filter
            </p>
            <button
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1E3A8A',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={16} />
              Add New Material
            </button>
          </div>
        )}
      </div>
    </div>
  );
}