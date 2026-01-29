import { NextResponse } from 'next/server';
import { couponService } from '@/services/couponService';

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    try {
        const coupon = await couponService.getCouponById(id);
        if (!coupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }
        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    try {
        const body = await request.json();
        const updatedCoupon = await couponService.updateCoupon(id, body);
        if (!updatedCoupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }
        return NextResponse.json(updatedCoupon);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    try {
        const deletedCoupon = await couponService.deleteCoupon(id);
        if (!deletedCoupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
