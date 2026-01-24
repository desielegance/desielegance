
const mongoose = require('mongoose');

// Connection URL from your .env
const url = 'mongodb://localhost:27017/clientProjects';

async function updateProduct() {
    try {
        await mongoose.connect(url);
        console.log('Connected to DB');

        // The name we used:
        const productName = "The New Red";

        const newImages = [
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117512/2_zayvry.jpg",
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117514/3_efbmox.jpg",
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117513/Photo_from_Mubashir_Iqbal_mhdqxe.jpg",
            "https://res.cloudinary.com/domvlcast/image/upload/v1769117513/Photo_from_Mubashir_Iqbal_h68o4b.jpg"
        ];

        // Using updateOne to set the images array
        const result = await mongoose.connection.db.collection('products').updateOne(
            { name: productName },
            { $set: { images: newImages } }
        );

        console.log(`Matched ${result.matchedCount} and modified ${result.modifiedCount} documents.`);
        console.log('SUCCESS: Product images updated with correct URLs!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

updateProduct();
