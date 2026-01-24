
const mongoose = require('mongoose');

// Connection URL from your .env
const url = 'mongodb://localhost:27017/clientProjects';

async function addProduct() {
    try {
        await mongoose.connect(url);
        console.log('Connected to DB');

        const product = {
            name: "The New Red",
            description: "Ignite your presence with the fire of creation and destruction. 100% cotton.",
            price: 1500,
            images: [
                "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop"
            ],
            category: "Clothing",
            slug: "the-new-red-" + Date.now(), // Unique slug
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Access the collection directly to bypass any schema validation issues for now
        await mongoose.connection.db.collection('products').insertOne(product);

        console.log('SUCCESS: "The New Red" has been inserted into the database!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

addProduct();
