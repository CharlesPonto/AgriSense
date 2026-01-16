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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Filter,
  TrendingUp,
  TrendingDown,
  MapPin,
} from 'lucide-react';
import { forecastData, type ForecastData } from '@/lib/forecast-data';
import { cn } from '@/lib/utils';

const chartConfig = {
  predictedYield: {
    label: 'Predicted Yield (tons)',
    color: 'hsl(var(--chart-1))',
  },
  expectedLosses: {
    label: 'Expected Losses (tons)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const getRiskVariant = (
  risk: 'Low' | 'Medium' | 'High'
): 'default' | 'secondary' | 'destructive' => {
  switch (risk) {
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'default';
  }
};

export default function ForecastPage() {
  const [cropFilter, setCropFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredData = useMemo(() => {
    return forecastData.filter((item) => {
      const cropMatch = cropFilter === 'all' || item.cropType === cropFilter;
      const regionMatch =
        regionFilter === 'all' || item.region === regionFilter;
      return cropMatch && regionMatch;
    });
  }, [cropFilter, regionFilter]);

  const uniqueCrops = useMemo(
    () => [...new Set(forecastData.map((item) => item.cropType))],
    []
  );
  const uniqueRegions = useMemo(
    () => [...new Set(forecastData.map((item) => item.region))],
    []
  );

  const summary = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        totalYield: 0,
        highestYieldBarangay: { name: 'N/A', yield: 0 },
        highestRiskBarangay: { name: 'N/A', loss: 0 },
      };
    }

    const totalYield = filteredData.reduce(
      (acc, item) => acc + item.predictedYield,
      0
    );

    const highestYieldBarangay = filteredData.reduce(
      (max, item) =>
        item.predictedYield > max.predictedYield ? item : max,
      filteredData[0]
    );

    const highestRiskBarangay = filteredData.reduce(
      (max, item) => (item.expectedLosses > max.expectedLosses ? item : max),
      filteredData[0]
    );

    return {
      totalYield,
      highestYieldBarangay: {
        name: highestYieldBarangay.barangay,
        yield: highestYieldBarangay.predictedYield,
      },
      highestRiskBarangay: {
        name: highestRiskBarangay.barangay,
        loss: highestRiskBarangay.expectedLosses,
      },
    };
  }, [filteredData]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">
            Supply & Yield Forecast
          </CardTitle>
          <CardDescription>
            Predicted harvest data and supply risks for barangays in the Davao
            region.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="crop-type">Crop Type</Label>
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger id="crop-type">
                <SelectValue placeholder="All Crops" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {uniqueCrops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger id="region">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Predicted Yield
            </CardTitle>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.totalYield.toLocaleString()} tons
            </div>
            <p className="text-xs text-muted-foreground">
              Across {filteredData.length} barangays
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Highest Yielding Barangay
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.highestYieldBarangay.yield.toLocaleString()} tons
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {summary.highestYieldBarangay.name}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive-foreground">
              Highest Risk Area (Shortage)
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {summary.highestRiskBarangay.loss.toLocaleString()} tons loss
            </div>
            <p className="text-xs text-destructive/80 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {summary.highestRiskBarangay.name}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yield Forecast by Barangay</CardTitle>
          <CardDescription>
            Comparison of predicted yields and expected losses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart data={filteredData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="barangay"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="predictedYield"
                fill="var(--color-predictedYield)"
                radius={4}
              />
              <Bar
                dataKey="expectedLosses"
                fill="var(--color-expectedLosses)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Forecast Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Barangay</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead className="text-right">Predicted Yield (t)</TableHead>
                <TableHead className="text-right">Expected Losses (t)</TableHead>
                <TableHead className="text-right">Net Yield (t)</TableHead>
                <TableHead className="text-center">Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.barangay}</TableCell>
                  <TableCell>{item.cropType}</TableCell>
                  <TableCell className="text-right text-primary">
                    {item.predictedYield.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    {item.expectedLosses.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {(
                      item.predictedYield - item.expectedLosses
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getRiskVariant(item.riskLevel)}>
                      {item.riskLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
               {filteredData.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        No data matches the selected filters.
                    </TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
