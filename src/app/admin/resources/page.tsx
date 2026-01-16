"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PackagePlus, PlusCircle } from 'lucide-react';

const resources = [
  {
    id: 'res-001',
    name: 'Fungicide-A',
    type: 'Pesticide',
    stock: 75,
    status: 'Optimal',
  },
  {
    id: 'res-002',
    name: 'Urea Fertilizer',
    type: 'Fertilizer',
    stock: 40,
    status: 'Low',
  },
  {
    id: 'res-003',
    name: 'Herbicide-B',
    type: 'Pesticide',
    stock: 90,
    status: 'Optimal',
  },
  {
    id: 'res-004',
    name: 'Potassium Nitrate',
    type: 'Fertilizer',
    stock: 15,
    status: 'Depleted',
  },
    {
    id: 'res-005',
    name: 'Insecticide-C',
    type: 'Pesticide',
    stock: 60,
    status: 'Optimal',
  },
];

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'Optimal':
            return 'default';
        case 'Low':
            return 'secondary';
        case 'Depleted':
            return 'destructive';
        default:
            return 'outline';
    }
}

const getProgressIndicatorClassName = (stock: number) => {
    if (stock < 20) return 'bg-destructive';
    if (stock < 50) return 'bg-accent';
    return 'bg-primary';
}


export default function ResourceManagementPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">Resource Management</CardTitle>
          <CardDescription>
            Allocate and manage resources like pesticides and fertilizers for the Davao region.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Resource Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Resource</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="w-[200px]">Stock Level</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resources.map((resource) => (
                                <TableRow key={resource.id}>
                                    <TableCell className="font-medium">{resource.name}</TableCell>
                                    <TableCell>{resource.type}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress value={resource.stock} className="h-2" indicatorClassName={getProgressIndicatorClassName(resource.stock)} />
                                            <span>{resource.stock}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(resource.status)}>{resource.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="default" size="sm">Allocate</Button>
                                        <Button variant="secondary" size="sm">Restock</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="sticky top-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PackagePlus className="h-5 w-5" />
                        Add New Resource
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="resource-name">Resource Name</Label>
                        <Input id="resource-name" placeholder="e.g., SuperGrow Fertilizer" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="resource-type">Resource Type</Label>
                        <Select>
                            <SelectTrigger id="resource-type">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fertilizer">Fertilizer</SelectItem>
                                <SelectItem value="pesticide">Pesticide</SelectItem>
                                <SelectItem value="seed">Seeds</SelectItem>
                                <SelectItem value="equipment">Equipment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="initial-stock">Initial Stock (%)</Label>
                        <Input id="initial-stock" type="number" placeholder="e.g., 100" />
                    </div>
                    <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Resource
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
