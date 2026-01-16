export type Farmer = {
  id: string;
  name: string;
  barangay: string;
  farmSize: number; // in hectares
  crops: ('Cacao' | 'Banana' | 'Durian' | 'Corn' | 'Rice')[];
  lastActivity: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  contact: string;
};

export const farmerData: Farmer[] = [
  {
    id: 'farmer-001',
    name: 'Juan Dela Cruz',
    barangay: 'Catalunan Grande',
    farmSize: 5.5,
    crops: ['Durian', 'Cacao'],
    lastActivity: 'Harvested Durian',
    riskLevel: 'Low',
    contact: '0917-123-4567',
  },
  {
    id: 'farmer-002',
    name: 'Maria Santos',
    barangay: 'Buhangin',
    farmSize: 3,
    crops: ['Banana'],
    lastActivity: 'Reported Fusarium Wilt',
    riskLevel: 'High',
    contact: '0928-234-5678',
  },
  {
    id: 'farmer-003',
    name: 'Pedro Reyes',
    barangay: 'Mintal',
    farmSize: 7,
    crops: ['Cacao', 'Banana'],
    lastActivity: 'Applied Fungicide',
    riskLevel: 'Medium',
    contact: '0915-345-6789',
  },
  {
    id: 'farmer-004',
    name: 'Ana Garcia',
    barangay: 'Sasa',
    farmSize: 10,
    crops: ['Corn', 'Rice'],
    lastActivity: 'Planted new batch of Corn',
    riskLevel: 'Low',
    contact: '0945-456-7890',
  },
  {
    id: 'farmer-005',
    name: 'Jose Fernandez',
    barangay: 'Panacan',
    farmSize: 4,
    crops: ['Banana'],
    lastActivity: 'Checked for pest infestation',
    riskLevel: 'Low',
    contact: '0916-567-8901',
  },
  {
    id: 'farmer-006',
    name: 'Luzviminda Torres',
    barangay: 'Tibungco',
    farmSize: 6.5,
    crops: ['Cacao'],
    lastActivity: 'Pruning activities',
    riskLevel: 'Low',
    contact: '0939-678-9012',
  },
  {
    id: 'farmer-007',
    name: 'Ricardo Gonzales',
    barangay: 'Toril',
    farmSize: 8,
    crops: ['Durian'],
    lastActivity: 'Reported Patch Canker',
    riskLevel: 'High',
    contact: '0918-789-0123',
  },
  {
    id: 'farmer-008',
    name: 'Elena Bautista',
    barangay: 'Calinan',
    farmSize: 12,
    crops: ['Cacao', 'Durian'],
    lastActivity: 'Fertilizer application',
    riskLevel: 'Medium',
    contact: '0927-890-1234',
  },
];
