import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Thermometer, CloudSun, Droplets, Leaf, BarChart, Bell } from 'lucide-react';
import Link from 'next/link';

const dashboardLinks = [
  {
    href: '/dashboard/scan',
    title: 'Crop Scan',
    description: 'Diagnose diseases with your camera.',
    icon: <Leaf className="w-8 h-8 text-primary" />,
    value: 'New Diagnosis',
  },
  {
    href: '/dashboard/forecast',
    title: 'Yield Forecast',
    description: 'Predict your next harvest.',
    icon: <BarChart className="w-8 h-8 text-primary" />,
    value: '+15%
',
  },
   {
    href: '/dashboard/alerts',
    title: 'Alerts',
    description: 'Check for new risk warnings.',
    icon: <Bell className="w-8 h-8 text-primary" />,
    value: '3 Unread',
  },
]

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">Farmer Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Welcome, farmer. Here is an overview of your farm's status.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardLinks.map(link => (
          <Link href={link.href} key={link.href}>
            <Card className="transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
              <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-headline">{link.title}</CardTitle>
                      <CardDescription className="mt-1">{link.description}</CardDescription>
                    </div>
                    {link.icon}
                  </div>
              </CardHeader>
              <CardContent className="mt-auto">
                  <p className="text-2xl font-bold">{link.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">Soil Moisture</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">45%</p>
                <p className="text-sm text-muted-foreground">Optimal range: 40-60%</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">Weather Forecast</CardTitle>
                <CloudSun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">28°C</p>
                <p className="text-sm text-muted-foreground">Sunny with light clouds</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">Air Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">32°C</p>
                <p className="text-sm text-muted-foreground">Humidity at 76%</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
