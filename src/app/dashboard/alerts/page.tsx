import { AlertTriangle, Bell, Droplets, MoveRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { alerts, type AlertData } from '@/lib/alerts-data';
import Link from 'next/link';
import React from 'react';


const iconMap: Record<AlertData['icon'], React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="h-6 w-6 text-destructive" />,
  Droplets: <Droplets className="h-6 w-6 text-blue-500" />,
  Bell: <Bell className="h-6 w-6 text-accent-foreground" />,
}

const getVariantClasses = (variant: string) => {
    switch (variant) {
        case 'destructive':
            return 'bg-destructive/10 border-destructive/50 hover:border-destructive';
        default:
            return 'bg-card hover:border-primary/50';
    }
}

export default function AlertsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">Alerts & Notifications</CardTitle>
          <CardDescription>Urgent updates and recommendations for your farm.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-lg border shadow-sm transition-all ${getVariantClasses(alert.variant)}`}>
                <div className="mt-1">{iconMap[alert.icon]}</div>
                <div className="flex-1">
                  <p className="font-semibold font-headline">{alert.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                   <Link href={`/dashboard/alerts/${alert.id}`} passHref>
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                      View Details <MoveRight className="w-4 h-4 ml-2" />
                    </Button>
                   </Link>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
