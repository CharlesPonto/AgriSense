import { AlertTriangle, Bell, Droplets, MoveLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { alerts, type AlertData } from '@/lib/alerts-data';
import React from 'react';
import { notFound } from 'next/navigation';

const iconMap: Record<AlertData['icon'], React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="h-10 w-10 text-destructive" />,
  Droplets: <Droplets className="h-10 w-10 text-blue-500" />,
  Bell: <Bell className="h-10 w-10 text-accent-foreground" />,
}


export default function AlertDetailPage({ params }: { params: { id: string } }) {
  const alert = alerts.find(a => a.id === params.id);

  if (!alert) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              {iconMap[alert.icon]}
              <div>
                <CardTitle className="font-headline tracking-wider text-2xl">{alert.title}</CardTitle>
                <CardDescription>{alert.time}</CardDescription>
              </div>
            </div>
            <Link href="/dashboard/alerts" passHref>
                <Button variant="outline">
                    <MoveLeft className="w-4 h-4 mr-2" />
                    Back to Alerts
                </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
            <h3 className="font-semibold text-lg not-prose">Details</h3>
            <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{alert.details}</p>
          </div>
          <div className="prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
            <h3 className="font-semibold text-lg not-prose">Recommendations</h3>
            <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{alert.recommendations}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
