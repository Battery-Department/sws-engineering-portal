'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Image as ImageIcon, 
  Type,
  Palette,
  Target,
  Brain,
  Zap,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  ChevronRight,
  Info,
  CheckCircle,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GeneratePage() {
  const [activeTab, setActiveTab] = useState('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('social-post');
  const [targetAudience, setTargetAudience] = useState('contractors');
  const [tone, setTone] = useState('professional');
  const [creativity, setCreativity] = useState([50]);
  const [useAudienceData, setUseAudienceData] = useState(true);

  const quickPrompts = [
    {
      title: 'Product Launch Post',
      prompt: 'Create an engaging social media post announcing our new FlexVolt battery line',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      title: 'Contractor Benefits',
      prompt: 'Write about how FlexVolt batteries improve contractor productivity',
      icon: <Target className="w-4 h-4" />
    },
    {
      title: 'Technical Comparison',
      prompt: 'Create a comparison between FlexVolt and standard batteries',
      icon: <Brain className="w-4 h-4" />
    },
    {
      title: 'Seasonal Promotion',
      prompt: 'Generate content for a spring sale on battery bundles',
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const audienceInsights = {
    contractors: {
      interests: ['Durability', 'Power efficiency', 'Cost savings'],
      painPoints: ['Battery downtime', 'Replacement costs', 'Performance in extreme conditions'],
      preferredContent: ['Technical specs', 'ROI calculations', 'Real-world tests']
    },
    retailers: {
      interests: ['Profit margins', 'Customer satisfaction', 'Inventory turnover'],
      painPoints: ['Stock management', 'Returns', 'Competition'],
      preferredContent: ['Sales data', 'Market trends', 'Promotional materials']
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`🔋 Introducing the game-changing FlexVolt Battery System!

💪 Built for professionals who demand MORE:
✓ 60% longer runtime than standard batteries
✓ Works with 20V AND 60V tools
✓ Charges in just 45 minutes

🎯 Why contractors choose FlexVolt:
• Zero downtime = More productivity
• One battery system = Less equipment cost
• Extreme weather tested = Year-round reliability

🏆 Join 10,000+ contractors who've made the switch.

Limited time: Get 20% off battery bundles this week only!
Shop now → [Link]

#FlexVolt #ContractorTools #PowerTools #BatteryTechnology`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">AI Content Generator</h1>
              <p className="text-[#6B7280] mt-1">Create personalized content powered by audience insights</p>
            </div>
            <Link href="/dealer-portal/crm/content-studio">
              <Button variant="outline" className="border-[#E5E7EB] hover:bg-[#F9FAFB]">
                Back to Studio
              </Button>
            </Link>
          </div>
        </div>

        {/* Audience Insights Banner */}
        {useAudienceData && (
          <Card className="mb-6 border-2 border-[#E6F4FF] bg-gradient-to-r from-[#EFF6FF] to-[#E6F4FF]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-[#006FEE]" />
                  <div>
                    <p className="font-medium text-[#111827]">AI Enhanced with Real Audience Data</p>
                    <p className="text-sm text-[#6B7280]">
                      Using insights from 2,847 users to optimize content
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#10B981] text-white">Active</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Prompts */}
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">Quick Prompts</CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Start with a template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickPrompts.map((quick, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(quick.prompt)}
                    className="w-full p-3 text-left rounded-lg border-2 border-[#E5E7EB] hover:border-[#006FEE] transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-[#006FEE]">{quick.icon}</div>
                        <span className="text-sm font-medium text-[#374151]">{quick.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#006FEE]" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Generation Settings */}
            <Card className="border-2 border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#111827]">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-[#374151]">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="mt-1 border-[#E5E7EB]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social-post">Social Media Post</SelectItem>
                      <SelectItem value="email">Email Campaign</SelectItem>
                      <SelectItem value="blog">Blog Article</SelectItem>
                      <SelectItem value="ad-copy">Ad Copy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#374151]">Target Audience</Label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger className="mt-1 border-[#E5E7EB]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contractors">Contractors</SelectItem>
                      <SelectItem value="retailers">Retailers</SelectItem>
                      <SelectItem value="diyers">DIY Enthusiasts</SelectItem>
                      <SelectItem value="general">General Audience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#374151]">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="mt-1 border-[#E5E7EB]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="excited">Excited</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#374151]">Creativity Level</Label>
                  <div className="mt-2 space-y-2">
                    <Slider 
                      value={creativity} 
                      onValueChange={setCreativity}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[#6B7280]">
                      <span>Conservative</span>
                      <span>{creativity[0]}%</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-[#374151]">Use Audience Data</Label>
                  <Switch 
                    checked={useAudienceData} 
                    onCheckedChange={setUseAudienceData}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Generation */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-[#E5E7EB] h-full">
              <CardHeader>
                <CardTitle className="text-[#111827]">Generate Content</CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Describe what you want to create
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white border border-[#E5E7EB]">
                    <TabsTrigger value="text" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
                      <Type className="w-4 h-4 mr-2" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="image" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image
                    </TabsTrigger>
                    <TabsTrigger value="design" className="data-[state=active]:bg-[#006FEE] data-[state=active]:text-white">
                      <Palette className="w-4 h-4 mr-2" />
                      Design
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label className="text-[#374151]">Prompt</Label>
                      <Textarea
                        placeholder="Describe the content you want to generate..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="mt-1 min-h-[120px] border-[#E5E7EB] focus:border-[#006FEE]"
                      />
                    </div>

                    {targetAudience && audienceInsights[targetAudience as keyof typeof audienceInsights] && (
                      <div className="p-4 bg-[#F9FAFB] rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-[#006FEE]" />
                          <span className="text-sm font-medium text-[#374151]">Audience Insights</span>
                        </div>
                        <div className="space-y-1 text-sm text-[#6B7280]">
                          <p>• Interests: {audienceInsights[targetAudience as keyof typeof audienceInsights].interests.join(', ')}</p>
                          <p>• Pain Points: {audienceInsights[targetAudience as keyof typeof audienceInsights].painPoints[0]}</p>
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={handleGenerate}
                      disabled={!prompt || isGenerating}
                      className="w-full bg-gradient-to-r from-[#006FEE] to-[#0050B3] text-white hover:opacity-90"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate Content
                        </>
                      )}
                    </Button>

                    {generatedContent && (
                      <div className="space-y-4">
                        <div className="p-4 bg-[#F9FAFB] rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-[#10B981]" />
                              <span className="font-medium text-[#111827]">Generated Content</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-[#E5E7EB]">
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="border-[#E5E7EB]">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="border-[#E5E7EB]">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <pre className="whitespace-pre-wrap text-sm text-[#374151] font-normal">
                            {generatedContent}
                          </pre>
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 bg-[#006FEE] text-white hover:bg-[#0050B3]">
                            Use in Campaign
                          </Button>
                          <Button variant="outline" className="flex-1 border-[#E5E7EB]">
                            Save to Library
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="image" className="py-12 text-center">
                    <ImageIcon className="w-12 h-12 text-[#006FEE] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#111827] mb-2">Image Generation Coming Soon</h3>
                    <p className="text-[#6B7280]">AI-powered product images and social media visuals</p>
                  </TabsContent>

                  <TabsContent value="design" className="py-12 text-center">
                    <Palette className="w-12 h-12 text-[#006FEE] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#111827] mb-2">Design Templates Coming Soon</h3>
                    <p className="text-[#6B7280]">Professional layouts optimized for Meta advertising</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}