"use client";

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Upload, Leaf, BrainCircuit, Syringe, Sparkles } from 'lucide-react';
import { aiDiagnosisFromScan, type AiDiagnosisFromScanOutput } from '@/ai/flows/ai-diagnosis-from-scan';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const getSeverityVariant = (severity: string): "default" | "secondary" | "destructive" => {
    switch (severity?.toLowerCase()) {
        case 'high':
            return 'destructive';
        case 'medium':
            return 'secondary';
        case 'low':
            return 'default';
        default:
            return 'default';
    }
}


export default function CropScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropType, setCropType] = useState<string>("");
  const [historicalData, setHistoricalData] = useState<string>("Field Location: Sector 4B\nPlanting Date: 2024-04-15\nSoil Type: Loamy sand\nRecent Fertilizers: Nitrogen-rich formula applied 2 weeks ago.\nPrevious issues in this field: Minor fungal outbreak last season (resolved).");
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
            description: "Please upload a crop scan image.",
        });
        return;
    }
    if (!cropType) {
        toast({
            variant: "destructive",
            title: "No crop type selected",
            description: "Please select the type of crop.",
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
        const aiResult = await aiDiagnosisFromScan({ cropType, cropScanDataUri, historicalData });
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <Card className="lg:sticky top-6">
        <CardHeader>
          <CardTitle className="font-headline">Crop Scan & Diagnosis</CardTitle>
          <CardDescription>Select crop, upload an image, and provide data for an AI-powered diagnosis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger id="crop-type">
                      <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="cacao">Cacao</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="durian">Durian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
              </Select>
          </div>
          <div 
            className="border-2 border-dashed border-muted-foreground/50 rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <Image src={previewUrl} alt="Crop scan preview" fill className="object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <Upload className="h-12 w-12 text-muted-foreground transition-transform group-hover:scale-110" />
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
            <Label htmlFor="historical-data">Historical & Environmental Data</Label>
            <Textarea
              id="historical-data"
              value={historicalData}
              onChange={(e) => setHistoricalData(e.target.value)}
              rows={6}
              placeholder="e.g., Soil conditions, recent weather, previous issues..."
            />
          </div>
          <Button onClick={handleDiagnose} disabled={isLoading || !file || !cropType} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
          </Button>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI Diagnosis Report</CardTitle>
            <CardDescription>Results will appear here after analysis.</CardDescription>
          </CardHeader>
        </Card>
        
        {isLoading && <DiagnosisSkeleton />}

        {result && (
          <div className="space-y-6">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className='flex items-center gap-2'>
                    <Leaf className="h-5 w-5 text-primary" />
                    Diagnosis
                  </div>
                  <Badge variant={getSeverityVariant(result.severityLevel)}>{result.severityLevel} Severity</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed pt-0 prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
                <p>{result.diagnosis}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  Reasoning
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed pt-0 prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
                 <p>{result.reasoning}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="h-5 w-5 text-primary" />
                  Treatment & Prevention
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed pt-0 prose-sm max-w-none dark:prose-invert prose-p:text-foreground">
                 <p>{result.treatmentRecommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}
        
        {!isLoading && !result && (
          <div className="text-center text-muted-foreground py-10">
            <p>Your diagnosis report is pending.</p>
            <p className="text-sm">Please select a crop and upload a scan.</p>
          </div>
        )}
      </div>
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
