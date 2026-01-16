import { LucideIcon, Wind, Thermometer, CloudDrizzle, Zap, BrainCircuit } from 'lucide-react';

export type WeatherAlert = {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  region: 'District 1' | 'District 2' | 'District 3' | 'All';
  cropImpact: ('Cacao' | 'Banana' | 'Durian' | 'Corn' | 'Rice' | 'All')[];
  timestamp: string;
  Icon: LucideIcon;
  recommendations: string;
  source: 'AI' | 'Manual';
};

export const weatherAlertsData: WeatherAlert[] = [
    {
        id: 'alert-ai-001',
        title: 'AI Prediction: High Risk of Fungal Outbreak',
        description:
        'Our AI model predicts a 92% probability of a significant fungal outbreak (Phytophthora) in Cacao crops in District 3 within the next 72 hours due to sustained high humidity and forecasted rainfall.',
        severity: 'High',
        region: 'District 3',
        cropImpact: ['Cacao'],
        timestamp: 'Just now',
        Icon: BrainCircuit,
        source: 'AI',
        recommendations:
        '1. Proactive Fungicide Application: Immediately apply a systemic fungicide (e.g., metalaxyl-based) to all Cacao fields in the high-risk zone.\n2. Increase Pruning & Sanitation: Remove any low-hanging branches and prune dense canopies to improve air circulation and reduce leaf wetness duration.\n3. Monitor Fields Closely: Increase scouting frequency to twice daily to spot and isolate any initial signs of infection.',
    },
    {
        id: 'alert-004',
        title: 'Lightning Storm Alert',
        description: 'A severe thunderstorm with frequent lightning is approaching District 1. This poses a risk to farm workers and equipment.',
        severity: 'Critical',
        region: 'District 1',
        cropImpact: ['All'],
        timestamp: '30 minutes ago',
        Icon: Zap,
        source: 'Manual',
        recommendations: '1. Cease all field operations immediately.\n2. Ensure all personnel take shelter in sturdy buildings away from tall trees or metal structures.\n3. Unplug sensitive electronic equipment to protect from power surges.',
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
        source: 'Manual',
        recommendations: '1. Reinforce support structures for banana plants.\n2. Harvest any mature fruit that could be damaged by high winds.\n3. Secure any loose equipment or materials on the farm.',
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
        source: 'Manual',
        recommendations: 'No immediate action is required. Continue standard monitoring of crops.',
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
        source: 'Manual',
        recommendations: '1. Ensure adequate irrigation is provided to prevent dehydration. Consider an extra watering cycle.\n2. Apply a protective layer of mulch to retain soil moisture and keep roots cool.\n3. Avoid applying fertilizers during peak heat to prevent leaf burn.',
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
        source: 'Manual',
        recommendations: '1. Check and clear drainage canals to prevent waterlogging.\n2. For Cacao, consider a preventative fungicide application once the rain subsides.\n3. Monitor for soil erosion in sloped areas and reinforce them if necessary.',
    },
];
