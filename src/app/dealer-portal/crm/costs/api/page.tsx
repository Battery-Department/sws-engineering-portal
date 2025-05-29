'use client';

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Calendar,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart
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
import { dashboardAggregator, APICostBreakdown } from '@/services/analytics/dashboard-aggregator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export default function APICostDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [costData, setCostData] = useState<APICostBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadCostData();
    const interval = setInterval(loadCostData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadCostData = async () => {
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

      const data = await dashboardAggregator.getAPICosts({ start: startDate, end: endDate });
      setCostData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load cost data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const providerData = costData ? [
    { name: 'OpenAI', value: costData.providers.openai.totalCost, color: '#006FEE' },
    { name: 'Stable Diffusion', value: costData.providers.stableDiffusion.totalCost, color: '#10B981' },
    { name: 'Anthropic', value: costData.providers.anthropic.totalCost, color: '#F59E0B' }
  ] : [];

  const costTrendData = [
    { date: '1/15', openai: 45.67, stableDiffusion: 23.45, anthropic: 12.34 },
    { date: '1/16', openai: 52.34, stableDiffusion: 28.67, anthropic: 15.23 },
    { date: '1/17', openai: 48.91, stableDiffusion: 31.23, anthropic: 13.45 },
    { date: '1/18', openai: 67.34, stableDiffusion: 25.67, anthropic: 18.90 },
    { date: '1/19', openai: 54.23, stableDiffusion: 33.45, anthropic: 16.78 },
    { date: '1/20', openai: 61.45, stableDiffusion: 29.87, anthropic: 14.56 },
    { date: '1/21', openai: 58.76, stableDiffusion: 35.23, anthropic: 17.89 }
  ];

  const modelUsageData = costData ? [
    { name: 'GPT-4', calls: costData.providers.openai.models['gpt-4'].calls, cost: costData.providers.openai.models['gpt-4'].cost },
    { name: 'GPT-4 Turbo', calls: costData.providers.openai.models['gpt-4-turbo'].calls, cost: costData.providers.openai.models['gpt-4-turbo'].cost },
    { name: 'DALL-E 3', calls: costData.providers.openai.models['dall-e-3'].calls, cost: costData.providers.openai.models['dall-e-3'].cost }
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
              <h1 className="text-3xl font-bold text-[#111827]">API Usage & Costs</h1>
              <p className="text-[#6B7280] mt-1">Monitor and optimize AI provider spending</p>
            </div>
            <div className="flex gap-3">
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
                onClick={loadCostData}
                className="border-[#E5E7EB] hover:bg-[#F9FAFB]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button className="bg-[#006FEE] text-white hover:bg-[#0050B3]">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-[#6B7280]">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Total Spend</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {costData ? formatCurrency(costData.totalCosts.thisMonth) : '$0.00'}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm text-[#10B981]">+12.5%</span>
                    <span className="text-sm text-[#6B7280]">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-[#006FEE]/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Daily Average</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {costData ? formatCurrency(costData.totalCosts.thisMonth / 30) : '$0.00'}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-sm text-[#EF4444]">-2.3%</span>
                    <span className="text-sm text-[#6B7280]">vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-[#10B981]/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#10B981]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">API Calls</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {costData ? costData.providers.openai.apiCalls.toLocaleString() : '0'}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Activity className="w-4 h-4 text-[#006FEE]" />
                    <span className="text-sm text-[#006FEE]">Active</span>
                  </div>
                </div>
                <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
                  <Zap className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Avg Cost/Call</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {costData ? formatCurrency(costData.providers.openai.avgCostPerCall) : '$0.00'}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm text-[#10B981]">Optimized</span>
                  </div>
                </div>
                <div className="p-3 bg-[#EF4444]/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-[#EF4444]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-[#E5E7EB]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="providers" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              By Provider
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Model Usage
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Provider Breakdown */}
              <Card className="border-2 border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-[#111827]">Provider Breakdown</CardTitle>
                  <CardDescription className="text-[#6B7280]">
                    Cost distribution across AI providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={providerData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {providerData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Per Content Type */}
              <Card className="border-2 border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-[#111827]">Cost Per Content Type</CardTitle>
                  <CardDescription className="text-[#6B7280]">
                    Average cost by content generation type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costData && Object.entries(costData.costPerContent).map(([type, cost]) => (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-[#006FEE]"></div>
                          <span className="text-sm font-medium text-[#374151] capitalize">
                            {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#111827]">
                          {formatCurrency(cost)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Budget Alert */}
            <Card className="border-2 border-[#F59E0B] bg-[#FFFBEB]">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#111827]">Budget Alert</h3>
                    <p className="text-[#6B7280] mt-1">
                      You've used 67% of your monthly API budget. Consider optimizing usage or increasing budget allocation.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-[#F59E0B] text-white hover:bg-[#D97706]">
                        Adjust Budget
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#F59E0B] text-[#F59E0B]">
                        View Optimization Tips
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* OpenAI */}
              <Card className="border-2 border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-[#111827] flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#006FEE]"></div>
                    OpenAI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Total Cost:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? formatCurrency(costData.providers.openai.totalCost) : '$0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">API Calls:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? costData.providers.openai.apiCalls.toLocaleString() : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Avg/Call:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? formatCurrency(costData.providers.openai.avgCostPerCall) : '$0.00'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stable Diffusion */}
              <Card className="border-2 border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-[#111827] flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                    Stable Diffusion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Total Cost:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? formatCurrency(costData.providers.stableDiffusion.totalCost) : '$0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Images:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? costData.providers.stableDiffusion.imagesGenerated.toLocaleString() : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Avg/Image:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? formatCurrency(costData.providers.stableDiffusion.avgCostPerImage) : '$0.00'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Anthropic */}
              <Card className="border-2 border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-[#111827] flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                    Anthropic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Total Cost:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? formatCurrency(costData.providers.anthropic.totalCost) : '$0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Tokens:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? costData.providers.anthropic.tokensUsed.toLocaleString() : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#6B7280]">Avg/Request:</span>
                      <span className="font-semibold text-[#111827]">
                        {costData ? formatCurrency(costData.providers.anthropic.avgCostPerRequest) : '$0.00'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">OpenAI Model Usage</CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Breakdown by individual AI models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelUsageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'cost' ? formatCurrency(value as number) : value,
                          name === 'cost' ? 'Cost' : 'Calls'
                        ]}
                      />
                      <Bar dataKey="calls" fill="#006FEE" name="calls" />
                      <Bar dataKey="cost" fill="#10B981" name="cost" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">Cost Trends</CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Daily spending patterns by provider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={costTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="date" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Line type="monotone" dataKey="openai" stroke="#006FEE" strokeWidth={2} />
                      <Line type="monotone" dataKey="stableDiffusion" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="anthropic" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}