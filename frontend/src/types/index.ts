export interface Photo {
    id: number;
    url: string;
    title: string;
    category: string;
    location: string;
}

export interface Video {
    id: number;
    title: string;
    url: string;
    thumbnail: string;
    duration: string;
    views: string;
    platform: string;
    category: string;
}

export interface Writing {
    id: number;
    title: string;
    content: string;
    category: string;
    published_date: string;
}
