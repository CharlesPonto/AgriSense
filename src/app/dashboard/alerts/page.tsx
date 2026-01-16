import { AlertTriangle, Bell, Droplets, MoveRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const alerts = [
  {
    icon: <AlertTriangle className="h-6 w-6 text-destructive" />,
    title: 'High Risk: Fungal Infection Detected',
    description: 'Our AI has detected early signs of fungal infection in your Cacao field (Sector 3B). Immediate action is recommended to prevent spread.',
    time: '15m ago',
    variant: 'destructive',
  },
  {
    icon: <Droplets className="h-6 w-6 text-blue-500" />,
    title: 'Irrigation System Alert',
    description: 'Sensor in Sector B reports low water pressure. Check for leaks or malfunctions.',
    time: '2h ago',
    variant: 'default',
  },
  {
    icon: <Bell className="h-6 w-6 text-accent-foreground" />,
    title: 'New Yield Forecast Available',
    description: 'The Q3 forecast for your Durian crop has been updated based on recent weather patterns.',
    time: '1d ago',
    variant: 'default',
  },
];

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
            {alerts.map((alert, index) => (
              <div key={index} className={`flex items-start gap-4 p-4 rounded-lg border shadow-sm transition-all ${getVariantClasses(alert.variant)}`}>
                <div className="mt-1">{alert.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold font-headline">{alert.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                   <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                    View Details <MoveRight className="w-4 h-4 ml-2" />
                  </Button>
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
