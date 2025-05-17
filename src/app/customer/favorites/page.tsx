'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Star, Trash2, Search, Package } from 'lucide-react'

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  const favoriteProducts = [
    {
      id: 1,
      name: 'Tesla Powerwall 2',
      category: 'Solar Batteries',
      price: 4499.00,
      image: '/api/placeholder/200/200',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      addedDate: 'May 10, 2025',
      description: 'Premium lithium-ion battery storage system'
    },
    {
      id: 3,
      name: 'SunPower Maxeon 6',
      category: 'Solar Panels',
      price: 599.00,
      image: '/api/placeholder/200/200',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      addedDate: 'May 5, 2025',
      description: 'Industry-leading efficiency solar panel'
    },
    {
      id: 5,
      name: 'IronRidge XR100 Rail',
      category: 'Mounting Hardware',
      price: 89.00,
      image: '/api/placeholder/200/200',
      rating: 4.5,
      reviews: 45,
      inStock: true,
      addedDate: 'May 2, 2025',
      description: 'Universal solar mounting rail system'
    }
  ]

  const filteredProducts = favoriteProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'recent':
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
  })

  const removeFromFavorites = (productId: number) => {
    // Implementation would go here
    console.log('Removing product', productId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                My Favorites
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                {sortedProducts.length} products saved
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '300px',
                    padding: '10px 40px 10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#6366f1'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
                <Search style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#9ca3af'
                }} />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="recent">Recently Added</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 24px' }}>
        {sortedProducts.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <Package style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No favorites found
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              {searchQuery ? `No products matching "${searchQuery}"` : 'Start adding products to your favorites'}
            </p>
            <Link
              href="/customer/products"
              style={{
                display: 'inline-block',
                padding: '10px 24px',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5558e3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {sortedProducts.map(product => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  border: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div style={{
                    position: 'relative',
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#f3f4f6',
                    flexShrink: 0
                  }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '16px', flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          marginBottom: '4px',
                          color: '#111827'
                        }}>
                          {product.name}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>
                          {product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromFavorites(product.id)}
                        style={{
                          padding: '6px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fee2e2'
                          e.currentTarget.style.color = '#ef4444'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                          e.currentTarget.style.color = '#6b7280'
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginBottom: '8px'
                    }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3"
                            style={{
                              fill: i < Math.floor(product.rating) ? '#facc15' : 'none',
                              stroke: '#facc15'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '12px'
                    }}>
                      <span style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#111827'
                      }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        style={{
                          padding: '8px 16px',
                          backgroundColor: product.inStock ? '#6366f1' : '#e5e7eb',
                          color: product.inStock ? '#ffffff' : '#9ca3af',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: product.inStock ? 'pointer' : 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'background-color 0.2s'
                        }}
                        disabled={!product.inStock}
                        onMouseEnter={(e) => {
                          if (product.inStock) {
                            e.currentTarget.style.backgroundColor = '#5558e3'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (product.inStock) {
                            e.currentTarget.style.backgroundColor = '#6366f1'
                          }
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>

                    <p style={{
                      fontSize: '12px',
                      color: '#9ca3af',
                      marginTop: '8px'
                    }}>
                      Added {product.addedDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}