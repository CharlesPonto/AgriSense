'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import {
  Filter,
} from 'lucide-react';
import { weatherAlertsData } from '@/lib/weather-alerts-data';
import { cn } from '@/lib/utils';

const severityConfig = {
  Low: {
    label: 'Low',
    color: 'hsl(var(--chart-1))',
    className: 'border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    iconColor: 'text-blue-500',
  },
  Medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-4))',
    className: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300',
    iconColor: 'text-yellow-500',
  },
  High: {
    label: 'High',
    color: 'hsl(var(--chart-2))',
    className: 'border-orange-500/50 bg-orange-500/10 text-orange-700 dark:text-orange-300',
    iconColor: 'text-orange-500',
  },
  Critical: {
    label: 'Critical',
    color: 'hsl(var(--destructive))',
    className: 'border-destructive/50 bg-destructive/10 text-destructive',
    iconColor: 'text-destructive',
  },
} satisfies ChartConfig & {
    [key: string]: {
        className: string;
        iconColor: string;
    }
};

const allCrops = [...new Set(weatherAlertsData.flatMap(a => a.cropImpact))].filter(c => c !== 'All');
const allRegions = [...new Set(weatherAlertsData.map(a => a.region))].filter(r => r !== 'All');


export default function WeatherAlertsPage() {
  const [regionFilter, setRegionFilter] = useState('all');
  const [cropFilter, setCropFilter] = useState('all');

  const filteredAlerts = useMemo(() => {
    return weatherAlertsData.filter(alert => {
      const regionMatch =
        regionFilter === 'all' || alert.region === 'All' || alert.region === regionFilter;
      const cropMatch =
        cropFilter === 'all' || alert.cropImpact.includes('All') || alert.cropImpact.includes(cropFilter as any);
      return regionMatch && cropMatch;
    });
  }, [regionFilter, cropFilter]);

  const chartData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    filteredAlerts.forEach(alert => {
      counts[alert.severity]++;
    });
    return Object.entries(counts).map(([severity, count]) => ({
      severity,
      count,
      fill: severityConfig[severity as keyof typeof severityConfig].color
    }));
  }, [filteredAlerts]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">Weather & Risk Alerts</CardTitle>
          <CardDescription>
            Real-time notifications for weather events and potential crop risks in the Davao region.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Filters and Chart */}
        <div className="lg:col-span-1 space-y-6 sticky top-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Filter className="h-5 w-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="region-filter">Region</Label>
                        <Select value={regionFilter} onValueChange={setRegionFilter}>
                            <SelectTrigger id="region-filter">
                                <SelectValue placeholder="All Regions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Regions</SelectItem>
                                {allRegions.map(region => (
                                    <SelectItem key={region} value={region}>{region}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="crop-filter">Crop Impact</Label>
                        <Select value={cropFilter} onValueChange={setCropFilter}>
                            <SelectTrigger id="crop-filter">
                                <SelectValue placeholder="All Crops" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Crops</SelectItem>
                                 {allCrops.map(crop => (
                                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Alert Severity Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={severityConfig} className="min-h-[200px] w-full">
                        <BarChart data={chartData} layout="vertical" margin={{ left: -10 }}>
                             <XAxis type="number" hide />
                            <YAxis
                                dataKey="severity"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={({ x, y, payload }) => (
                                    <text x={x} y={y} dy={4} textAnchor="end" fill="hsl(var(--foreground))" className="text-sm font-medium">
                                        {payload.value}
                                    </text>
                                )}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent
                                    labelFormatter={(value) => severityConfig[value as keyof typeof severityConfig].label}
                                    indicator="dot"
                                />}
                            />
                            <Bar dataKey="count" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>

        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
             {filteredAlerts.length > 0 ? (
                filteredAlerts.map(alert => (
                    <Card key={alert.id} className={cn('overflow-hidden', severityConfig[alert.severity].className)}>
                       <div className="flex items-start p-4 gap-4">
                           <div className="mt-1">
                                <alert.Icon className={cn('h-8 w-8', severityConfig[alert.severity].iconColor)} />
                           </div>
                           <div className="flex-1">
                               <CardTitle className="text-base font-headline mb-1 flex justify-between items-center">
                                   {alert.title}
                                   <Badge variant={alert.severity === 'Critical' || alert.severity === 'High' ? 'destructive' : 'secondary'}>
                                        {alert.severity}
                                   </Badge>
                               </CardTitle>
                               <CardDescription className="text-foreground/80 text-sm">
                                   {alert.description}
                               </CardDescription>
                               <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <strong>Region:</strong> {alert.region} | <strong>Impacted:</strong> {alert.cropImpact.join(', ')}
                                    </div>
                                    <span>{alert.timestamp}</span>
                               </div>
                           </div>
                       </div>
                    </Card>
                ))
            ) : (
                <Card>
                    <CardContent className="p-10 text-center text-muted-foreground">
                       <p>No weather alerts match the current filters.</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
