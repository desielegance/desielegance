import { NextResponse } from 'next/server';
import { productService } from '@/services/productService';

export const dynamic = 'force-dynamic'; // Ensure this route is not statically cached effectively for dev

export async function GET() {
    try {
        const products = await productService.getAllProducts();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newProduct = await productService.createProduct(body);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
