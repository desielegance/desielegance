import dbConnect from '@/lib/db';
import Product from '@/models/product';
import { MOCK_PRODUCTS } from '@/lib/data';

export class ProductService {
    /**
     * Fetches all products from the database.
     * If the database is empty, it seeds it with MOCK_PRODUCTS.
     */
    async getAllProducts() {
        try {
            await dbConnect();

            // Check if we need to seed
            const count = await Product.countDocuments();
            if (count === 0) {
                await this.seedInitialData();
            }


            const products = await Product.find({}).sort({ createdAt: -1 }).lean();
            return products.map(this.mapDocToProduct);
        } catch (error) {
            return MOCK_PRODUCTS;
        }
    }

    /**
     * Fetches a single product by its ID.
     */
    async getProductById(id: string) {
        try {
            await dbConnect();
            // Validate if ID is a valid MongoDB ObjectId to prevent crashes
            // if (mongoose.isValidObjectId(id)) ... (Skipping strict check for flexibility right now)

            // We try finding by _id first, if that fails/throws, we might want to handle it 
            // strictly or just return null.
            const product = await Product.findById(id).lean();
            if (!product) {
                // Try looking in fallback if NOT found in DB? 
                // Or just return null. 
                // Let's stick to DB first. If DB is up but product missing, return null.
                return null;
            }
            return this.mapDocToProduct(product);
        } catch (error) {
            const mock = MOCK_PRODUCTS.find(p => p.id === id);
            return mock || null;
        }
    }

    /**
     * Seeds the database with initial mock data
     */
    async seedInitialData() {
        await dbConnect();

        const seedOperations = MOCK_PRODUCTS.map((prod) => {
            return {
                name: prod.name,
                price: prod.price,
                description: prod.description,
                images: prod.images,
                slug: prod.name.toLowerCase().replace(/ /g, '-'),
                stock: 0, // Default stock
                category: 'Clothing'
            };
        });

        await Product.insertMany(seedOperations);
    }

    async createProduct(data: any) {
        await dbConnect();
        const newProduct = new Product(data);
        const savedProduct = await newProduct.save();
        return this.mapDocToProduct(savedProduct.toObject());
    }

    async updateProduct(id: string, data: any) {
        await dbConnect();
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true }).lean();
        return updatedProduct ? this.mapDocToProduct(updatedProduct) : null;
    }

    async deleteProduct(id: string) {
        await dbConnect();
        const deletedProduct = await Product.findByIdAndDelete(id).lean();
        return deletedProduct ? this.mapDocToProduct(deletedProduct) : null;
    }

    /**
     * Helper to transform Mongoose document (or lean object) 
     * to a plain object with string ID, suitable for frontend.
     */
    private mapDocToProduct(doc: any) {
        return {
            ...doc,
            _id: doc._id.toString(),
            id: doc._id.toString(), // ensuring compatibility with existing frontend code expecting 'id'
            createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
            updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
        };
    }
}

export const productService = new ProductService();
