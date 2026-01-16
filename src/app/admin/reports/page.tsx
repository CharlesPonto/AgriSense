'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Download,
  CalendarIcon,
  Bug,
  TrendingUp,
  Warehouse,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip as ChartTooltipComponent,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { forecastData } from '@/lib/forecast-data';
import { resourceData } from '@/lib/resource-data';
import { farmerData } from '@/lib/farmer-data';
import { useToast } from '@/hooks/use-toast';

// Mock data for disease trends
const diseaseData = [
  { month: 'Jan', 'Fusarium Wilt': 4, 'Pod Rot': 2, 'Patch Canker': 1 },
  { month: 'Feb', 'Fusarium Wilt': 3, 'Pod Rot': 3, 'Patch Canker': 2 },
  { month: 'Mar', 'Fusarium Wilt': 5, 'Pod Rot': 4, 'Patch Canker': 2 },
  { month: 'Apr', 'Fusarium Wilt': 7, 'Pod Rot': 5, 'Patch Canker': 3 },
  { month: 'May', 'Fusarium Wilt': 6, 'Pod Rot': 7, 'Patch Canker': 4 },
  { month: 'Jun', 'Fusarium Wilt': 8, 'Pod Rot': 9, 'Patch Canker': 5 },
];

const diseaseChartConfig = {
  'Fusarium Wilt': {
    label: 'Fusarium Wilt',
    color: 'hsl(var(--chart-1))',
  },
  'Pod Rot': {
    label: 'Pod Rot',
    color: 'hsl(var(--chart-2))',
  },
  'Patch Canker': {
    label: 'Patch Canker',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;


const yieldChartConfig = {
  predictedYield: {
    label: 'Predicted Yield',
    color: 'hsl(var(--chart-1))',
  },
  expectedLosses: {
    label: 'Expected Losses',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const resourceChartConfig = {
  stock: {
    label: 'Stock Level',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;


export default function ReportsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const { toast } = useToast();

  React.useEffect(() => {
    const fromDate = new Date();
    fromDate.setDate(new Date().getDate() - 180);
    setDate({
      from: fromDate,
      to: new Date(),
    });
  }, []);

  const handleExport = () => {
    toast({
        title: 'Exporting Report',
        description: 'A CSV file is being generated. (This is a demo).',
    });
  };

  const yieldSummary = React.useMemo(() => {
    const summary: { [key: string]: { predictedYield: number, expectedLosses: number } } = {};
    forecastData.forEach(item => {
        if (!summary[item.cropType]) {
            summary[item.cropType] = { predictedYield: 0, expectedLosses: 0 };
        }
        summary[item.cropType].predictedYield += item.predictedYield;
        summary[item.cropType].expectedLosses += item.expectedLosses;
    });
    return Object.entries(summary).map(([crop, data]) => ({ crop, ...data }));
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">
            Reports & Analytics
          </CardTitle>
          <CardDescription>
            Analyze trends, forecasts, and performance across the agricultural network.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle>Analytics Dashboard</CardTitle>
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                            'w-[280px] justify-start text-left font-normal',
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
                    <Button onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bug/> Disease & Pest Report Summary
                </CardTitle>
                <CardDescription>Reported cases over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={diseaseChartConfig} className="min-h-[300px] w-full">
                    <BarChart data={diseaseData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        />
                        <YAxis />
                        <ChartTooltipComponent
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="Fusarium Wilt" fill="var(--color-Fusarium Wilt)" radius={4} />
                        <Bar dataKey="Pod Rot" fill="var(--color-Pod Rot)" radius={4} />
                        <Bar dataKey="Patch Canker" fill="var(--color-Patch Canker)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp /> Yield vs. Loss by Crop
                </CardTitle>
                <CardDescription>Total predicted yield against expected losses per crop type.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={yieldChartConfig} className="min-h-[300px] w-full">
                    <BarChart data={yieldSummary} layout="vertical">
                        <CartesianGrid horizontal={false} />
                        <YAxis type="category" dataKey="crop" tickLine={false} axisLine={false} width={60} />
                        <XAxis type="number" hide />
                        <ChartTooltipComponent cursor={false} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="predictedYield" fill="var(--color-predictedYield)" radius={4} />
                        <Bar dataKey="expectedLosses" fill="var(--color-expectedLosses)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Warehouse /> Resource Stock Levels
                </CardTitle>
                <CardDescription>Current inventory status for key resources.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={resourceChartConfig} className="min-h-[300px] w-full">
                    <BarChart data={resourceData}>
                         <CartesianGrid vertical={false} />
                         <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} angle={-45} textAnchor="end" height={80} />
                         <YAxis />
                         <ChartTooltipComponent cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                         <Bar dataKey="stock" name="Stock Level (%)" fill="var(--color-stock)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users /> Top 5 Active Farmers
                </CardTitle>
                <CardDescription>Farmers with the most recent activity logs.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Farmer</TableHead>
                            <TableHead>Barangay</TableHead>
                            <TableHead>Last Activity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {farmerData.slice(0, 5).map(farmer => (
                            <TableRow key={farmer.id}>
                                <TableCell className="font-medium">{farmer.name}</TableCell>
                                <TableCell>{farmer.barangay}</TableCell>
                                <TableCell>{farmer.lastActivity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
