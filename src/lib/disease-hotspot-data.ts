export type HotspotData = {
  id: string;
  position: { top: string; left: string };
  size: 'sm' | 'md' | 'lg';
  crop: 'Cacao' | 'Banana' | 'Durian' | 'Corn';
  disease: 'Pod Rot' | 'Fusarium Wilt' | 'Patch Canker' | 'Rust';
  severity: 'Low' | 'Medium' | 'High';
  date: string; // YYYY-MM-DD
  area: string;
  farmsAffected: number;
};

export const diseaseHotspotData: HotspotData[] = [
  {
    id: 'hotspot-1',
    position: { top: '30%', left: '40%' },
    size: 'lg',
    crop: 'Cacao',
    disease: 'Pod Rot',
    severity: 'High',
    date: '2024-07-28',
    area: 'Panabo City',
    farmsAffected: 12,
  },
  {
    id: 'hotspot-2',
    position: { top: '50%', left: '60%' },
    size: 'md',
    crop: 'Banana',
    disease: 'Fusarium Wilt',
    severity: 'Medium',
    date: '2024-07-25',
    area: 'Santo Tomas',
    farmsAffected: 7,
  },
  {
    id: 'hotspot-3',
    position: { top: '65%', left: '35%' },
    size: 'sm',
    crop: 'Durian',
    disease: 'Patch Canker',
    severity: 'Low',
    date: '2024-07-22',
    area: 'Calinan District',
    farmsAffected: 3,
  },
  {
    id: 'hotspot-4',
    position: { top: '25%', left: '65%' },
    size: 'md',
    crop: 'Corn',
    disease: 'Rust',
    severity: 'Medium',
    date: '2024-07-15',
    area: 'Island Garden City of Samal',
    farmsAffected: 8,
  },
    {
    id: 'hotspot-5',
    position: { top: '75%', left: '55%' },
    size: 'sm',
    crop: 'Cacao',
    disease: 'Pod Rot',
    severity: 'Low',
    date: '2024-06-30',
    area: 'Baguio District',
    farmsAffected: 4,
  }
];
