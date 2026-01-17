"use client";

import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Upload, Leaf, BrainCircuit, Syringe, Sparkles, Camera, Aperture, AlertCircle } from 'lucide-react';
import { aiDiagnosisFromScan, type AiDiagnosisFromScanOutput } from '@/ai/flows/ai-diagnosis-from-scan';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


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

function dataURLtoFile(dataurl: string, filename: string): File | null {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) return null;
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}


export default function CropScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropType, setCropType] = useState<string>("");
  const [historicalData, setHistoricalData] = useState<string>("Field Location: Sector 4B\nPlanting Date: 2024-04-15\nSoil Type: Loamy sand\nRecent Fertilizers: Nitrogen-rich formula applied 2 weeks ago.\nPrevious issues in this field: Minor fungal outbreak last season (resolved).");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiDiagnosisFromScanOutput | null>(null);
  
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream;
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };
    
    getCameraPermission();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    if (video) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPreviewUrl(dataUrl);
        const capturedFile = dataURLtoFile(dataUrl, 'capture.jpg');
        setFile(capturedFile);
        setResult(null);

        // Switch to the upload tab to show the preview
        // This is a bit of a hack, a better solution would involve a shared state
        const uploadTabTrigger = document.querySelector('[data-radix-collection-item][value="upload"]') as HTMLElement | null;
        uploadTabTrigger?.click();
    }
  }

  const handleDiagnose = async () => {
    if (!file || !previewUrl) {
        toast({
            variant: "destructive",
            title: "No image provided",
            description: "Please upload or capture a crop scan image.",
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
      const aiResult = await aiDiagnosisFromScan({ cropType, cropScanDataUri: previewUrl, historicalData });
      setResult(aiResult);
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
          <CardTitle className="font-headline tracking-wider">Crop Scan & Diagnosis</CardTitle>
          <CardDescription>Select crop, provide an image, and add data for an AI-powered diagnosis.</CardDescription>
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

          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera"><Camera className="mr-2"/> Use Camera</TabsTrigger>
              <TabsTrigger value="upload"><Upload className="mr-2"/> Upload File</TabsTrigger>
            </TabsList>
            <TabsContent value="camera" className="mt-4">
              {hasCameraPermission === undefined && (
                <div className="space-y-4">
                  <Skeleton className="aspect-video w-full rounded-lg" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Camera Access Denied</AlertTitle>
                  <AlertDescription>
                    Please enable camera permissions in your browser settings to use this feature.
                  </AlertDescription>
                </Alert>
              )}
              {hasCameraPermission === true && (
                <div className="space-y-4">
                   <div className="aspect-video w-full rounded-lg overflow-hidden bg-black border relative">
                      <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                       <div className="absolute inset-0 bg-black/20" />
                   </div>
                   <Button onClick={handleCapture} className="w-full">
                      <Aperture className="mr-2"/> Capture Photo
                   </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="upload" className="mt-4">
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
            </TabsContent>
          </Tabs>
          
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
          <Button onClick={handleDiagnose} disabled={isLoading || !previewUrl || !cropType} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
          </Button>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline tracking-wider">AI Diagnosis Report</CardTitle>
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
                  <BrainCircuit className="h-5 w-5 text-accent-foreground" />
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
                  <Syringe className="h-5 w-5 text-green-600" />
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
            <p className="text-sm">Please select a crop and provide a scan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DiagnosisSkeleton() {
    return (
        <div className="space-y-6">
            <Card><CardContent className="p-6"><div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-4/5" />
            </div></CardContent></Card>
             <Card><CardContent className="p-6"><div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
            </div></CardContent></Card>
            <Card><CardContent className="p-6"><div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-2/3" />
            </div></CardContent></Card>
        </div>
    )
}
