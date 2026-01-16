"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const pathToTitle: { [key: string]: string } = {
  '/admin/dashboard': 'Admin Dashboard',
  '/admin/disease-map': 'Disease Map',
  '/admin/forecast': 'Supply & Yield Forecast',
  '/admin/farmers': 'Farmer Data Management',
  '/admin/weather-alerts': 'Weather & Risk Alerts',
  '/admin/outbreak-heatmap': 'Colony Outbreak Heatmap',
  '/admin/reports': 'Reports & Analytics',
  '/admin/settings': 'Settings',
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = pathToTitle[pathname] || 'Admin';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-semibold font-headline">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage data-ai-hint="person" src="https://picsum.photos/seed/admin-avatar/40/40" alt="@admin" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>admin@gmail.com</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/" passHref>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
