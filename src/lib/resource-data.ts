export type Resource = {
  id: string;
  name: string;
  type: 'Pesticide' | 'Fertilizer' | 'Seeds' | 'Equipment';
  stock: number;
  status: 'Optimal' | 'Low' | 'Depleted';
};

export const resourceData: Resource[] = [
  {
    id: 'res-001',
    name: 'Fungicide-A',
    type: 'Pesticide',
    stock: 75,
    status: 'Optimal',
  },
  {
    id: 'res-002',
    name: 'Urea Fertilizer',
    type: 'Fertilizer',
    stock: 40,
    status: 'Low',
  },
  {
    id: 'res-003',
    name: 'Herbicide-B',
    type: 'Pesticide',
    stock: 90,
    status: 'Optimal',
  },
  {
    id: 'res-004',
    name: 'Potassium Nitrate',
    type: 'Fertilizer',
    stock: 15,
    status: 'Depleted',
  },
  {
    id: 'res-005',
    name: 'Insecticide-C',
    type: 'Pesticide',
    stock: 60,
    status: 'Optimal',
  },
];
