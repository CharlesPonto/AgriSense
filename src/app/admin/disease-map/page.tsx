import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Map, SlidersHorizontal, Layers, Info, Pin, Grape, Bug } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// A component to represent a single hotspot on the map
function Hotspot({size, crop, disease, severity}: {size: 'sm' | 'md' | 'lg', crop: string, disease: string, severity: 'Low' | 'Medium' | 'High'}) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };
    const severityColor = {
        Low: 'bg-primary/20 border-primary/50',
        Medium: 'bg-accent/20 border-accent/50',
        High: 'bg-destructive/20 border-destructive/50',
    };
    const severityRingColor = {
        Low: 'ring-primary/30',
        Medium: 'ring-accent/30',
        High: 'ring-destructive/30',
    };

    const severityBadge = {
        Low: <Badge variant="default">{severity}</Badge>,
        Medium: <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">{severity}</Badge>,
        High: <Badge variant="destructive">{severity}</Badge>
    }


    return (
         <div className="relative group">
            <div className={cn(
                'rounded-full flex items-center justify-center border-2 animate-pulse',
                sizeClasses[size],
                severityColor[severity]
            )}>
                 <div className={cn('absolute inset-0 rounded-full ring-4 animate-ping', severityRingColor[severity])} />
            </div>

            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-card border rounded-lg shadow-xl p-3 text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <p className="font-bold text-sm flex items-center gap-1"><Pin className="w-3 h-3"/> Panabo City</p>
                <div className="text-xs space-y-1 mt-2">
                    <p className="flex items-center gap-1.5"><Grape className="w-3 h-3 text-primary"/> Crop: {crop}</p>
                    <p className="flex items-center gap-1.5"><Bug className="w-3 h-3 text-destructive"/> Disease: {disease}</p>
                    <p className="flex items-center gap-1.5">Severity: {severityBadge[severity]}</p>
                    <p>Farms affected: {size === 'lg' ? 12 : size === 'md' ? 7 : 3}</p>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-card border-r border-b rotate-45" />
            </div>
        </div>
    )
}

export default function DiseaseMapPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'admin-disease-map');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      
      {/* Main Map Content */}
      <div className="lg:col-span-2 xl:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Map className="text-primary" />
              Enhanced Disease Map
            </CardTitle>
            <CardDescription>
              Interactive heatmap of disease outbreaks in the Davao region. Hover over hotspots for details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mapImage && (
              <div className="aspect-video w-full rounded-lg overflow-hidden relative border bg-muted flex items-center justify-center">
                <Image src={mapImage.imageUrl} alt={mapImage.description} data-ai-hint={mapImage.imageHint} fill className="object-cover" />
                {/* Mock Hotspots */}
                <div className="absolute top-[30%] left-[40%]">
                    <Hotspot size="lg" crop="Cacao" disease="Pod Rot" severity="High" />
                </div>
                 <div className="absolute top-[50%] left-[60%]">
                    <Hotspot size="md" crop="Banana" disease="Fusarium Wilt" severity="Medium" />
                </div>
                 <div className="absolute top-[65%] left-[35%]">
                    <Hotspot size="sm" crop="Durian" disease="Patch Canker" severity="Low" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filters & Layers Sidebar */}
      <div className="xl:col-span-1">
        <div className="sticky top-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <SlidersHorizontal className="h-5 w-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="crop-type">Crop Type</Label>
                        <Select>
                            <SelectTrigger id="crop-type">
                                <SelectValue placeholder="All Crops" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Crops</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="cacao">Cacao</SelectItem>
                                <SelectItem value="durian">Durian</SelectItem>
                                <SelectItem value="corn">Corn</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="disease-type">Disease</Label>
                        <Select>
                            <SelectTrigger id="disease-type">
                                <SelectValue placeholder="All Diseases" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Diseases</SelectItem>
                                <SelectItem value="pod-rot">Pod Rot (Cacao)</SelectItem>
                                <SelectItem value="fusarium-wilt">Fusarium Wilt (Banana)</SelectItem>
                                <SelectItem value="patch-canker">Patch Canker (Durian)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date-range">Date Range</Label>
                        <Input id="date-range" type="text" placeholder="Last 30 days" />
                    </div>
                    <Button className="w-full">Apply Filters</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Layers className="h-5 w-5" />
                        Map Layers
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="weather-layer" className="flex items-center gap-2">Weather Patterns</Label>
                        <Switch id="weather-layer" />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="risk-layer" className="flex items-center gap-2">Risk Alerts</Label>
                        <Switch id="risk-layer" checked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Info className="h-5 w-5" />
                        Legend
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/70"></div>
                        <span className="text-sm">Low Severity</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent"></div>
                        <span className="text-sm">Medium Severity</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-destructive"></div>
                        <span className="text-sm">High Severity</span>
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
