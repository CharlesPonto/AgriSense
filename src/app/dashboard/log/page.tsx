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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ClipboardList, PlusCircle, Leaf, Droplets, Bug, Syringe } from 'lucide-react';
import { farmLogData, type FarmLog } from '@/lib/farm-log-data';
import { useToast } from '@/hooks/use-toast';
import type { LucideIcon } from 'lucide-react';

const categoryIcons: { [key: string]: LucideIcon } = {
  'Crop Health': Leaf,
  'Irrigation': Droplets,
  'Pest Control': Bug,
  'Fertilization': Syringe,
  'Harvest': ClipboardList,
  'Other': ClipboardList,
};


export default function FarmActivityLogPage() {
  const [logs, setLogs] = useState<FarmLog[]>(farmLogData);
  const [newLogCategory, setNewLogCategory] = useState('');
  const [newLogNotes, setNewLogNotes] = useState('');
  const { toast } = useToast();

  const handleAddLog = () => {
    if (!newLogCategory || !newLogNotes) {
        toast({
            variant: 'destructive',
            title: 'Missing Information',
            description: 'Please select a category and add some notes.',
        });
        return;
    }

    const newLog: FarmLog = {
        id: `log-${Date.now()}`,
        date: new Date().toISOString().split('T')[0], // format as YYYY-MM-DD
        category: newLogCategory as FarmLog['category'],
        notes: newLogNotes,
        Icon: categoryIcons[newLogCategory] || ClipboardList,
    };

    setLogs([newLog, ...logs]);
    setNewLogCategory('');
    setNewLogNotes('');

    toast({
        title: 'Log Added',
        description: `Your entry for "${newLogCategory}" has been saved.`,
    });
  }

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
            {logs.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        <p>No activity logs yet. Add your first entry!</p>
                    </CardContent>
                </Card>
            )}
            {logs.map((log) => (
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
                    <Select value={newLogCategory} onValueChange={setNewLogCategory}>
                        <SelectTrigger id="log-category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Crop Health">Crop Health</SelectItem>
                            <SelectItem value="Irrigation">Irrigation</SelectItem>
                            <SelectItem value="Pest Control">Pest Control</SelectItem>
                            <SelectItem value="Fertilization">Fertilization</SelectItem>
                             <SelectItem value="Harvest">Harvest</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="log-notes">Notes</Label>
                    <Textarea 
                        id="log-notes" 
                        rows={5} 
                        placeholder="e.g., Noticed yellowing on leaves in Sector 2..."
                        value={newLogNotes}
                        onChange={(e) => setNewLogNotes(e.target.value)}
                    />
                </div>
                <Button className="w-full" onClick={handleAddLog}>
                    Add Log
                </Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
