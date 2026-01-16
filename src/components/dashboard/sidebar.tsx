"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, LayoutDashboard, Leaf, ScanLine } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/scan', label: 'Crop Scan', icon: ScanLine },
  { href: '/dashboard/forecast', label: 'Yield Forecast', icon: BarChart },
];

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
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
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
    </Sidebar>
  );
}
