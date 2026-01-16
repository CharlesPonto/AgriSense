import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  MapPin,
  AreaChart,
  UsersRound,
  Truck,
  BrainCircuit,
  Rss,
  LineChart,
  TrendingUp,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AdminDashboardPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'admin-disease-map');

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Welcome, Admin. Monitor disease reports, forecast yields, and plan interventions for the Davao region.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <Card className="lg:col-span-2 xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <MapPin className="text-primary" />
                    Real-Time Disease Map
                </CardTitle>
                <CardDescription>Visual hotspot reports of crop disease by region.</CardDescription>
            </CardHeader>
            <CardContent>
                {mapImage && (
                    <div className="aspect-video rounded-lg overflow-hidden relative border">
                        <Image src={mapImage.imageUrl} alt={mapImage.description} data-ai-hint={mapImage.imageHint} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-bold text-lg">3 Active Hotspots</h3>
                            <p className="text-sm">Panabo City, Santo Tomas, Island Garden City of Samal</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:-translate-y-1 bg-destructive/10 border-destructive/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Outbreak Prediction</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">High Risk</div>
            <p className="text-xs text-destructive/80">AI analysis predicts fungal outbreak in the next 48 hours.</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Regional Yield Forecast</CardTitle>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+5% Avg. Increase</div>
            <p className="text-xs text-muted-foreground">Estimated Cacao harvest for Q3.</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Farmer Data & Logs</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">Active farmers in the network.</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Resource Allocation</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78% Utilized</div>
            <p className="text-xs text-muted-foreground">Pesticides & fertilizers distribution.</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Agronomist AI</CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Active Cases</div>
            <p className="text-xs text-muted-foreground">AI-assisted expert deployment.</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Issue Advisories</CardTitle>
            <Rss className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 New Drafts</div>
            <p className="text-xs text-muted-foreground">Broadcast risk alerts to farmers.</p>
          </CardContent>
        </Card>

         <Card className="transition-all hover:shadow-lg hover:-translate-y-1 lg:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Market & Harvest Planning</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Plans Active</div>
            <p className="text-xs text-muted-foreground">Monitor predicted harvest volumes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
