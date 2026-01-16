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
import { Badge, type BadgeProps } from '@/components/ui/badge';
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
import { weatherAlertsData, type WeatherAlert } from '@/lib/weather-alerts-data';
import { cn } from '@/lib/utils';

// Updated severityConfig to use theme variables for better consistency
const severityConfig = {
  Low: {
    label: 'Low',
    color: 'hsl(var(--chart-1))',
    className: 'border-primary/50 bg-primary/10 text-primary',
    iconColor: 'text-primary',
  },
  Medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-4))',
    className: 'border-accent/50 bg-accent/10 text-accent-foreground',
    iconColor: 'text-accent',
  },
  High: {
    label: 'High',
    color: 'hsl(var(--chart-2))',
    className: 'border-chart-2/50 bg-chart-2/10 text-chart-2',
    iconColor: 'text-chart-2',
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

// Helper function to map severity to a specific Badge variant
const getSeverityBadgeVariant = (severity: WeatherAlert['severity']): BadgeProps['variant'] => {
    switch (severity) {
        case 'Critical':
        case 'High':
            return 'destructive';
        case 'Medium':
            return 'secondary';
        case 'Low':
            return 'default';
        default:
            return 'outline';
    }
}

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
    }).sort((a, b) => { // Sort alerts by severity
        const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
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
          <CardTitle className="font-headline tracking-wider">Weather &amp; Risk Alerts</CardTitle>
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
                                   <Badge variant={getSeverityBadgeVariant(alert.severity)}>
                                        {alert.severity}
                                   </Badge>
                               </CardTitle>
                               <CardDescription className="text-current/80 text-sm">
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
