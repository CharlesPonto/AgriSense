'use client';

import { useState, useMemo, type ChangeEvent } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  UserPlus,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { farmerData, type Farmer } from '@/lib/farmer-data';
import { cn } from '@/lib/utils';

type SortKey = keyof Farmer | '';
type SortDirection = 'asc' | 'desc';

const riskLevelIcons = {
  Low: <ShieldCheck className="h-4 w-4 text-primary" />,
  Medium: <ShieldAlert className="h-4 w-4 text-accent-foreground" />,
  High: <AlertCircle className="h-4 w-4 text-destructive" />,
};

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

const allCrops = [...new Set(farmerData.flatMap(f => f.crops))];

export default function FarmerDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cropFilters, setCropFilters] = useState<string[]>([]);
  const [riskFilters, setRiskFilters] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let data = farmerData;

    // Filter by search term
    if (searchTerm) {
      data = data.filter(farmer =>
        Object.values(farmer).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by crops
    if (cropFilters.length > 0) {
      data = data.filter(farmer =>
        cropFilters.every(filterCrop => farmer.crops.includes(filterCrop as any))
      );
    }

    // Filter by risk level
    if (riskFilters.length > 0) {
      data = data.filter(farmer => riskFilters.includes(farmer.riskLevel));
    }

    // Sort data
    if (sortKey) {
      data.sort((a, b) => {
        const aValue = a[sortKey as keyof Farmer];
        const bValue = b[sortKey as keyof Farmer];

        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [searchTerm, cropFilters, riskFilters, sortKey, sortDirection]);

  const SortableHeader = ({ tkey, label }: { tkey: SortKey; label: string }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => handleSort(tkey)} className="px-2">
        {label}
        {sortKey === tkey && (
          sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </TableHead>
  );

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">Farmer Data Management</CardTitle>
          <CardDescription>
            Monitor farmer profiles, farm activities, and potential risks.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search farmers..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by Crop</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {allCrops.map(crop => (
                     <DropdownMenuCheckboxItem
                      key={crop}
                      checked={cropFilters.includes(crop)}
                      onCheckedChange={(checked) => {
                        setCropFilters(prev =>
                          checked ? [...prev, crop] : prev.filter(c => c !== crop)
                        );
                      }}
                    >
                      {crop}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                   <DropdownMenuLabel>Filter by Risk</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Low', 'Medium', 'High'].map(risk => (
                     <DropdownMenuCheckboxItem
                      key={risk}
                      checked={riskFilters.includes(risk)}
                      onCheckedChange={(checked) => {
                        setRiskFilters(prev =>
                          checked ? [...prev, risk] : prev.filter(r => r !== risk)
                        );
                      }}
                    >
                      {risk}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
               <Button>
                <UserPlus className="mr-2 h-4 w-4"/>
                Add Farmer
            </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader tkey="name" label="Farmer" />
                  <SortableHeader tkey="barangay" label="Barangay" />
                  <SortableHeader tkey="farmSize" label="Farm Size (ha)" />
                  <TableHead>Crops</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <SortableHeader tkey="riskLevel" label="Risk Level" />
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell className="font-medium">
                        <div className="font-bold">{farmer.name}</div>
                        <div className="text-xs text-muted-foreground">{farmer.contact}</div>
                    </TableCell>
                    <TableCell>{farmer.barangay}</TableCell>
                    <TableCell>{farmer.farmSize.toFixed(1)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {farmer.crops.map(crop => (
                          <Badge key={crop} variant="outline">{crop}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{farmer.lastActivity}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskVariant(farmer.riskLevel)} className="flex items-center gap-1.5">
                        {riskLevelIcons[farmer.riskLevel]}
                        {farmer.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
                 {filteredAndSortedData.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                            No farmers found.
                        </TableCell>
                    </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
