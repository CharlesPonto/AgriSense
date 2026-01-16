import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Soil Moisture</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">45%</p>
                <p className="text-sm text-muted-foreground">Optimal range: 40-60%</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">72°F</p>
                <p className="text-sm text-muted-foreground">Sunny with light clouds</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Active Fields</CardTitle>
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
