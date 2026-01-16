import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Cloud, Droplets } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Farmer Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Welcome, farmer. Here is an overview of your farm's status.</p>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">Soil Moisture</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">45%</p>
                <p className="text-sm text-muted-foreground">Optimal range: 40-60%</p>
            </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">Weather Forecast</CardTitle>
                <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">28°C</p>
                <p className="text-sm text-muted-foreground">Sunny with light clouds</p>
            </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">Active Fields</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">5 / 7</p>
                <p className="text-sm text-muted-foreground">Fields currently under cultivation</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
