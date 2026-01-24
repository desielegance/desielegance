export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    category?: string;
    stock?: number;
    slug?: string;
    details?: Record<string, string>;
    createdAt?: string;
    updatedAt?: string;
}
