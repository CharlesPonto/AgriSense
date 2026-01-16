"use client"

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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { farmLogData } from '@/lib/farm-log-data';

export default function FarmActivityLogPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      
      <div className="lg:col-span-2 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline tracking-wider">Farm Activity Log</CardTitle>
                <CardDescription>A record of all activities and observations on your farm.</CardDescription>
            </CardHeader>
        </Card>
        <div className="space-y-6">
            <h2 className="text-xl font-semibold font-headline">Recent Logs</h2>
            {farmLogData.map((log) => (
                <Card key={log.id} className="flex items-start gap-4 p-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <log.Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">{log.category}</p>
                        <p className="text-sm text-muted-foreground">{log.notes}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{log.date}</p>
                </Card>
            ))}
        </div>
      </div>
      
      <div>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Add New Log Entry
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="log-category">Category</Label>
                    <Select>
                        <SelectTrigger id="log-category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="crop-health">Crop Health</SelectItem>
                            <SelectItem value="irrigation">Irrigation</SelectItem>
                            <SelectItem value="pest-control">Pest Control</SelectItem>
                            <SelectItem value="fertilization">Fertilization</SelectItem>
                             <SelectItem value="harvest">Harvest</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="log-notes">Notes</Label>
                    <Textarea id="log-notes" rows={5} placeholder="e.g., Noticed yellowing on leaves in Sector 2..." />
                </div>
                <Button className="w-full">
                    Add Log
                </Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
