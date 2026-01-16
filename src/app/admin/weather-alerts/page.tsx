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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Filter } from 'lucide-react';
import { weatherAlertsData, type WeatherAlert } from '@/lib/weather-alerts-data';
import { cn } from '@/lib/utils';

const severityConfig = {
  Low: {
    label: 'Low',
    color: 'hsl(var(--chart-1))',
    className: 'border-primary/50 bg-primary/5',
    badgeVariant: 'default' as const,
  },
  Medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-4))',
    className: 'border-accent/50 bg-accent/10',
    badgeVariant: 'secondary' as const,
  },
  High: {
    label: 'High',
    color: 'hsl(var(--chart-2))',
    className:
      'border-destructive/50 bg-destructive/10',
    badgeVariant: 'destructive' as const,
  },
  Critical: {
    label: 'Critical',
    color: 'hsl(var(--destructive))',
    className: 'border-destructive bg-destructive/20',
    badgeVariant: 'destructive' as const,
  },
};

const chartConfig: ChartConfig = Object.fromEntries(
  Object.entries(severityConfig).map(([key, value]) => [
    key,
    { label: value.label, color: value.color },
  ])
);

export default function WeatherAlertsPage() {
  const [regionFilter, setRegionFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const sortedAlerts = useMemo(() => {
    const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    return [...weatherAlertsData].sort(
      (a, b) => severityOrder[b.severity] - severityOrder[a.severity]
    );
  }, []);

  const filteredAlerts = useMemo(() => {
    return sortedAlerts.filter((alert) => {
      const regionMatch =
        regionFilter === 'All' || alert.region === regionFilter;
      const severityMatch =
        severityFilter === 'All' || alert.severity === severityFilter;
      return regionMatch && severityMatch;
    });
  }, [regionFilter, severityFilter, sortedAlerts]);

  const chartData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    filteredAlerts.forEach((alert) => {
      counts[alert.severity]++;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      fill: severityConfig[name as keyof typeof severityConfig].color,
    }));
  }, [filteredAlerts]);

  const uniqueRegions = useMemo(
    () => [...new Set(['All', ...weatherAlertsData.map((item) => item.region)])].filter((value, index, self) => self.indexOf(value) === index),
    []
  );

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider flex items-center gap-2">
            <AlertTriangle />
            Weather & Risk Alerts
          </CardTitle>
          <CardDescription>
            Real-time notifications for weather conditions and potential crop risks.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <Card>
             <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                </CardTitle>
             </CardHeader>
             <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="region-filter">Region</Label>
                    <Select value={regionFilter} onValueChange={setRegionFilter}>
                        <SelectTrigger id="region-filter">
                            <SelectValue placeholder="Filter by region" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueRegions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="severity-filter">Severity</Label>
                    <Select value={severityFilter} onValueChange={setSeverityFilter}>
                        <SelectTrigger id="severity-filter">
                            <SelectValue placeholder="Filter by severity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Severities</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
             </CardContent>
           </Card>

          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={cn(
                    'border-l-4',
                    severityConfig[alert.severity].className
                  )}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <alert.Icon className={cn("h-6 w-6 mt-1", severityConfig[alert.severity].badgeVariant === 'destructive' ? 'text-destructive' : 'text-primary')} />
                        <div>
                            <CardTitle className="text-lg font-headline">{alert.title}</CardTitle>
                            <CardDescription className="mt-1">
                                {alert.description}
                            </CardDescription>
                            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-4">
                                <span>Region: {alert.region}</span>
                                <span>Crops: {alert.cropImpact.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                     <div className="text-right flex-shrink-0">
                        <Badge variant={severityConfig[alert.severity].badgeVariant}>
                            {alert.severity}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="recommendations">
                            <AccordionTrigger>Actionable Recommendations</AccordionTrigger>
                            <AccordionContent className="prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
                                <p className="whitespace-pre-wrap">{alert.recommendations}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
                 <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        <p>No alerts match the current filters.</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>

        <div className="sticky top-6 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Alert Severity Breakdown</CardTitle>
                <CardDescription>Number of active alerts by severity.</CardDescription>
                </CardHeader>
                <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{left: 10}}>
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            className='text-xs'
                        />
                        <XAxis dataKey="value" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="value" layout="vertical" radius={5}>
                             {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
