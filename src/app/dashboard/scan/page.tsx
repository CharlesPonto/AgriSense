"use client";

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Upload, Leaf, BrainCircuit, Syringe } from 'lucide-react';
import { aiDiagnosisFromScan, type AiDiagnosisFromScanOutput } from '@/ai/flows/ai-diagnosis-from-scan';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

export default function CropScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<string>("Crop: Corn (Zea mays)\nField Location: Sector 4B\nPlanting Date: 2024-04-15\nSoil Type: Loamy sand\nRecent Fertilizers: Nitrogen-rich formula applied 2 weeks ago.\nPrevious issues in this field: Minor fungal outbreak last season (resolved).");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiDiagnosisFromScanOutput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDiagnose = async () => {
    if (!file) {
        toast({
            variant: "destructive",
            title: "No file selected",
            description: "Please upload a crop scan image to get a diagnosis.",
        });
        return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        const cropScanDataUri = event.target?.result as string;
        if (!cropScanDataUri) {
            throw new Error("Could not read file.");
        }
        const aiResult = await aiDiagnosisFromScan({ cropScanDataUri, historicalData });
        setResult(aiResult);
      };
      reader.onerror = () => {
        throw new Error("Error reading file.");
      }
    } catch (error) {
        console.error("Diagnosis failed:", error);
        toast({
            variant: "destructive",
            title: "Diagnosis Failed",
            description: "An error occurred while analyzing the scan. Please try again.",
        });
    } finally {
      setIsLoading(false);
    }
  };
  
  const placeholderImage = PlaceHolderImages.find(p => p.id === 'crop-scan-placeholder');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upload Crop Scan</CardTitle>
          <CardDescription>Upload an image of the affected crop and provide historical data for an AI-powered diagnosis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="border-2 border-dashed border-muted-foreground/50 rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <Image src={previewUrl} alt="Crop scan preview" fill className="object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="historical-data">Historical Data</Label>
            <Textarea
              id="historical-data"
              value={historicalData}
              onChange={(e) => setHistoricalData(e.target.value)}
              rows={6}
              placeholder="e.g., Crop type, soil conditions, recent weather..."
            />
          </div>
          <Button onClick={handleDiagnose} disabled={isLoading || !file} className="w-full">
            <Leaf className="mr-2 h-4 w-4" />
            {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Diagnosis Report</CardTitle>
          <CardDescription>Results will appear here after analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <DiagnosisSkeleton />}
          {result && (
            <Accordion type="single" collapsible defaultValue="diagnosis" className="w-full">
              <AccordionItem value="diagnosis">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    Diagnosis
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed pt-2 prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
                  {result.diagnosis}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reasoning">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Reasoning
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed pt-2 prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
                  {result.reasoning}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="treatment">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Syringe className="h-5 w-5 text-primary" />
                    Treatment Recommendations
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed pt-2 prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
                  {result.treatmentRecommendations}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {!isLoading && !result && (
            <div className="text-center text-muted-foreground py-10">
              <p>Your diagnosis report is pending.</p>
              <p className="text-sm">Please upload a scan and click "Get Diagnosis".</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DiagnosisSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-4/5" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-2/3" />
            </div>
        </div>
    )
}
