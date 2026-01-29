import { NextResponse } from 'next/server';
import { couponService } from '@/services/couponService';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const coupons = await couponService.getAllCoupons();
        return NextResponse.json(coupons);
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
        const newCoupon = await couponService.createCoupon(body);
        return NextResponse.json(newCoupon, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
