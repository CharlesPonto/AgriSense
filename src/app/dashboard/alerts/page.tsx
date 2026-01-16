import { AlertTriangle, Bell, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const alerts = [
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
    title: 'Pest Alert: Aphids Detected',
    description: 'Aphids have been detected in Field 3. Immediate action is recommended.',
    time: '15m ago',
  },
  {
    icon: <Droplets className="h-5 w-5 text-primary" />,
    title: 'Irrigation System Malfunction',
    description: 'Sensor in Sector B reports low water pressure.',
    time: '2h ago',
  },
  {
    icon: <Bell className="h-5 w-5 text-accent" />,
    title: 'New Yield Forecast Ready',
    description: 'The forecast for your corn crop has been updated.',
    time: '1d ago',
  },
];

export default function AlertsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-card rounded-lg border shadow-sm">
                <div className="mt-1">{alert.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
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
