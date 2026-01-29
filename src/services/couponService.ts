import dbConnect from '@/lib/db';
import Coupon, { ICoupon } from '@/models/coupon';
import { MOCK_COUPONS } from '@/lib/data';

export class CouponService {
    async getAllCoupons() {
        try {
            await dbConnect();
            const count = await Coupon.countDocuments();
            if (count === 0) {
                await this.seedInitialData();
            }
            const coupons = await Coupon.find({}).sort({ createdAt: -1 }).lean();
            return coupons.map(this.mapDocToCoupon);
        } catch (error) {
            return MOCK_COUPONS;
        }
    }

    async getCouponById(id: string) {
        try {
            await dbConnect();
            const coupon = await Coupon.findById(id).lean();
            return coupon ? this.mapDocToCoupon(coupon) : null;
        } catch (error) {
            const mock = MOCK_COUPONS.find(c => c.id === id);
            return mock || null;
        }
    }

    async getCouponByCode(code: string) {
        try {
            await dbConnect();
            // Case-insensitive search
            const coupon = await Coupon.findOne({ name: code.toUpperCase() }).lean();
            return coupon ? this.mapDocToCoupon(coupon) : null;
        } catch (error) {
            const mock = MOCK_COUPONS.find(c => c.name.toUpperCase() === code.toUpperCase());
            return mock || null;
        }
    }

    async seedInitialData() {
        await dbConnect();
        const seedOperations = MOCK_COUPONS.map((c) => ({
            name: c.name,
            discount: c.discount,
        }));
        await Coupon.insertMany(seedOperations);
    }

    async createCoupon(data: any) {
        await dbConnect();
        const newCoupon = new Coupon(data);
        const savedCoupon = await newCoupon.save();
        return this.mapDocToCoupon(savedCoupon.toObject());
    }

    async updateCoupon(id: string, data: any) {
        await dbConnect();
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, data, { new: true }).lean();
        return updatedCoupon ? this.mapDocToCoupon(updatedCoupon) : null;
    }

    async deleteCoupon(id: string) {
        await dbConnect();
        const deletedCoupon = await Coupon.findByIdAndDelete(id).lean();
        return deletedCoupon ? this.mapDocToCoupon(deletedCoupon) : null;
    }

    private mapDocToCoupon(doc: any) {
        return {
            ...doc,
            _id: doc._id.toString(),
            id: doc._id.toString(),
            createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
            updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
        };
    }
}

export const couponService = new CouponService();
