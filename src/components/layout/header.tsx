"use client"

import { Bell, HelpCircle, Menu, Plus, Search, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = [
    { name: "Dashboard", href: "/portal/dashboard" },
    { name: "Inventory", href: "/portal/inventory" },
    { name: "Orders", href: "/portal/orders" },
    { name: "Billing", href: "/portal/billing" },
    { name: "Analytics", href: "/portal/analytics" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 border-b border-slate-200/80 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center">
            <Link
              href="/portal/dashboard"
              className="bg-gradient-to-r from-brand-blue to-brand-teal text-white font-bold py-1 px-3 rounded-md mr-2"
            >
              Battery Dept
            </Link>
          </div>
          <nav className="hidden lg:flex items-center ml-8 space-x-1">
            {navItems.map((item) => {
              const isActive = item.href === pathname

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? "bg-blue-50 text-brand-blue" : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="hidden md:flex items-center mx-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search inventory, orders, invoices..."
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            size="sm"
            className="hidden md:flex bg-gradient-to-r from-brand-blue to-brand-teal hover:from-brand-blue-600 hover:to-brand-teal-600 text-white button-glow"
          >
            <Plus className="mr-1 h-4 w-4" />
            New Order
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-600 relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-600">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-r from-brand-blue to-brand-teal text-white">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium">{user?.name || "User"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Role: {user?.role || "User"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/portal/account" className="flex w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/portal/settings" className="flex w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/portal/billing" className="flex w-full">
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}