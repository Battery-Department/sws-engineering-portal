'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Server,
  Database,
  Zap,
  HardDrive,
  Wifi,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { dashboardAggregator, SystemHealthMetrics } from '@/services/analytics/dashboard-aggregator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function SystemHealthDashboard() {
  const [healthData, setHealthData] = useState<SystemHealthMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadHealthData();
    const interval = setInterval(loadHealthData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadHealthData = async () => {
    try {
      setLoading(true);
      const data = await dashboardAggregator.getSystemHealth();
      setHealthData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-[#10B981]';
      case 'degraded': return 'text-[#F59E0B]';
      case 'down': return 'text-[#EF4444]';
      default: return 'text-[#6B7280]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
      case 'degraded': return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
      case 'down': return <XCircle className="w-5 h-5 text-[#EF4444]" />;
      default: return <Clock className="w-5 h-5 text-[#6B7280]" />;
    }
  };

  const responseTimeData = [
    { time: '00:00', p50: 245, p95: 567, p99: 1234 },
    { time: '04:00', p50: 234, p95: 543, p99: 1156 },
    { time: '08:00', p50: 267, p95: 634, p99: 1345 },
    { time: '12:00', p50: 289, p95: 678, p99: 1456 },
    { time: '16:00', p50: 234, p95: 556, p99: 1234 },
    { time: '20:00', p50: 245, p95: 567, p99: 1198 }
  ];

  const queuePerformanceData = [
    { time: '00:00', depth: 12, processing: 3, failed: 1 },
    { time: '04:00', depth: 8, processing: 2, failed: 0 },
    { time: '08:00', depth: 34, processing: 8, failed: 2 },
    { time: '12:00', depth: 45, processing: 12, failed: 3 },
    { time: '16:00', depth: 23, processing: 5, failed: 1 },
    { time: '20:00', depth: 15, processing: 4, failed: 0 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#E5E7EB] rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
              <h1 className="text-3xl font-bold text-[#111827]">System Health</h1>
              <p className="text-[#6B7280] mt-1">Monitor system performance and service status</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={loadHealthData}
                className="border-[#E5E7EB] hover:bg-[#F9FAFB]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              <span className="text-sm text-[#6B7280]">
                System Status: <span className="font-medium text-[#10B981]">Operational</span>
              </span>
            </div>
            <div className="text-sm text-[#6B7280]">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Uptime</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {healthData ? healthData.uptime.toFixed(1) : '0.0'}%
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm text-[#10B981]">99.9% SLA</span>
                  </div>
                </div>
                <div className="p-3 bg-[#10B981]/10 rounded-lg">
                  <Activity className="w-6 h-6 text-[#10B981]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Response Time</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {healthData ? healthData.responseTime.p50 : '0'}ms
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-[#6B7280]">P95: {healthData?.responseTime.p95}ms</span>
                  </div>
                </div>
                <div className="p-3 bg-[#006FEE]/10 rounded-lg">
                  <Clock className="w-6 h-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Error Rate</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {healthData ? healthData.errorRate.toFixed(1) : '0.0'}%
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm text-[#10B981]">Below target</span>
                  </div>
                </div>
                <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Storage Used</p>
                  <p className="text-2xl font-bold text-[#111827]">
                    {healthData ? healthData.storageUsage.percentage : '0'}%
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-[#6B7280]">
                      {healthData?.storageUsage.used.toFixed(1)} GB used
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-[#EF4444]/10 rounded-lg">
                  <HardDrive className="w-6 h-6 text-[#EF4444]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">API Provider Status</CardTitle>
              <CardDescription className="text-[#6B7280]">
                Health status of external AI providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthData && Object.entries(healthData.apiStatus).map(([provider, status]) => (
                  <div key={provider} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(status)}
                      <span className="font-medium text-[#374151] capitalize">{provider}</span>
                    </div>
                    <Badge 
                      variant={status === 'healthy' ? 'default' : 'secondary'}
                      className={status === 'healthy' ? 'bg-[#10B981] text-white' : 
                                 status === 'degraded' ? 'bg-[#F59E0B] text-white' : 'bg-[#EF4444] text-white'}
                    >
                      {status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Queue Statistics</CardTitle>
              <CardDescription className="text-[#6B7280]">
                Current job processing metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Queue Depth</span>
                  <span className="font-semibold text-[#111827]">
                    {healthData?.queueStats.depth || 0} jobs
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Processing</span>
                  <span className="font-semibold text-[#111827]">
                    {healthData?.queueStats.processing || 0} active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Failed</span>
                  <span className="font-semibold text-[#111827]">
                    {healthData?.queueStats.failed || 0} jobs
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Avg Processing Time</span>
                  <span className="font-semibold text-[#111827]">
                    {healthData ? (healthData.queueStats.avgProcessingTime / 1000).toFixed(1) : '0'}s
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Response Time Trends</CardTitle>
              <CardDescription className="text-[#6B7280]">
                API response time percentiles over 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip formatter={(value) => [`${value}ms`, '']} />
                    <Area type="monotone" dataKey="p99" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="p95" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.5} />
                    <Area type="monotone" dataKey="p50" stackId="1" stroke="#006FEE" fill="#006FEE" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Queue Performance</CardTitle>
              <CardDescription className="text-[#6B7280]">
                Job queue metrics over 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={queuePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="depth" stroke="#006FEE" strokeWidth={2} />
                    <Line type="monotone" dataKey="processing" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage Usage */}
        <Card className="border-2 border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Storage Usage Details</CardTitle>
            <CardDescription className="text-[#6B7280]">
              Breakdown of storage consumption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Used Space</span>
                <span className="font-semibold text-[#111827]">
                  {healthData?.storageUsage.used.toFixed(1)} GB of {healthData?.storageUsage.total} GB
                </span>
              </div>
              <Progress 
                value={healthData?.storageUsage.percentage || 0} 
                className="h-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-[#006FEE]" />
                    <span className="text-sm font-medium text-[#374151]">Database</span>
                  </div>
                  <div className="text-sm text-[#6B7280]">0.8 GB</div>
                </div>
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm font-medium text-[#374151]">Assets</span>
                  </div>
                  <div className="text-sm text-[#6B7280]">1.2 GB</div>
                </div>
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-sm font-medium text-[#374151]">Cache</span>
                  </div>
                  <div className="text-sm text-[#6B7280]">0.4 GB</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}