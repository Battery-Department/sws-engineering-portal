'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Music,
  Folder,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Trash2,
  Edit,
  Share2,
  Eye,
  Plus,
  X,
  Check,
  Calendar,
  Tag
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  size: string;
  uploadedAt: string;
  tags: string[];
  metaOptimized: boolean;
  usage: number;
  thumbnail?: string;
}

export default function AssetsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const assets: Asset[] = [
    {
      id: '1',
      name: 'FlexVolt-Battery-Hero.jpg',
      type: 'image',
      size: '2.4 MB',
      uploadedAt: '2024-01-15',
      tags: ['product', 'hero', 'flexvolt'],
      metaOptimized: true,
      usage: 12,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '2',
      name: 'Contractor-Testimonial.mp4',
      type: 'video',
      size: '45.8 MB',
      uploadedAt: '2024-01-14',
      tags: ['testimonial', 'social'],
      metaOptimized: true,
      usage: 8,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '3',
      name: 'Battery-Comparison-Chart.pdf',
      type: 'document',
      size: '1.2 MB',
      uploadedAt: '2024-01-13',
      tags: ['specs', 'comparison'],
      metaOptimized: false,
      usage: 5,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '4',
      name: 'Product-Demo-Audio.mp3',
      type: 'audio',
      size: '3.5 MB',
      uploadedAt: '2024-01-12',
      tags: ['demo', 'voiceover'],
      metaOptimized: false,
      usage: 3,
      thumbnail: '/api/placeholder/400/300'
    }
  ];

  const assetStats = {
    total: 248,
    images: 156,
    videos: 42,
    documents: 38,
    audio: 12,
    totalSize: '2.4 GB',
    metaOptimized: 187
  };

  const getIconForType = (type: Asset['type']) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'audio': return <Music className="w-5 h-5" />;
    }
  };

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">Asset Library</h1>
              <p className="text-[#6B7280] mt-1">Manage your marketing assets and Meta-optimized content</p>
            </div>
            <div className="flex gap-3">
              <Link href="/portal/crm/content-studio">
                <Button variant="outline" className="border-[#E5E7EB] hover:bg-[#F9FAFB]">
                  Back to Studio
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-[#006FEE] to-[#0050B3] text-white hover:opacity-90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Assets
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Total Assets</p>
                  <p className="text-2xl font-bold text-[#111827]">{assetStats.total}</p>
                </div>
                <Folder className="w-8 h-8 text-[#006FEE]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Storage Used</p>
                  <p className="text-2xl font-bold text-[#111827]">{assetStats.totalSize}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#006FEE]/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Meta Optimized</p>
                  <p className="text-2xl font-bold text-[#111827]">{assetStats.metaOptimized}</p>
                </div>
                <Badge className="bg-[#10B981] text-white">75%</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">Active in Campaigns</p>
                  <p className="text-2xl font-bold text-[#111827]">42</p>
                </div>
                <Share2 className="w-8 h-8 text-[#F59E0B]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-5 h-5" />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#E5E7EB] focus:border-[#006FEE]"
            />
          </div>
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full md:w-auto">
            <TabsList className="bg-white border border-[#E5E7EB]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="documents">Docs</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-[#006FEE] text-white' : 'border-[#E5E7EB]'}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#006FEE] text-white' : 'border-[#E5E7EB]'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Selected Actions */}
        {selectedAssets.length > 0 && (
          <div className="mb-6 p-4 bg-[#EFF6FF] rounded-lg flex items-center justify-between">
            <span className="text-[#006FEE] font-medium">
              {selectedAssets.length} assets selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-[#006FEE] text-[#006FEE]">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="border-[#006FEE] text-[#006FEE]">
                <Tag className="w-4 h-4 mr-1" />
                Tag
              </Button>
              <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Assets Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <Card 
                key={asset.id} 
                className={`border-2 transition-all cursor-pointer ${
                  selectedAssets.includes(asset.id) 
                    ? 'border-[#006FEE] shadow-lg' 
                    : 'border-[#E5E7EB] hover:border-[#006FEE]/50'
                }`}
                onClick={() => toggleAssetSelection(asset.id)}
              >
                <div className="relative">
                  <img 
                    src={asset.thumbnail} 
                    alt={asset.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <div className="p-2 bg-white/90 rounded-lg">
                      {getIconForType(asset.type)}
                    </div>
                    {asset.metaOptimized && (
                      <Badge className="bg-[#006FEE] text-white">
                        Meta Ready
                      </Badge>
                    )}
                  </div>
                  {selectedAssets.includes(asset.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#006FEE] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-[#111827] truncate mb-1">{asset.name}</h3>
                  <div className="flex items-center justify-between text-sm text-[#6B7280] mb-2">
                    <span>{asset.size}</span>
                    <span>{asset.usage} uses</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {asset.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {assets.map((asset) => (
              <Card 
                key={asset.id} 
                className={`border-2 transition-all ${
                  selectedAssets.includes(asset.id) 
                    ? 'border-[#006FEE]' 
                    : 'border-[#E5E7EB]'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleAssetSelection(asset.id)}
                        className="flex items-center justify-center w-5 h-5 border-2 border-[#E5E7EB] rounded"
                      >
                        {selectedAssets.includes(asset.id) && (
                          <Check className="w-3 h-3 text-[#006FEE]" />
                        )}
                      </button>
                      <div className="p-2 bg-[#F9FAFB] rounded">
                        {getIconForType(asset.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-[#111827]">{asset.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                          <span>{asset.size}</span>
                          <span>•</span>
                          <span>Uploaded {asset.uploadedAt}</span>
                          <span>•</span>
                          <span>{asset.usage} uses</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {asset.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {asset.metaOptimized && (
                        <Badge className="bg-[#006FEE] text-white">
                          Meta Ready
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            •••
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}