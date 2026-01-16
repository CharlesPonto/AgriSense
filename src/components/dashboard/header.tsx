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
  '/dashboard': 'Dashboard Overview',
  '/dashboard/alerts': 'Weather & Risk Alerts',
  '/dashboard/scan': 'Crop Scan & Diagnosis',
  '/dashboard/log': 'Farm Activity Log',
  '/dashboard/forecast': 'Yield Forecast',
  '/dashboard/settings': 'Settings',
};

export function DashboardHeader() {
  const pathname = usePathname();
  const title = Object.entries(pathToTitle).find(([path]) => pathname.startsWith(path))?.[1] || 'AgriSense';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-semibold font-headline">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage data-ai-hint="person" src="https://picsum.photos/seed/user-avatar/40/40" alt="@user" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>user@gmail.com</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard/settings" passHref>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
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
