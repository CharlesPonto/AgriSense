'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Map, SlidersHorizontal, Layers, Info, Pin, Grape, Bug, CalendarIcon, ShieldQuestion } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { diseaseHotspotData, type HotspotData } from '@/lib/disease-hotspot-data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

// A component to represent a single hotspot on the map
function Hotspot({ hotspot }: { hotspot: HotspotData }) {
    const { size, crop, disease, severity, area, farmsAffected } = hotspot;

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
                <div className="font-bold text-sm flex items-center gap-1"><Pin className="w-3 h-3"/> {area}</div>
                <div className="text-xs space-y-1 mt-2">
                    <div className="flex items-center gap-1.5"><Grape className="w-3 h-3 text-primary"/> Crop: {crop}</div>
                    <div className="flex items-center gap-1.5"><Bug className="w-3 h-3 text-destructive"/> Disease: {disease}</div>
                    <div className="flex items-center gap-1.5">Severity: &nbsp; {severityBadge[severity]}</div>
                    <div>Farms affected: {farmsAffected}</div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-card border-r border-b rotate-45" />
            </div>
        </div>
    )
}

export default function DiseaseMapPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'admin-disease-map');
  
  const [cropFilter, setCropFilter] = useState('all');
  const [diseaseFilter, setDiseaseFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const filteredHotspots = useMemo(() => {
    return diseaseHotspotData.filter(hotspot => {
        const cropMatch = cropFilter === 'all' || hotspot.crop === cropFilter;
        const diseaseMatch = diseaseFilter === 'all' || hotspot.disease === diseaseFilter;
        const severityMatch = severityFilter === 'all' || hotspot.severity === severityFilter;
        
        const hotspotDate = new Date(hotspot.date);
        const fromDate = date?.from ? new Date(date.from.setHours(0,0,0,0)) : null;
        const toDate = date?.to ? new Date(date.to.setHours(23,59,59,999)) : null;

        const dateMatch = fromDate && toDate
            ? hotspotDate >= fromDate && hotspotDate <= toDate
            : true;

        return cropMatch && diseaseMatch && severityMatch && dateMatch;
    });
  }, [cropFilter, diseaseFilter, severityFilter, date]);

  const uniqueCrops = [...new Set(diseaseHotspotData.map(h => h.crop))];
  const uniqueDiseases = [...new Set(diseaseHotspotData.map(h => h.disease))];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      
      {/* Main Map Content */}
      <div className="lg:col-span-2 xl:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Map className="text-primary" />
              Real-Time Disease Map
            </CardTitle>
            <CardDescription>
              Interactive heatmap of disease outbreaks in the Davao region. Hover over hotspots for details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mapImage && (
              <div className="aspect-video w-full rounded-lg overflow-hidden relative border bg-muted flex items-center justify-center">
                <Image src={mapImage.imageUrl} alt={mapImage.description} data-ai-hint={mapImage.imageHint} fill className="object-cover" />
                <div className="absolute inset-0">
                    {filteredHotspots.map(hotspot => (
                        <div key={hotspot.id} style={{ position: 'absolute', ...hotspot.position }}>
                            <Hotspot hotspot={hotspot} />
                        </div>
                    ))}
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
                        <Select value={cropFilter} onValueChange={setCropFilter}>
                            <SelectTrigger id="crop-type">
                                <SelectValue placeholder="All Crops" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Crops</SelectItem>
                                {uniqueCrops.map(crop => <SelectItem key={crop} value={crop}>{crop}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="disease-type">Disease</Label>
                        <Select value={diseaseFilter} onValueChange={setDiseaseFilter}>
                            <SelectTrigger id="disease-type">
                                <SelectValue placeholder="All Diseases" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Diseases</SelectItem>
                                {uniqueDiseases.map(disease => <SelectItem key={disease} value={disease}>{disease}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="severity-level">Severity</Label>
                        <Select value={severityFilter} onValueChange={setSeverityFilter}>
                            <SelectTrigger id="severity-level">
                                <SelectValue placeholder="All Levels" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Date Range</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                'w-full justify-start text-left font-normal',
                                !date && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                date.to ? (
                                    <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(date.from, 'LLL dd, y')
                                )
                                ) : (
                                <span>Pick a date</span>
                                )}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
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
