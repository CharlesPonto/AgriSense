import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { marketplaceData } from '@/lib/marketplace-data';
import { Star, Search, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MarketplacePage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider flex items-center gap-2"><Store/> Marketplace</CardTitle>
          <CardDescription>
            Connect with verified suppliers for fertilizers, pesticides, and tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="relative flex-1 md:grow-0 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marketplaceData.map((supplier) => (
          <Card key={supplier.id} className="overflow-hidden flex flex-col">
            <div className="relative">
                <Image 
                    src={supplier.imageUrl} 
                    alt={supplier.name} 
                    width={600}
                    height={400}
                    className="aspect-video object-cover w-full"
                    data-ai-hint={supplier.imageHint}
                />
                <Badge variant="secondary" className="absolute top-2 right-2">{supplier.category}</Badge>
            </div>
            <CardHeader>
              <CardTitle>{supplier.name}</CardTitle>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < supplier.rating ? 'text-accent-foreground fill-current' : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({supplier.rating})</span>
              </div>
              <CardDescription className="pt-2">{supplier.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button className="w-full">View Products</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
