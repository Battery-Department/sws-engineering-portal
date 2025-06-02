"use client"

import { Bell, HelpCircle, Menu, Plus, Search, Shield, Train } from "lucide-react"
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
    { name: "Projects", href: "/portal/projects" },
    { name: "Engineering", href: "/portal/engineering" },
    { name: "Clients", href: "/portal/clients" },
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
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-1 px-3 rounded-md mr-2 flex items-center gap-2"
            >
              <Train className="h-4 w-4" />
              SWS Engineering
            </Link>
          </div>
          <nav className="hidden lg:flex items-center ml-8 space-x-1">
            {navItems.map((item) => {
              const isActive = item.href === pathname || pathname.startsWith(item.href + '/')

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? "bg-blue-50 text