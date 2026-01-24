
const mongoose = require('mongoose');

// Connection URL from your .env
const url = 'mongodb://localhost:27017/clientProjects';

async function updateDigitalPrintFusion() {
    try {
        await mongoose.connect(url);
        console.log('Connected to DB');

        // The new URL you updated in data.ts
        const newImage = "https://images.unsplash.com/photo-1669199583373-b9636f3f14c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

        // Create an array of 4 (since your mock data had 4)
        const newImages = [newImage, newImage, newImage, newImage];

        const result = await mongoose.connection.db.collection('products').updateOne(
            { name: "Digital Print Fusion" },
            { $set: { images: newImages } }
        );

        console.log(`Matched ${result.matchedCount} and modified ${result.modifiedCount} documents.`);
        console.log('SUCCESS: Updated "Digital Print Fusion" images!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

updateDigitalPrintFusion();
