import { NextResponse } from 'next/server';
import { productService } from '@/services/productService';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15, params is a Promise
) {
    try {
        const { id } = await params;
        const product = await productService.getProductById(id);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error(`Error fetching product with id:`, error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
