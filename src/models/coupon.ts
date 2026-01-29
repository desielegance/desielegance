import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoupon extends Document {
    name: string;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
}

const CouponSchema: Schema<ICoupon> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a coupon name'],
            unique: true,
            trim: true,
            uppercase: true,
        },
        discount: {
            type: Number,
            required: [true, 'Please provide a discount percentage'],
            min: [0, 'Discount cannot be less than 0'],
            max: [100, 'Discount cannot be more than 100'],
        },
    },
    {
        timestamps: true,
    }
);

const Coupon: Model<ICoupon> = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);

export default Coupon;
