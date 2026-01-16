import { LucideIcon, Wind, Thermometer, CloudDrizzle, Zap } from 'lucide-react';

export type WeatherAlert = {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  region: 'District 1' | 'District 2' | 'District 3' | 'All';
  cropImpact: ('Cacao' | 'Banana' | 'Durian' | 'Corn' | 'Rice' | 'All')[];
  timestamp: string;
  Icon: LucideIcon;
};

export const weatherAlertsData: WeatherAlert[] = [
    {
    id: 'alert-004',
    title: 'Lightning Storm Alert',
    description: 'A severe thunderstorm with frequent lightning is approaching District 1. This poses a risk to farm workers and equipment.',
    severity: 'Critical',
    region: 'District 1',
    cropImpact: ['All'],
    timestamp: '30 minutes ago',
    Icon: Zap,
  },
  {
    id: 'alert-001',
    title: 'High Winds Expected',
    description: 'Gusts up to 60 km/h are forecasted for the coastal areas of District 2. This may cause damage to tall crops like bananas.',
    severity: 'High',
    region: 'District 2',
    cropImpact: ['Banana'],
    timestamp: '2 hours ago',
    Icon: Wind,
  },
  {
    id: 'alert-005',
    title: 'Slight Temperature Drop',
    description: 'A minor temperature drop is expected overnight. No significant impact on crops is anticipated.',
    severity: 'Low',
    region: 'All',
    cropImpact: ['All'],
    timestamp: '4 hours ago',
    Icon: Thermometer,
  },
  {
    id: 'alert-002',
    title: 'Extreme Heat Warning',
    description: 'Temperatures are expected to exceed 38°C in inland areas. This can cause heat stress in cacao and durian crops.',
    severity: 'Medium',
    region: 'District 3',
    cropImpact: ['Cacao', 'Durian'],
    timestamp: '8 hours ago',
    Icon: Thermometer,
  },
  {
    id: 'alert-003',
    title: 'Heavy Rainfall Advisory',
    description: 'Continuous heavy rainfall is predicted across the entire Davao region, increasing the risk of fungal diseases and soil erosion.',
    severity: 'High',
    region: 'All',
    cropImpact: ['Cacao', 'Corn', 'Rice'],
    timestamp: '1 day ago',
    Icon: CloudDrizzle,
  },
];
