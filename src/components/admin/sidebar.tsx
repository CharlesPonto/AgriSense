"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  LayoutDashboard, 
  Map, 
  AreaChart, 
  Users, 
  AlertTriangle, 
  Flame, 
  FileText, 
  Settings 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const mainMenuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/disease-map', label: 'Disease Map', icon: Map },
  { href: '/admin/forecast', label: 'Supply & Forecast', icon: AreaChart },
  { href: '/admin/farmers', label: 'Farmer Data', icon: Users },
  { href: '/admin/weather-alerts', label: 'Weather Alerts', icon: AlertTriangle },
  { href: '/admin/outbreak-heatmap', label: 'Outbreak Heatmap', icon: Flame },
  { href: '/admin/reports', label: 'Reports & Analytics', icon: FileText },
];

const settingsMenuItem = { href: '/admin/settings', label: 'Settings', icon: Settings };

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2" data-collapsible="true">
          <Shield className="w-7 h-7 text-primary-foreground/80" />
          <span className={cn(
            "text-xl font-headline font-semibold text-primary-foreground duration-200",
            "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-ml-8"
          )}>
            AgriSense Admin
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={item.href === '/admin/dashboard' ? pathname === item.href : pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="mt-auto p-2">
        <SidebarMenu>
          <SidebarSeparator className="my-1" />
           <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(settingsMenuItem.href)}
                  tooltip={settingsMenuItem.label}
                >
                  <Link href={settingsMenuItem.href}>
                    <settingsMenuItem.icon />
                    <span>{settingsMenuItem.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </Sidebar>
  );
}
