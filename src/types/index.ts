export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    caption: string;
    category: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Coupon {
    id: string;
    name: string;
    discount: number;
    createdAt?: string;
    updatedAt?: string;
}
