'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Users,
  Calendar,
  MapPin,
  Settings,
  RefreshCw,
  Archive,
  Star,
  Tag,
  Clock,
  Layers,
  Box,
  Truck,
  ShoppingCart,
  DollarSign,
  Activity,
  Target,
  Zap,
  Tool,
  Wrench,
  Cog,
  FileText,
  MoreVertical,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface InventoryItem {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  quantity: number;
  unit: string;
  location: string;
  binLocation: string;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  unitCost: number;
  totalValue: number;
  supplier: string;
  lastOrdered: string;
  lastReceived: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'on_order' | 'discontinued';
  tags: string[];
  notes: string;
  images: string[];
}

interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  reason: string;
  reference: string;
  operator: string;
  timestamp: string;
  location: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  totalValue: number;
  expanded?: boolean;
  subcategories?: Category[];
}

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showCategories, setShowCategories] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Mock data
  const mockInventory: InventoryItem[] = [
    {
      id: 'INV-001',
      partNumber: 'ST-TUBE-24',
      name: 'Steel Fire Tubes',
      description: 'High-grade steel tubes for locomotive boiler applications',
      category: 'Boiler Components',
      subcategory: 'Fire Tubes',
      quantity: 156,
      unit: 'pcs',
      location: 'Warehouse A',
      binLocation: 'A-02-15',
      minStock: 50,
      maxStock: 200,
      reorderPoint: 75,
      unitCost: 450.00,
      totalValue: 70200.00,
      supplier: 'Heritage Steel Ltd',
      lastOrdered: '2024-01-10',
      lastReceived: '2024-01-18',
      status: 'in_stock',
      tags: ['boiler', 'steel', 'heritage'],
      notes: 'Certified for heritage railway use. BS standard compliance.',
      images: []
    },
    {
      id: 'INV-002',
      partNumber: 'WR-7018-10',
      name: 'Welding Rod 7018',
      description: 'Low hydrogen welding electrodes for structural steel',
      category: 'Consumables',
      subcategory: 'Welding Supplies',
      quantity: 8,
      unit: 'kg',
      location: 'Workshop Store',
      binLocation: 'WS-01-03',
      minStock: 20,
      maxStock: 100,
      reorderPoint: 25,
      unitCost: 12.50,
      totalValue: 100.00,
      supplier: 'Welding Supplies Co',
      lastOrdered: '2024-01-05',
      lastReceived: '2024-01-12',
      status: 'low_stock',
      tags: ['welding', 'consumable', 'urgent'],
      notes: 'Critical for boiler work. Reorder when below 25kg.',
      images: []
    },
    {
      id: 'INV-003',
      partNumber: 'BR-SET-45',
      name: 'Industrial Bearing Set',
      description: 'Heavy-duty bearings for conveyor systems',
      category: 'Mechanical Parts',
      subcategory: 'Bearings',
      quantity: 0,
      unit: 'set',
      location: 'Warehouse B',
      binLocation: 'B-01-08',
      minStock: 2,
      maxStock: 10,
      reorderPoint: 3,
      unitCost: 850.00,
      totalValue: 0.00,
      supplier: 'Industrial Bearings Ltd',
      lastOrdered: '2024-01-28',
      lastReceived: '2023-12-15',
      status: 'on_order',
      tags: ['bearings', 'industrial', 'critical'],
      notes: 'ETA: 2024-02-05. Required for Cornwall Clay project.',
      images: []
    },
    {
      id: 'INV-004',
      partNumber: 'BR-FITT-12',
      name: 'Brass Fittings Assorted',
      description: 'Heritage brass fittings for signal box mechanisms',
      category: 'Hardware',
      subcategory: 'Fittings',
      quantity: 145,
      unit: 'pcs',
      location: 'Heritage Store',
      binLocation: 'H-03-22',
      minStock: 50,
      maxStock: 200,
      reorderPoint: 75,
      unitCost: 15.75,
      totalValue: 2283.75,
      supplier: 'Heritage Brass Works',
      lastOrdered: '2023-12-20',
      lastReceived: '2024-01-03',
      status: 'in_stock',
      tags: ['brass', 'heritage', 'signal'],
      notes: 'Authentic Victorian-era specifications.',
      images: []
    }
  ];

  const mockCategories: Category[] = [
    {
      id: 'boiler',
      name: 'Boiler Components',
      description: 'Steam locomotive boiler parts and components',
      itemCount: 23,
      totalValue: 125000,
      subcategories: [
        { id: 'fire-tubes', name: 'Fire Tubes', description: '', itemCount: 5, totalValue: 75000 },
        { id: 'stays', name: 'Stays & Brackets', description: '', itemCount: 12, totalValue: 35000 },
        { id: 'fittings', name: 'Boiler Fittings', description: '', itemCount: 6, totalValue: 15000 }
      ]
    },
    {
      id: 'mechanical',
      name: 'Mechanical Parts',
      description: 'Gears, bearings, and mechanical components',
      itemCount: 45,
      totalValue: 85000,
      subcategories: [
        { id: 'bearings', name: 'Bearings', description: '', itemCount: 15, totalValue: 25000 },
        { id: 'gears', name: 'Gears & Gearboxes', description: '', itemCount: 8, totalValue: 45000 },
        { id: 'seals', name: 'Seals & Gaskets', description: '', itemCount: 22, totalValue: 15000 }
      ]
    },
    {
      id: 'consumables',
      name: 'Consumables',
      description: 'Welding supplies, oils, and consumable materials',
      itemCount: 67,
      totalValue: 15000
    },
    {
      id: 'hardware',
      name: 'Hardware',
      description: 'Bolts, nuts, fittings, and general hardware',
      itemCount: 156,
      totalValue: 25000
    },
    {
      id: 'electrical',
      name: 'Electrical Components',
      description: 'Switches, cables, and electrical parts',
      itemCount: 34,
      totalValue: 12000
    }
  ];

  const filteredInventory = mockInventory.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = searchTerm === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return '#10B981';
      case 'low_stock': return '#F59E0B';
      case 'out_of_stock': return '#EF4444';
      case 'on_order': return '#3B82F6';
      case 'discontinued': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock': return <CheckCircle size={16} />;
      case 'low_stock': return <AlertTriangle size={16} />;
      case 'out_of_stock': return <X size={16} />;
      case 'on_order': return <Truck size={16} />;
      case 'discontinued': return <Archive size={16} />;
      default: return <Package size={16} />;
    }
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const stats = {
    totalItems: mockInventory.length,
    totalValue: mockInventory.reduce((sum, item) => sum + item.totalValue, 0),
    lowStock: mockInventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length,
    onOrder: mockInventory.filter(item => item.status === 'on_order').length,
    categories: mockCategories.length
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(0, 111, 238, 0.2)'
            }}>
              <Package size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Inventory Management
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Track stock levels, manage orders, and optimize inventory efficiency
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Package size={20} color="#006FEE" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Total Items</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {stats.totalItems.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={16} />
              <span>Across {stats.categories} categories</span>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#D1FAE5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DollarSign size={20} color="#10B981" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Total Value</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              £{(stats.totalValue / 1000).toFixed(0)}k
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              Inventory asset value
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: stats.lowStock > 0 ? '#FEE2E2' : '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={20} color={stats.lowStock > 0 ? '#EF4444' : '#6B7280'} />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Low Stock</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: stats.lowStock > 0 ? '#EF4444' : '#111827', marginBottom: '4px' }}>
              {stats.lowStock}
            </div>
            <div style={{ fontSize: '14px', color: stats.lowStock > 0 ? '#EF4444' : '#6B7280' }}>
              {stats.lowStock > 0 ? 'Items need reordering' : 'Stock levels healthy'}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#DBEAFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Truck size={20} color="#3B82F6" />
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>On Order</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
              {stats.onOrder}
            </div>
            <div style={{ fontSize: '14px', color: '#3B82F6' }}>
              Items incoming
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Categories Sidebar */}
          {showCategories && (
            <div style={{
              width: '300px',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              padding: '24px',
              height: 'fit-content'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => setFilterCategory('all')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: filterCategory === 'all' ? '#EFF6FF' : 'transparent',
                    color: filterCategory === 'all' ? '#006FEE' : '#374151',
                    fontSize: '14px',
                    fontWeight: filterCategory === 'all' ? '500' : '400',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  All Categories ({stats.totalItems})
                </button>
                {mockCategories.map(category => (
                  <div key={category.id}>
                    <button
                      onClick={() => {
                        setFilterCategory(category.name);
                        if (category.subcategories) {
                          toggleCategory(category.id);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: filterCategory === category.name ? '#EFF6FF' : 'transparent',
                        color: filterCategory === category.name ? '#006FEE' : '#374151',
                        fontSize: '14px',
                        fontWeight: filterCategory === category.name ? '500' : '400',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{category.name} ({category.itemCount})</span>
                      {category.subcategories && (
                        expandedCategories.has(category.id) ? 
                        <ChevronDown size={16} /> : 
                        <ChevronRight size={16} />
                      )}
                    </button>
                    {category.subcategories && expandedCategories.has(category.id) && (
                      <div style={{ marginLeft: '16px', marginTop: '4px' }}>
                        {category.subcategories.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => setFilterCategory(sub.name)}
                            style={{
                              width: '100%',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: filterCategory === sub.name ? '#EFF6FF' : 'transparent',
                              color: filterCategory === sub.name ? '#006FEE' : '#6B7280',
                              fontSize: '13px',
                              fontWeight: filterCategory === sub.name ? '500' : '400',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s'
                            }}
                          >
                            {sub.name} ({sub.itemCount})
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {/* Action Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={20} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6B7280'
                  }} />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '10px 12px 10px 40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      width: '300px',
                      outline: 'none',
                      backgroundColor: 'white'
                    }}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="on_order">On Order</option>
                  <option value="discontinued">Discontinued</option>
                </select>
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    backgroundColor: showCategories ? '#006FEE' : 'white',
                    color: showCategories ? 'white' : '#374151',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Layers size={16} />
                  Categories
                </button>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Download size={16} />
                  Export
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: '#006FEE',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0, 111, 238, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0050B3';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#006FEE';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 111, 238, 0.2)';
                  }}
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '0.8fr 1.5fr 0.8fr 0.8fr 0.8fr 0.8fr 0.6fr 80px',
                padding: '16px 24px',
                borderBottom: '1px solid #E5E7EB',
                backgroundColor: '#F9FAFB',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <div>Part Number</div>
                <div>Item Name</div>
                <div>Category</div>
                <div>Location</div>
                <div>Quantity</div>
                <div>Value</div>
                <div>Status</div>
                <div></div>
              </div>

              {filteredInventory.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.8fr 1.5fr 0.8fr 0.8fr 0.8fr 0.8fr 0.6fr 80px',
                    padding: '20px 24px',
                    borderBottom: index < filteredInventory.length - 1 ? '1px solid #E5E7EB' : 'none',
                    alignItems: 'center',
                    transition: 'background-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>
                      {item.partNumber}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {item.binLocation}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>
                      {item.description}
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', color: '#374151' }}>
                    {item.category}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#374151' }}>
                      {item.location}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>
                      {item.quantity} {item.unit}
                    </div>
                    {item.quantity <= item.reorderPoint && item.status !== 'on_order' && (
                      <div style={{ fontSize: '12px', color: '#EF4444' }}>
                        Below reorder point
                      </div>
                    )}
                  </div>
                  <div style={{ fontWeight: '500', color: '#111827' }}>
                    £{item.totalValue.toLocaleString()}
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: `${getStatusColor(item.status)}20`,
                      color: getStatusColor(item.status)
                    }}>
                      {getStatusIcon(item.status)}
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <button
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                        e.currentTarget.style.borderColor = '#006FEE';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                      }}
                    >
                      <MoreVertical size={16} color="#6B7280" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setSelectedItem(null)}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                    {selectedItem.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                    {selectedItem.partNumber} • {selectedItem.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#F3F4F6',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} color="#6B7280" />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '32px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      Item Details
                    </h3>
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                        Description:
                      </p>
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                        {selectedItem.description}
                      </p>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '24px'
                    }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Location</p>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                          {selectedItem.location}
                        </p>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                          Bin: {selectedItem.binLocation}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Supplier</p>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                          {selectedItem.supplier}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Last Ordered</p>
                        <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                          {new Date(selectedItem.lastOrdered).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Last Received</p>
                        <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                          {new Date(selectedItem.lastReceived).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      Notes
                    </h4>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#F9FAFB',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      {selectedItem.notes || 'No notes available'}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#F9FAFB',
                      borderRadius: '8px',
                      marginBottom: '24px'
                    }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                        Stock Information
                      </h4>
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Current Stock</span>
                          <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                            {selectedItem.quantity} {selectedItem.unit}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Reorder Point</span>
                          <span style={{ fontSize: '14px', color: '#374151' }}>
                            {selectedItem.reorderPoint} {selectedItem.unit}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Min Stock</span>
                          <span style={{ fontSize: '14px', color: '#374151' }}>
                            {selectedItem.minStock} {selectedItem.unit}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Max Stock</span>
                          <span style={{ fontSize: '14px', color: '#374151' }}>
                            {selectedItem.maxStock} {selectedItem.unit}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        padding: '12px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Unit Cost</span>
                          <span style={{ fontSize: '14px', color: '#374151' }}>
                            £{selectedItem.unitCost.toFixed(2)}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>Total Value</span>
                          <span style={{ fontSize: '16px', fontWeight: '600', color: '#006FEE' }}>
                            £{selectedItem.totalValue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gap: '12px'
                    }}>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          backgroundColor: '#006FEE',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Edit size={16} />
                        Edit Item
                      </button>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <RefreshCw size={16} />
                        Stock Movement
                      </button>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <ShoppingCart size={16} />
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}