"use client"

import { useState } from "react"
import {
  BarChart,
  MessageSquare,
  Settings,
  Users,
  Zap,
  Home,
  X,
  HelpCircle,
  LogOut,
  FileText,
  Package,
  ShoppingCart,
  CreditCard,
  FileCodeIcon as FileContract,
  Layers,
  Brain,
  LayoutDashboard,
  Palette,
  Image,
  TrendingUp,
  DollarSign,
  Facebook,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeRoute?: string
}

export default function Sidebar({ open, setOpen, activeRoute = "Dashboard" }: SidebarProps) {
  const { user, logout } = useAuth()
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set())

  const toggleMenu = (menuName: string) => {
    const newExpanded = new Set(expandedMenus)
    if (newExpanded.has(menuName)) {
      newExpanded.delete(menuName)
    } else {
      newExpanded.add(menuName)
    }
    setExpandedMenus(newExpanded)
  }

  const navItems = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/portal/dashboard",
      badge: null,
    },
    {
      name: "Inventory",
      icon: Package,
      href: "/portal/inventory",
      badge: { text: "New", variant: "default" as const },
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/portal/orders",
      badge: null,
    },
    {
      name: "Billing",
      icon: CreditCard,
      href: "/portal/billing",
      badge: null,
    },
    {
      name: "Subscriptions",
      icon: FileContract,
      href: "/portal/subscriptions",
      badge: null,
    },
    {
      name: "Documents",
      icon: FileText,
      href: "/portal/documents",
      badge: null,
    },
    {
      name: "Analytics",
      icon: BarChart,
      href: "/portal/analytics",
      badge: null,
    },
    {
      name: "Reports",
      icon: Layers,
      href: "/portal/reports",
      badge: null,
    },
    {
      name: "CRM Intelligence",
      icon: Brain,
      href: "/dealer-portal/crm",
      badge: { text: "NEW", variant: "default" as const },
      subItems: [
        {
          name: "Overview Dashboard",
          href: "/dealer-portal/crm",
          icon: LayoutDashboard
        },
        {
          name: "Content Studio",
          href: "/dealer-portal/crm/content-studio",
          icon: Palette
        },
        {
          name: "Asset Library", 
          href: "/dealer-portal/crm/assets",
          icon: Image
        },
        {
          name: "Analytics Hub",
          icon: TrendingUp,
          subItems: [
            { name: "Content Performance", href: "/dealer-portal/crm/analytics/content" },
            { name: "Audience Insights", href: "/dealer-portal/crm/analytics/audience" },
            { name: "ROI Tracking", href: "/dealer-portal/crm/analytics/roi" },
            { name: "A/B Test Results", href: "/dealer-portal/crm/analytics/testing" }
          ]
        },
        {
          name: "Cost Management",
          icon: DollarSign,
          subItems: [
            { name: "API Usage & Costs", href: "/dealer-portal/crm/costs/api" },
            { name: "Cost Per Content", href: "/dealer-portal/crm/costs/content" },
            { name: "Budget Tracking", href: "/dealer-portal/crm/costs/budget" },
            { name: "Invoice History", href: "/dealer-portal/crm/costs/invoices" }
          ]
        },
        {
          name: "Operations",
          icon: Settings,
          subItems: [
            { name: "System Health", href: "/dealer-portal/crm/ops/health" },
            { name: "Job Queue Monitor", href: "/dealer-portal/crm/ops/queue" },
            { name: "Error Tracking", href: "/dealer-portal/crm/ops/errors" },
            { name: "API Keys", href: "/dealer-portal/crm/ops/api-keys" }
          ]
        },
        {
          name: "Meta Integration",
          icon: Facebook,
          subItems: [
            { name: "Campaign Dashboard", href: "/dealer-portal/crm/meta/campaigns" },
            { name: "Audience Manager", href: "/dealer-portal/crm/meta/audiences" },
            { name: "Ad Performance", href: "/dealer-portal/crm/meta/performance" },
            { name: "Pixel Events", href: "/dealer-portal/crm/meta/events" }
          ]
        }
      ]
    },
    {
      name: "Support",
      icon: MessageSquare,
      href: "/portal/chat",
      badge: null,
    },
  ]

  const adminItems = [
    {
      name: "Users",
      icon: Users,
      href: "/portal/users",
    },
    {
      name: "Integrations",
      icon: Zap,
      href: "/portal/integrations",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/portal/settings",
    },
  ]

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200/80 pt-16 transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 shadow-card",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="absolute top-4 right-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="px-4 py-6">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.name
              const isExpanded = expandedMenus.has(item.name)
              const hasSubItems = item.subItems && item.subItems.length > 0

              if (hasSubItems) {
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={cn(
                        "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-[#EFF6FF] to-[#E6F4FF] text-[#006FEE] border-l-4 border-[#006FEE]"
                          : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#006FEE]",
                      )}
                    >
                      <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-[#006FEE]" : "text-[#9CA3AF]")} />
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant={item.badge.variant} className="mr-2 bg-[#006FEE] text-white">
                          {item.badge.text}
                        </Badge>
                      )}
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="ml-6 space-y-1">
                        {item.subItems?.map((subItem) => {
                          if (subItem.subItems) {
                            const subIsExpanded = expandedMenus.has(`${item.name}-${subItem.name}`)
                            return (
                              <div key={subItem.name} className="space-y-1">
                                <button
                                  onClick={() => toggleMenu(`${item.name}-${subItem.name}`)}
                                  className="flex items-center w-full px-3 py-2 text-sm rounded-md text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#006FEE] transition-colors"
                                >
                                  {subItem.icon && <subItem.icon className="mr-3 h-4 w-4 text-[#9CA3AF]" />}
                                  <span className="flex-1 text-left">{subItem.name}</span>
                                  {subIsExpanded ? (
                                    <ChevronDown className="h-3 w-3" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3" />
                                  )}
                                </button>
                                {subIsExpanded && (
                                  <div className="ml-6 space-y-1">
                                    {subItem.subItems?.map((subSubItem) => (
                                      <Link
                                        key={subSubItem.name}
                                        href={subSubItem.href}
                                        className="block px-3 py-2 text-sm rounded-md text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#006FEE] transition-colors"
                                        onClick={() => {
                                          if (open && window.innerWidth < 1024) {
                                            setOpen(false)
                                          }
                                        }}
                                      >
                                        {subSubItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          } else {
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center px-3 py-2 text-sm rounded-md text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#006FEE] transition-colors"
                                onClick={() => {
                                  if (open && window.innerWidth < 1024) {
                                    setOpen(false)
                                  }
                                }}
                              >
                                {subItem.icon && <subItem.icon className="mr-3 h-4 w-4 text-[#9CA3AF]" />}
                                {subItem.name}
                              </Link>
                            )
                          }
                        })}
                      </div>
                    )}
                  </div>
                )
              } else {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-[#EFF6FF] to-[#E6F4FF] text-[#006FEE] border-l-4 border-[#006FEE]"
                        : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#006FEE]",
                    )}
                    onClick={() => {
                      if (open && window.innerWidth < 1024) {
                        setOpen(false)
                      }
                    }}
                  >
                    <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-[#006FEE]" : "text-[#9CA3AF]")} />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant={item.badge.variant} className="ml-auto bg-[#006FEE] text-white">
                        {item.badge.text}
                      </Badge>
                    )}
                  </Link>
                )
              }
            })}
          </div>

          {/* Admin section - hidden for now */}
          {false && (
            <>
              <Separator className="my-6" />
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Administration</p>
              <div className="space-y-1">
                {adminItems.map((item) => {
                  const isActive = activeRoute === item.name

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-brand-blue-50 to-brand-teal-50 text-brand-blue border-l-4 border-brand-blue"
                          : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue",
                      )}
                      onClick={() => {
                        if (open && window.innerWidth < 1024) {
                          setOpen(false)
                        }
                      }}
                    >
                      <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-brand-blue" : "text-slate-400")} />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          <Separator className="my-6" />

          <div className="space-y-1">
            <Link
              href="/portal/help"
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-brand-blue transition-all duration-200"
            >
              <HelpCircle className="mr-3 h-5 w-5 text-slate-400" />
              Help & Support
            </Link>
            <button
              onClick={() => logout()}
              className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-brand-blue transition-all duration-200"
            >
              <LogOut className="mr-3 h-5 w-5 text-slate-400" />
              Log Out
            </button>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-brand-blue-50 to-brand-teal-50 rounded-lg border border-brand-blue-100">
            <h4 className="font-medium text-sm text-brand-blue mb-2">Need Help?</h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Our support team is ready to assist you with any questions.
            </p>
            <Button size="sm" variant="outline" className="w-full text-xs bg-white border-slate-200">
              Contact Support
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}