import { NextResponse } from 'next/server';
import { couponService } from '@/services/couponService';

export async function POST(request: Request) {
    try {
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json(
                { error: 'Coupon code is required' },
                { status: 400 }
            );
        }

        const coupon = await couponService.getCouponByCode(code);

        if (!coupon) {
            return NextResponse.json(
                { error: 'Invalid coupon code' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            valid: true,
            coupon: {
                name: coupon.name,
                discount: coupon.discount
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
