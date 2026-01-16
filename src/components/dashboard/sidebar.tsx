"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, LayoutDashboard, Leaf, ScanLine, Bell, ClipboardList, Store, Settings } from 'lucide-react';
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
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/alerts', label: 'Weather & Risk Alerts', icon: Bell },
  { href: '/dashboard/scan', label: 'Crop Scan', icon: ScanLine },
  { href: '/dashboard/log', label: 'Farm Activity Log', icon: ClipboardList },
  { href: '/dashboard/forecast', label: 'Yield Forecast', icon: BarChart },
  { href: '/dashboard/marketplace', label: 'Marketplace', icon: Store },
];

const settingsMenuItem = { href: '/dashboard/settings', label: 'Settings', icon: Settings };


export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2" data-collapsible="true">
          <Leaf className="w-7 h-7 text-primary-foreground/80" />
          <span className={cn(
            "text-xl font-headline font-semibold text-primary-foreground duration-200",
            "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-ml-8"
          )}>
            AgriSense
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)}
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
