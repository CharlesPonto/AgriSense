export type ForecastData = {
  id: string;
  barangay: string;
  region: string;
  cropType: 'Cacao' | 'Banana' | 'Durian' | 'Corn';
  predictedYield: number;
  expectedLosses: number;
  riskLevel: 'Low' | 'Medium' | 'High';
};

export const forecastData: ForecastData[] = [
  {
    id: 'fc-001',
    barangay: 'Catalunan Grande',
    region: 'District 1',
    cropType: 'Durian',
    predictedYield: 150,
    expectedLosses: 10,
    riskLevel: 'Low',
  },
  {
    id: 'fc-002',
    barangay: 'Buhangin',
    region: 'District 1',
    cropType: 'Banana',
    predictedYield: 500,
    expectedLosses: 75,
    riskLevel: 'Medium',
  },
  {
    id: 'fc-003',
    barangay: 'Mintal',
    region: 'District 1',
    cropType: 'Cacao',
    predictedYield: 80,
    expectedLosses: 25,
    riskLevel: 'High',
  },
  {
    id: 'fc-004',
    barangay: 'Sasa',
    region: 'District 2',
    cropType: 'Corn',
    predictedYield: 200,
    expectedLosses: 15,
    riskLevel: 'Low',
  },
  {
    id: 'fc-005',
    barangay: 'Panacan',
    region: 'District 2',
    cropType: 'Banana',
    predictedYield: 650,
    expectedLosses: 50,
    riskLevel: 'Low',
  },
  {
    id: 'fc-006',
    barangay: 'Tibungco',
    region: 'District 2',
    cropType: 'Cacao',
    predictedYield: 60,
    expectedLosses: 5,
    riskLevel: 'Low',
  },
  {
    id: 'fc-007',
    barangay: 'Toril',
    region: 'District 3',
    cropType: 'Durian',
    predictedYield: 250,
    expectedLosses: 40,
    riskLevel: 'Medium',
  },
  {
    id: 'fc-008',
    barangay: 'Calinan',
    region: 'District 3',
    cropType: 'Cacao',
    predictedYield: 120,
    expectedLosses: 30,
    riskLevel: 'Medium',
  },
  {
    id: 'fc-009',
    barangay: 'Marilog',
    region: 'District 3',
    cropType: 'Corn',
    predictedYield: 180,
    expectedLosses: 50,
    riskLevel: 'High',
  },
   {
    id: 'fc-010',
    barangay: 'Baguio',
    region: 'District 3',
    cropType: 'Banana',
    predictedYield: 300,
    expectedLosses: 80,
    riskLevel: 'High',
  },
];
