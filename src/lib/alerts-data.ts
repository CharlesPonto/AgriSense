export type AlertData = {
  id: string;
  icon: 'AlertTriangle' | 'Droplets' | 'Bell';
  title: string;
  description: string;
  time: string;
  variant: 'destructive' | 'default';
  details: string;
  recommendations: string;
};

export const alerts: AlertData[] = [
  {
    id: 'fungal-infection-cacao',
    icon: 'AlertTriangle',
    title: 'High Risk: Fungal Infection Detected',
    description: 'Our AI has detected early signs of fungal infection in your Cacao field (Sector 3B). Immediate action is recommended to prevent spread.',
    time: '15m ago',
    variant: 'destructive',
    details: 'Visual analysis of leaf scans from Sector 3B shows patterns consistent with early-stage Phytophthora Pod Rot. The current high humidity and recent rainfall increase the risk of rapid spread.',
    recommendations: '1. Immediately apply a copper-based fungicide to all Cacao trees in Sector 3B.\n2. Prune and destroy all infected pods and leaves to prevent further contamination.\n3. Increase airflow through the plantation by pruning lower branches.\n4. Re-check crop scans in 3 days to monitor treatment effectiveness.'
  },
  {
    id: 'irrigation-alert-sector-b',
    icon: 'Droplets',
    title: 'Irrigation System Alert',
    description: 'Sensor in Sector B reports low water pressure. Check for leaks or malfunctions.',
    time: '2h ago',
    variant: 'default',
    details: 'The water pressure sensor for the irrigation system in Sector B has dropped by 30% over the last hour. This could indicate a significant leak in the main line or a pump malfunction. Reduced water supply during the current dry spell could stress the crops, affecting growth and yield.',
    recommendations: '1. Immediately dispatch a technician to inspect the irrigation lines and pump in Sector B.\n2. Manually check soil moisture levels in the affected area.\n3. Prepare for manual irrigation if the system cannot be repaired within the next 4 hours.'
  },
  {
    id: 'yield-forecast-durian-q3',
    icon: 'Bell',
    title: 'New Yield Forecast Available',
    description: 'The Q3 forecast for your Durian crop has been updated based on recent weather patterns.',
    time: '1d ago',
    variant: 'default',
    details: 'The Q3 yield forecast for your Durian crop has been revised. Based on favorable weather conditions and above-average fruit set data, we now project a 7% increase over initial estimates. The model has factored in the low incidence of pest activity and optimal soil moisture levels.',
    recommendations: '1. Review the updated forecast on the Yield Forecast page.\n2. Adjust labor and logistics planning for the increased harvest volume.\n3. Explore pre-selling options with market partners to capitalize on the higher yield.'
  },
];
