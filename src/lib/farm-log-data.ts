import { Leaf, Droplets, Bug, Syringe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type FarmLog = {
  id: string;
  date: string;
  category: 'Crop Health' | 'Irrigation' | 'Pest Control' | 'Fertilization';
  notes: string;
  Icon: LucideIcon;
};

export const farmLogData: FarmLog[] = [
  {
    id: 'log-001',
    date: '2024-07-20',
    category: 'Pest Control',
    notes: 'Spotted early signs of fruit borers on Durian trees in Sector A. Applied a targeted pesticide spray.',
    Icon: Bug,
  },
  {
    id: 'log-002',
    date: '2024-07-18',
    category: 'Irrigation',
    notes: 'Increased irrigation schedule for Cacao trees due to dry weather. Soil moisture is now at 55%.',
    Icon: Droplets,
  },
  {
    id: 'log-003',
    date: '2024-07-15',
    category: 'Crop Health',
    notes: 'Banana plants in Sector C are showing robust growth after the last fertilizer application. No signs of disease.',
    Icon: Leaf,
  },
    {
    id: 'log-004',
    date: '2024-07-12',
    category: 'Fertilization',
    notes: 'Applied potassium-rich fertilizer to all Durian trees to support fruit development.',
    Icon: Syringe,
  },
];
