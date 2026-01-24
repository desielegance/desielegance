import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    // images can be an array of strings (URLs)
    images: string[];
    category?: string;
    // Use a map for dynamic details like { "Material": "Cotton", "Care": "Hand wash" }
    details?: Map<string, string>;
    stock: number;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        slug: {
            type: String,
            unique: true,
            index: true,
            // We will auto-generate this in the service if not provided, 
            // or you can use a pre-save hook. For now, we'll keep it simple.
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: [0, 'Price cannot be negative'],
        },
        images: {
            type: [String],
            required: [true, 'Please provide at least one image'],
        },
        category: {
            type: String,
            required: false,
            default: 'General',
        },
        stock: {
            type: Number,
            default: 0,
        },
        // Flexible key-value pairs for wash care, fabric, etc.
        details: {
            type: Map,
            of: String,
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

// Check if the model is already compiled (to prevent overwrite errors during hot-reload)
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
