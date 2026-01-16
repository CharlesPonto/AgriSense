'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Flame, SlidersHorizontal, Layers, Info, Pin, Bug, Leaf, BarChart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// A component to represent a single hotspot on the heatmap
function HeatmapHotspot({
  risk,
  type,
  stats,
  positionClasses,
}: {
  risk: 'Low' | 'Medium' | 'High';
  type: 'Pest' | 'Fungal';
  stats: { area: string; crop: string; rate: string };
  positionClasses: string;
}) {
    const riskClasses = {
        Low: {
            bg: 'bg-primary/20',
            border: 'border-primary/50',
            ring: 'ring-primary/30',
            icon: <Leaf className="w-5 h-5 text-primary"/>,
            badgeVariant: 'default' as const,
            badgeClass: 'bg-primary/80'
        },
        Medium: {
            bg: 'bg-accent/20',
            border: 'border-accent/50',
            ring: 'ring-accent/30',
            icon: <Bug className="w-5 h-5 text-accent-foreground"/>,
            badgeVariant: 'secondary' as const,
            badgeClass: 'bg-accent text-accent-foreground border-accent/40'
        },
        High: {
            bg: 'bg-destructive/20',
            border: 'border-destructive/50',
            ring: 'ring-destructive/30',
            icon: <Flame className="w-5 h-5 text-destructive"/>,
            badgeVariant: 'destructive' as const,
            badgeClass: ''
        },
    };

    return (
         <div className={cn("absolute", positionClasses)}>
            <div className="relative group">
                <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center border-2 animate-pulse',
                    riskClasses[risk].bg,
                    riskClasses[risk].border
                )}>
                    {riskClasses[risk].icon}
                    <div className={cn('absolute inset-0 rounded-full ring-4 animate-ping', riskClasses[risk].ring)} />
                </div>

                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-52 bg-card border rounded-lg shadow-xl p-3 text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="font-bold text-sm flex items-center gap-1"><Pin className="w-3 h-3"/> {stats.area}</div>
                    <div className="text-xs space-y-1.5 mt-2">
                        <div className="flex items-center gap-1.5"><Layers className="w-3 h-3"/> Outbreak: {type}</div>
                        <div className="flex items-center gap-1.5"><Leaf className="w-3 h-3"/> Crop: {stats.crop}</div>
                        <div className="flex items-center gap-1.5"><BarChart className="w-3 h-3"/> Rate: {stats.rate}</div>
                        <div className="flex items-center gap-1.5">Risk: &nbsp; 
                            <Badge 
                                variant={riskClasses[risk].badgeVariant} 
                                className={riskClasses[risk].badgeClass}
                            >
                                {risk}
                            </Badge>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-card border-r border-b rotate-45" />
                </div>
            </div>
        </div>
    )
}

export default function OutbreakHeatmapPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'admin-disease-map');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      
      <div className="lg:col-span-2 xl:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Flame className="text-primary" />
              Colony Outbreak Heatmap
            </CardTitle>
            <CardDescription>
              Interactive heatmap of pest and disease clusters. Red indicates high-risk areas, yellow for medium, and green for low-risk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mapImage && (
              <div className="aspect-video w-full rounded-lg overflow-hidden relative border bg-muted flex items-center justify-center">
                <Image src={mapImage.imageUrl} alt={mapImage.description} data-ai-hint={mapImage.imageHint} fill className="object-cover opacity-80 dark:opacity-60" />
                
                {/* Mock Hotspots */}
                <HeatmapHotspot risk="High" type="Pest" stats={{area: 'Panabo City', crop: 'Banana', rate: '35 farms/km²'}} positionClasses="top-[25%] left-[38%]" />
                <HeatmapHotspot risk="Medium" type="Fungal" stats={{area: 'Santo Tomas', crop: 'Cacao', rate: '18 farms/km²'}} positionClasses="top-[55%] left-[65%]" />
                <HeatmapHotspot risk="Low" type="Pest" stats={{area: 'Calinan District', crop: 'Durian', rate: '5 farms/km²'}} positionClasses="top-[70%] left-[30%]" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
                        <Label htmlFor="outbreak-type">Outbreak Type</Label>
                        <Select>
                            <SelectTrigger id="outbreak-type">
                                <SelectValue placeholder="All Outbreaks" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Outbreaks</SelectItem>
                                <SelectItem value="pest">Pest Infestation</SelectItem>
                                <SelectItem value="fungal">Fungal Disease</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="crop-type">Crop Affected</Label>
                        <Select>
                            <SelectTrigger id="crop-type">
                                <SelectValue placeholder="All Crops" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Crops</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="cacao">Cacao</SelectItem>
                                <SelectItem value="durian">Durian</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date-range">Date Range</Label>
                        <Input id="date-range" type="text" placeholder="Last 7 days" />
                    </div>
                    <Button className="w-full">Apply Filters</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Info className="h-5 w-5" />
                        Heatmap Legend
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary border border-primary-foreground/20"></div>
                        <span className="text-sm">Low Risk / Contained</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent border border-accent-foreground/20"></div>
                        <span className="text-sm">Medium Risk / Spreading</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-destructive border border-destructive-foreground/20"></div>
                        <span className="text-sm">High Risk / Severe Outbreak</span>
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
