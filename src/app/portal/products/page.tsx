'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Eye,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Calendar,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Cog,
  Train,
  Factory
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: 'locomotive' | 'components' | 'tools' | 'services' | 'restoration';
  price: number;
  cost: number;
  margin: number;
  stock: number;
  status: 'active' | 'discontinued' | 'development' | 'maintenance';
  lastUpdated: string;
  sales: number;
  rating: number;
  image?: string;
  specifications: Record<string, string>;
  tags: string[];
}

export default function PortalProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Simulate API call to fetch products
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: 'prod-001',
          name: '7¼" Gauge Steam Locomotive Kit',
          description: 'Complete kit for building a scale 7¼" gauge steam locomotive including all major components',
          category: 'locomotive',
          price: 45000,
          cost: 32000,
          margin: 28.9,
          stock: 3,
          status: 'active',
          lastUpdated: '2024-01-20',
          sales: 12,
          rating: 4.8,
          specifications: {
            'Scale': '7¼" Gauge',
            'Drive': 'Steam',
            'Material': 'Steel/Brass',
            'Weight': '450kg',
            'Length': '3.2m'
          },
          tags: ['heritage', 'steam', 'locomotive', 'kit']
        },
        {
          id: 'prod-002',
          name: 'Heritage Boiler Restoration Service',
          description: 'Complete boiler restoration service including inspection, repair, and certification',
          category: 'services',
          price: 15000,
          cost: 8500,
          margin: 43.3,
          stock: 0,
          status: 'active',
          lastUpdated: '2024-01-18',
          sales: 28,
          rating: 4.9,
          specifications: {
            'Service Type': 'Complete Restoration',
            'Certification': 'Insurance Approved',
            'Timeline': '8-16 weeks',
            'Warranty': '5 years'
          },
          tags: ['restoration', 'boiler', 'heritage', 'certified']
        },
        {
          id: 'prod-003',
          name: 'Precision Fire Tubes Set',
          description: 'High-quality steel fire tubes manufactured to heritage railway specifications',
          category: 'components',
          price: 2850,
          cost: 1900,
          margin: 33.3,
          stock: 15,
          status: 'active',
          lastUpdated: '2024-01-15',
          sales: 45,
          rating: 4.7,
          specifications: {
            'Material': 'Heritage Grade Steel',
            'Diameter': '2" (51mm)',
            'Length': 'Custom',
            'Quantity': '24 per set'
          },
          tags: ['components', 'fire-tubes', 'steel', 'heritage']
        },
        {
          id: 'prod-004',
          name: 'CAD Design Service',
          description: '3D CAD modeling and technical drawing services for custom engineering projects',
          category: 'services',
          price: 1500,
          cost: 750,
          margin: 50.0,
          stock: 0,
          status: 'active',
          lastUpdated: '2024-01-22',
          sales: 67,
          rating: 4.6,
          specifications: {
            'Software': 'SolidWorks/AutoCAD',
            'Deliverables': '3D Models + Drawings',
            'Revisions': '3 included',
            'Timeline': '1-4 weeks'
          },
          tags: ['cad', 'design', 'modeling', 'drawings']
        },
        {
          id: 'prod-005',
          name: 'Steam Locomotive Regulator Valve',
          description: 'Precision machined regulator valve for heritage steam locomotives',
          category: 'components',
          price: 850,
          cost: 425,
          margin: 50.0,
          stock: 8,
          status: 'active',
          lastUpdated: '2024-01-10',
          sales: 23,
          rating: 4.8,
          specifications: {
            'Material': 'Bronze/Steel',
            'Thread': 'BSP',
            'Pressure Rating': '200 PSI',
            'Compatibility': 'Most heritage locos'
          },
          tags: ['valve', 'regulator', 'steam', 'bronze']
        },
        {
          id: 'prod-006',
          name: 'Workshop Tooling Set',
          description: 'Specialized tools for steam locomotive maintenance and restoration work',
          category: 'tools',
          price: 3200,
          cost: 2100,
          margin: 34.4,
          stock: 5,
          status: 'active',
          lastUpdated: '2024-01-12',
          sales: 16,
          rating: 4.5,
          specifications: {
            'Items': '24 piece set',
            'Material': 'High Carbon Steel',
            'Case': 'Wooden presentation box',
            'Warranty': '2 years'
          },
          tags: ['tools', 'workshop', 'restoration', 'professional']
        }
      ];
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'locomotive': return Train;
      case 'components': return Cog;
      case 'tools': return Wrench;
      case 'services': return Users;
      case 'restoration': return Factory;
      default: return Package;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'locomotive': return '#8B5CF6';
      case 'components': return '#006FEE';
      case 'tools': return '#10B981';
      case 'services': return '#F59E0B';
      case 'restoration': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'discontinued': return '#EF4444';
      case 'development': return '#F59E0B';
      case 'maintenance': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'discontinued': return AlertTriangle;
      case 'development': return Clock;
      case 'maintenance': return Wrench;
      default: return Clock;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'price': return b.price - a.price;
      case 'margin': return b.margin - a.margin;
      case 'sales': return b.sales - a.sales;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const categories = [
    { value: 'all', label: 'All Products', count: products.length },
    { value: 'locomotive', label: 'Locomotives', count: products.filter(p => p.category === 'locomotive').length },
    { value: 'components', label: 'Components', count: products.filter(p => p.category === 'components').length },
    { value: 'tools', label: 'Tools', count: products.filter(p => p.category === 'tools').length },
    { value: 'services', label: 'Services', count: products.filter(p => p.category === 'services').length },
    { value: 'restoration', label: 'Restoration', count: products.filter(p => p.category === 'restoration').length }
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#F8FAFC'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTop: '4px solid #006FEE',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ color: '#6B7280' }}>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Product Catalog
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                Manage steam locomotive products, components, and services
              </p>
            </div>
            
            <Link href="/portal/products/new" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#006FEE',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}>
              <Plus size={16} />
              Add Product
            </Link>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '10px 12px 10px 40px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    width: '300px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '2px solid #E5E7EB',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '2px solid #E5E7EB',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="margin">Sort by Margin</option>
                <option value="sales">Sort by Sales</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px',
                  backgroundColor: viewMode === 'grid' ? '#006FEE' : 'white',
                  color: viewMode === 'grid' ? 'white' : '#6B7280',
                  border: '2px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px',
                  backgroundColor: viewMode === 'list' ? '#006FEE' : 'white',
                  color: viewMode === 'list' ? 'white' : '#6B7280',
                  border: '2px solid #E5E7EB',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Package size={24} color="#006FEE" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Total Products
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {products.length}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <DollarSign size={24} color="#10B981" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Avg. Margin
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {(products.reduce((sum, p) => sum + p.margin, 0) / products.length).toFixed(1)}%
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <BarChart3 size={24} color="#F59E0B" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Total Sales
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {products.reduce((sum, p) => sum + p.sales, 0)}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Star size={24} color="#8B5CF6" />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Avg. Rating
              </h3>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {sortedProducts.map((product) => {
              const CategoryIcon = getCategoryIcon(product.category);
              const StatusIcon = getStatusIcon(product.status);
              
              return (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '2px solid #E5E7EB',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: `${getCategoryColor(product.category)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: getCategoryColor(product.category)
                    }}>
                      <CategoryIcon size={24} />
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      backgroundColor: `${getStatusColor(product.status)}20`,
                      color: getStatusColor(product.status),
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      <StatusIcon size={12} />
                      {product.status}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                        £{product.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>
                        {product.margin.toFixed(1)}% margin
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                        <Star size={14} fill="#F59E0B" color="#F59E0B" />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                          {product.rating}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>
                        {product.sales} sales
                      </div>
                    </div>
                  </div>

                  {product.stock > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                        Stock: {product.stock} units
                      </div>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#E5E7EB',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${Math.min((product.stock / 20) * 100, 100)}%`,
                          height: '100%',
                          backgroundColor: product.stock > 5 ? '#10B981' : '#F59E0B'
                        }}></div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link href={`/portal/products/${product.id}`} style={{
                      flex: 1,
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      border: '2px solid #E5E7EB',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      <Eye size={14} />
                      View
                    </Link>
                    <Link href={`/portal/products/${product.id}/edit`} style={{
                      flex: 1,
                      padding: '8px 12px',
                      backgroundColor: '#006FEE',
                      border: 'none',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      <Edit size={14} />
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 150px 120px 100px 100px 80px 120px',
              padding: '16px 24px',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div>Product</div>
              <div>Category</div>
              <div>Price</div>
              <div>Margin</div>
              <div>Stock</div>
              <div>Sales</div>
              <div>Actions</div>
            </div>

            {sortedProducts.map((product, index) => {
              const CategoryIcon = getCategoryIcon(product.category);
              
              return (
                <div
                  key={product.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 150px 120px 100px 100px 80px 120px',
                    padding: '16px 24px',
                    borderBottom: index < sortedProducts.length - 1 ? '1px solid #E5E7EB' : 'none',
                    alignItems: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: `${getCategoryColor(product.category)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: getCategoryColor(product.category)
                    }}>
                      <CategoryIcon size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>
                        {product.id}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: `${getCategoryColor(product.category)}20`,
                      color: getCategoryColor(product.category)
                    }}>
                      {product.category}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                    £{product.price.toLocaleString()}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#111827' }}>
                    {product.margin.toFixed(1)}%
                  </div>
                  
                  <div style={{ fontSize: '14px', color: product.stock > 5 ? '#10B981' : '#F59E0B' }}>
                    {product.stock > 0 ? product.stock : 'N/A'}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#111827' }}>
                    {product.sales}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <Link href={`/portal/products/${product.id}`} style={{
                      padding: '6px',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: '#6B7280'
                    }}>
                      <Eye size={14} />
                    </Link>
                    <Link href={`/portal/products/${product.id}/edit`} style={{
                      padding: '6px',
                      backgroundColor: '#006FEE',
                      border: 'none',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: 'white'
                    }}>
                      <Edit size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px 24px',
            border: '2px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <Package size={48} color="#D1D5DB" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', margin: '0 0 8px 0' }}>
              No products found
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              No products match your current search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}