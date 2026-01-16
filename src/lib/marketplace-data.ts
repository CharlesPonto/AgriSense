export type Supplier = {
  id: string;
  name: string;
  category: 'Fertilizers' | 'Pesticides' | 'Tools & Equipment';
  description: string;
  rating: number;
  imageHint: string;
  imageUrl: string;
};

export const marketplaceData: Supplier[] = [
    {
        id: 'sup-001',
        name: 'Davao Agri-Supply Co.',
        category: 'Fertilizers',
        description: 'Leading provider of organic and chemical fertilizers tailored for local crops.',
        rating: 4.8,
        imageHint: 'agriculture store',
        imageUrl: 'https://picsum.photos/seed/agri-supply/600/400'
    },
    {
        id: 'sup-002',
        name: 'Mindanao Pest Solutions',
        category: 'Pesticides',
        description: 'Specializing in eco-friendly and effective pesticides for common local pests.',
        rating: 4.5,
        imageHint: 'lab worker',
        imageUrl: 'https://picsum.photos/seed/pest-solutions/600/400'
    },
    {
        id: 'sup-003',
        name: 'FarmHand Tools & Equipment',
        category: 'Tools & Equipment',
        description: 'High-quality and durable farming tools, from pruning shears to irrigation systems.',
        rating: 4.7,
        imageHint: 'farming tools',
        imageUrl: 'https://picsum.photos/seed/farm-tools/600/400'
    }
];
