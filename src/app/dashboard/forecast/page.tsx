"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forecastYield, type ForecastYieldOutput } from '@/ai/flows/yield-forecast-based-on-data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Info, Bot, Activity, TrendingDown } from 'lucide-react';

const formSchema = z.object({
  cropType: z.string().min(1, 'Crop type is required.'),
  currentData: z.string().min(1, 'Current data is required.'),
  historicalData: z.string().min(1, 'Historical data is required.'),
});

export default function YieldForecastPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ForecastYieldOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: 'Durian',
      currentData: 'Variety: Puyat. Age: 5 years. Current Stage: Fruit development. Weather: Frequent rain, high humidity. Soil: Well-drained volcanic soil, pH 6.5.',
      historicalData: 'Last year yield: 15 tons/hectare. No major disease outbreaks reported. Minor pest issues with fruit borers.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const aiResult = await forecastYield(values);
      setResult(aiResult);
    } catch (error) {
      console.error("Forecast failed:", error);
      toast({
        variant: "destructive",
        title: "Forecast Failed",
        description: "An error occurred while generating the forecast. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Yield Forecast Input</CardTitle>
          <CardDescription>Provide crop data to generate an AI-powered yield forecast.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Banana, Cacao, Corn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Data</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="e.g., Planting date, soil conditions, weather..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Data</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="e.g., Past yields, weather patterns..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                <Activity className="mr-2 h-4 w-4" />
                {isLoading ? 'Forecasting...' : 'Generate Forecast'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Forecast Report</CardTitle>
          <CardDescription>Results of the yield forecast will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <ForecastSkeleton />}
          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-headline">Predicted Yield</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{result.predictedYield}</div>
                    <p className="text-xs text-muted-foreground">{result.confidenceInterval}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-headline">Expected Losses</CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-destructive">{result.expectedLosses}</div>
                    <p className="text-xs text-muted-foreground">Based on current risk factors.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                  <div>
                      <h3 className="font-semibold flex items-center gap-2"><Info className="h-5 w-5 text-accent" />Factors Influencing Yield</h3>
                      <p className="text-muted-foreground text-sm mt-1">{result.factorsInfluencingYield}</p>
                  </div>
                   <div>
                      <h3 className="font-semibold flex items-center gap-2"><Bot className="h-5 w-5 text-accent" />Recommendations</h3>
                      <p className="text-muted-foreground text-sm mt-1">{result.recommendations}</p>
                  </div>
              </div>
            </div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground py-10">
              <p>Your forecast report is pending.</p>
              <p className="text-sm">Please fill out the form and click "Generate Forecast".</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ForecastSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-full mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-full mt-2" />
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-4 mt-6">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="space-y-4 mt-6">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    )
}
