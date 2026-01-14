export interface Photo {
    id: number;
    url: string;
    title: string;
    category: string;
    location: string;
}

export const photos: Photo[] = [
    { id: 1, url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80', title: 'Mountain Landscape', category: 'Nature', location: 'Alps' },
    { id: 2, url: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&q=80', title: 'Urban Life', category: 'City', location: 'New York' },
    { id: 3, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80', title: 'Nature Detail', category: 'Nature', location: 'Yosemite' },
    { id: 4, url: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80', title: 'Abstract Art', category: 'Abstract', location: 'Studio' },
    { id: 5, url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80', title: 'Portrait', category: 'People', location: 'London' },
    { id: 6, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80', title: 'Water Reflection', category: 'Nature', location: 'Iceland' },
];
