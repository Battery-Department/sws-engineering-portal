'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Image, 
  FileText, 
  Video, 
  Palette, 
  Zap,
  Target,
  TrendingUp,
  Users,
  Brain,
  Wand2,
  Upload,
  Settings,
  ChevronRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function ContentStudioPage() {
  const [activeTab, setActiveTab] = useState('create');
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes = [
    {
      type: 'social-post',
      title: 'Social Media Post',
      description: 'AI-optimized posts for Meta, Instagram, and LinkedIn',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-[#006FEE]',
      features: ['Platform optimization', 'Hashtag suggestions', 'Emoji enhancement']
    },
    {
      type: 'product-showcase',
      title: 'Product Showcase',
      description: 'Dynamic product presentations with AI-enhanced visuals',
      icon: <Image className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-[#006FEE] to-[#0050B3]',
      features: ['3D renders', 'Feature callouts', 'Comparison charts']
    },
    {
      type: 'blog-article',
      title: 'Blog Article',
      description: 'SEO-optimized long-form content for your website',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-[#10B981]',
      features: ['SEO optimization', 'Auto-formatting', 'Citation management']
    },
    {
      type: 'video-script',
      title: 'Video Script',
      description: 'Engaging video scripts with scene breakdowns',
      icon: <Video className="w-6 h-6" />,
      color: 'bg-[#F59E0B]',
      features: ['Scene planning', 'Voiceover text', 'B-roll suggestions']
    }
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'FlexVolt Battery Launch Campaign',
      type: 'Campaign',
      status: 'active',
      performance: '+45% engagement',
      lastModified: '2 hours ago'
    },
    {
      id: 2,
      title: 'Spring Sale Social Series',
      type: 'Social Media',
      status: 'draft',
      performance: 'Not published',
      lastModified: '1 day ago'
    },
    {
      id: 3,
      title: 'Contractor Success Stories',
      type: 'Blog Series',
      status: 'completed',
      performance: '12.5K views',
      lastModified: '3 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">Content Studio</h1>
              <p className="text-[#6B7280] mt-1">AI-powered content creation for your marketing campaigns</p>
            </div>
            <div className="flex gap-3">
              <Link href="/dealer-portal/crm/assets">
                <Button variant="outline" className="border-[#E5E7EB] hover:bg-[#F9FAFB]">
                  <Upload className="w-4 h-4 mr-2" />
                  Manage Assets
                </Button>
              </Link>
              <Link href="/dealer-portal/crm/generate">
                <Button className="bg-gradient-to-r from-[#006FEE] to-[#0050B3] text-white hover:opacity-90">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Quick Generate
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <Card className="mb-8 border-2 border-[#E6F4FF] bg-gradient-to-r from-[#EFF6FF] to-[#E6F4FF]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-[#006FEE]" />
                  <h3 className="font-semibold text-[#111827]">AI Recommendations</h3>
                </div>
                <p className="text-[#374151] mb-4">
                  Based on your audience data, video content is performing 3x better this week. 
                  Consider creating more video scripts for your FlexVolt battery promotions.
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-[#006FEE] text-white">High Engagement</Badge>
                  <Badge variant="secondary">Video Content</Badge>
                  <Badge variant="secondary">Contractor Audience</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#006FEE]">+127%</div>
                <div className="text-sm text-[#6B7280]">Content ROI</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white border border-[#E5E7EB]">
            <TabsTrigger value="create" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Create New
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Templates
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentTypes.map((type) => (
                <Card 
                  key={type.type} 
                  className="border-2 border-[#E5E7EB] hover:border-[#006FEE] transition-all cursor-pointer hover:shadow-lg"
                  onClick={() => setIsGenerating(true)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${type.color} text-white`}>
                        {type.icon}
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
                    </div>
                    <CardTitle className="text-[#111827]">{type.title}</CardTitle>
                    <CardDescription className="text-[#6B7280]">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Zap className="w-4 h-4 text-[#006FEE]" />
                          <span className="text-[#374151]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="text-center py-12">
              <Palette className="w-12 h-12 text-[#006FEE] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#111827] mb-2">Template Library Coming Soon</h3>
              <p className="text-[#6B7280]">Pre-built templates optimized for battery industry marketing</p>
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Card key={project.id} className="border-2 border-[#E5E7EB]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-[#111827] mb-1">{project.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                          <span>{project.type}</span>
                          <span>•</span>
                          <span>{project.lastModified}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-[#374151]">{project.performance}</div>
                          <Badge 
                            variant={project.status === 'active' ? 'default' : project.status === 'draft' ? 'secondary' : 'outline'}
                            className={project.status === 'active' ? 'bg-[#10B981]' : ''}
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">Content Performance Overview</CardTitle>
                <CardDescription className="text-[#6B7280]">Track engagement across all content types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-[#F9FAFB] rounded-lg">
                    <TrendingUp className="w-8 h-8 text-[#006FEE] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#111827]">245%</div>
                    <div className="text-sm text-[#6B7280]">Avg. Engagement Rate</div>
                  </div>
                  <div className="text-center p-6 bg-[#F9FAFB] rounded-lg">
                    <Target className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#111827]">89%</div>
                    <div className="text-sm text-[#6B7280]">Audience Match Score</div>
                  </div>
                  <div className="text-center p-6 bg-[#F9FAFB] rounded-lg">
                    <Sparkles className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#111827]">4.8/5</div>
                    <div className="text-sm text-[#6B7280]">Content Quality Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Generation Modal Simulation */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-[#006FEE] animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#111827] mb-2">Generating Content...</h3>
                <p className="text-[#6B7280] mb-6">
                  Our AI is analyzing your audience data and creating personalized content
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsGenerating(false)}
                  className="border-[#E5E7EB]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}