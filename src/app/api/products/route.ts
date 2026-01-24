import { NextResponse } from 'next/server';
import { productService } from '@/services/productService';

export const dynamic = 'force-dynamic'; // Ensure this route is not statically cached effectively for dev

export async function GET() {
    try {
        const products = await productService.getAllProducts();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
