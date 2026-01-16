import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function DiseaseMapPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Map</CardTitle>
        <CardDescription>This page is under construction.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Construction className="h-16 w-16" />
        <p className="mt-4">Coming Soon</p>
      </CardContent>
    </Card>
  );
}
