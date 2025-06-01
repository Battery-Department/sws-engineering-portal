'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Eye,
  MousePointer,
  Target,
  Clock,
  Image,
  FileText,
  Video,
  PenTool,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ExternalLink,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dashboardAggregator, ContentMetrics, ContentItem } from '@/services/analytics/dashboard-aggregator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function ContentPerformanceDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [contentData, setContentData] = useState<ContentMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    loadContentData();
    const interval = setInterval(loadContentData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadContentData = async () => {
    try {
      setLoading(true);
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case '1d':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
      }

      const data = await dashboardAggregator.getContentMetrics({ start: startDate, end: endDate });
      setContentData(data);
    } catch (error) {
      console.error('Failed to load content data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'copy': return <PenTool className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'blog': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const contentTypeData = contentData ? Object.entries(contentData.contentByType).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: type === 'image' ? '#006FEE' : type === 'copy' ? '#10B981' : type === 'video' ? '#F59E0B' : '#EF4444'
  })) : [];

  const performanceData = [
    { period: 'Week 1', generated: 156, engagement: 4.2, conversions: 23 },
    { period: 'Week 2', generated: 189, engagement: 4.8, conversions: 31 },
    { period: 'Week 3', generated: 203, engagement: 5.1, conversions: 42 },
    { period: 'Week 4', generated: 234, engagement: 4.9, conversions: 38 }
  ];

  const platformData = contentData ? [
    { name: 'Meta', impressions: contentData.platformBreakdown.meta.impressions, clicks: contentData.platformBreakdown.meta.clicks, conversions: contentData.platformBreakdown.meta.conversions },
    { name: 'Email', impressions: contentData.platformBreakdown.email.opens, clicks: contentData.platformBreakdown.email.clicks, conversions: 0 },
    { name: 'Website', impressions: contentData.platformBreakdown.website.views, clicks: contentData.platformBreakdown.website.downloads, conversions: 0 }
  ] : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#E5E7EB] rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-[#E5E7EB] rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">Content Performance</h1>
              <p className="text-[#6B7280] mt-1">Analyze content generation and engagement metrics</p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32 border-[#E5E7EB]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="copy">Copy</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 border-[#E5E7EB]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={loadContentData}
                className="border-[#E5E7EB] hover:bg-[#F9FAFB]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button className="bg-[#006FEE] text-white hover:bg-[#0050B3]">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Total Generated</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {contentData ? contentData.totalGenerated.toLocaleString() : '0'}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm text-[#10B981]">+15.2%</span>
                    <span className="text-sm text-[#6B7280]">vs last period</span>
                  </div>
                </div>
                <div className="p-3 bg-[#006FEE]/10 rounded-lg">
                  <FileText className="w-6 h-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Avg Engagement</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {contentData ? contentData.avgEngagementRate.toFixed(1) : '0.0'}%
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Eye className="w-4 h-4 text-[#006FEE]" />
                    <span className="text-sm text-[#006FEE]">Above average</span>
                  </div>
                </div>
                <div className="p-3 bg-[#10B981]/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-[#10B981]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Success Rate</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {contentData ? contentData.generationSuccessRate.toFixed(1) : '0.0'}%
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Target className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm text-[#10B981]">Excellent</span>
                  </div>
                </div>
                <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
                  <Target className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Avg Time</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {contentData ? contentData.avgTimeToGenerate.toFixed(1) : '0.0'}s
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-sm text-[#EF4444]">Fast</span>
                  </div>
                </div>
                <div className="p-3 bg-[#EF4444]/10 rounded-lg">
                  <Clock className="w-6 h-6 text-[#EF4444]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-[#E5E7EB]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="top-content" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Top Content
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Platforms
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Type Breakdown */}
              <Card className="border-2 border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-[#111827]">Content by Type</CardTitle>
                  <CardDescription className="text-[#6B7280]">
                    Distribution of generated content types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={contentTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {contentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Trends */}
              <Card className="border-2 border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-[#111827]">Performance Trends</CardTitle>
                  <CardDescription className="text-[#6B7280]">
                    Weekly content generation and engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="period" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Line type="monotone" dataKey="generated" stroke="#006FEE" strokeWidth={2} />
                        <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} />
                        <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="top-content" className="space-y-6">
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">Top Performing Content</CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Highest engagement content pieces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentData?.topPerformingContent.map((content, index) => (
                    <div key={content.id} className="p-4 bg-[#F9FAFB] rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            {getContentTypeIcon(content.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#111827]">{content.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-[#6B7280]">
                              <span className="capitalize">{content.type}</span>
                              <span>•</span>
                              <span>{content.platform}</span>
                              <span>•</span>
                              <span>{content.generatedAt.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-[#6B7280]" />
                                <span className="text-sm text-[#374151]">{content.performance.views.toLocaleString()} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MousePointer className="w-4 h-4 text-[#6B7280]" />
                                <span className="text-sm text-[#374151]">{content.performance.clicks.toLocaleString()} clicks</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="w-4 h-4 text-[#6B7280]" />
                                <span className="text-sm text-[#374151]">{content.performance.conversions} conversions</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-[#F59E0B]" />
                            <span className="font-semibold text-[#111827]">{content.engagementRate.toFixed(1)}%</span>
                          </div>
                          <div className="text-sm text-[#6B7280]">engagement</div>
                          <Badge variant="outline" className="mt-2">
                            ${content.cost.toFixed(2)} cost
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">Platform Performance</CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Content performance across different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Bar dataKey="impressions" fill="#006FEE" name="Impressions" />
                      <Bar dataKey="clicks" fill="#10B981" name="Clicks" />
                      <Bar dataKey="conversions" fill="#F59E0B" name="Conversions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platformData.map((platform) => (
                <Card key={platform.name} className="border-2 border-[#E5E7EB]">
                  <CardHeader>
                    <CardTitle className="text-[#111827] flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      {platform.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-[#6B7280]">Impressions:</span>
                        <span className="font-semibold text-[#111827]">
                          {platform.impressions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#6B7280]">Clicks:</span>
                        <span className="font-semibold text-[#111827]">
                          {platform.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#6B7280]">CTR:</span>
                        <span className="font-semibold text-[#111827]">
                          {((platform.clicks / platform.impressions) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">Content Lifecycle</CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Average performance over content lifespan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-[#006FEE] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#111827] mb-2">Detailed Trends Coming Soon</h3>
                  <p className="text-[#6B7280]">Advanced trend analysis and lifecycle tracking</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}