"use client"

import { useState } from 'react';
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
import { resourceData, type Resource } from '@/lib/resource-data';
import { useToast } from '@/hooks/use-toast';

const getStatusFromStock = (stock: number): Resource['status'] => {
    if (stock < 20) return 'Depleted';
    if (stock < 50) return 'Low';
    return 'Optimal';
}

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
  const [resources, setResources] = useState<Resource[]>(resourceData);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newStock, setNewStock] = useState('');
  const { toast } = useToast();

  const handleAddResource = () => {
    const stock = parseInt(newStock, 10);
    if (!newName || !newType || isNaN(stock) || stock < 0 || stock > 100) {
        toast({
            variant: 'destructive',
            title: 'Invalid Input',
            description: 'Please fill out all fields correctly. Stock must be a number between 0 and 100.',
        });
        return;
    }

    const newResource: Resource = {
        id: `res-${Date.now()}`,
        name: newName,
        type: newType as Resource['type'],
        stock: stock,
        status: getStatusFromStock(stock),
    };

    setResources([...resources, newResource]);
    setNewName('');
    setNewType('');
    setNewStock('');

    toast({
        title: 'Resource Added',
        description: `${newName} has been added to your inventory.`,
    });
  };

  // The other buttons can have placeholder functionality
  const handleAllocate = (name: string) => {
    toast({
        title: 'Allocation Simulated',
        description: `Allocation for ${name} has been recorded. (This is a demo).`,
    });
  }
  const handleRestock = (name: string) => {
     toast({
        title: 'Restock Simulated',
        description: `Restock for ${name} has been recorded. (This is a demo).`,
    });
  }


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
                                        <Button variant="default" size="sm" onClick={() => handleAllocate(resource.name)}>Allocate</Button>
                                        <Button variant="secondary" size="sm" onClick={() => handleRestock(resource.name)}>Restock</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PackagePlus className="h-5 w-5" />
                        Add New Resource
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="resource-name">Resource Name</Label>
                        <Input id="resource-name" placeholder="e.g., SuperGrow Fertilizer" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="resource-type">Resource Type</Label>
                        <Select value={newType} onValueChange={setNewType}>
                            <SelectTrigger id="resource-type">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Fertilizer">Fertilizer</SelectItem>
                                <SelectItem value="Pesticide">Pesticide</SelectItem>
                                <SelectItem value="Seeds">Seeds</SelectItem>
                                <SelectItem value="Equipment">Equipment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="initial-stock">Initial Stock (%)</Label>
                        <Input id="initial-stock" type="number" placeholder="e.g., 100" value={newStock} onChange={(e) => setNewStock(e.target.value)} />
                    </div>
                    <Button className="w-full" onClick={handleAddResource}>
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
