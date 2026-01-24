const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Adjust path as needed. determining __dirname for scripts/
const dataPath = path.join(__dirname, '../src/lib/data.ts');

try {
    const fileContent = fs.readFileSync(dataPath, 'utf8');

    // Extract the array content
    // We look for 'export const MOCK_PRODUCTS: Product[] = [' and capture until the closing '];'
    // Note: The regex needs to balance brackets if possible, but greedy match until listing ends might suffice if unique.
    // src/lib/data.ts ends with '];' then newline. 

    const startIndex = fileContent.indexOf('export const MOCK_PRODUCTS: Product[] = [');
    if (startIndex === -1) {
        throw new Error("Start of MOCK_PRODUCTS not found");
    }

    // Find the opening bracket
    const arrayStart = fileContent.indexOf('[', startIndex);

    // Simple bracket counting to find the end
    let openCount = 0;
    let arrayEnd = -1;
    for (let i = arrayStart; i < fileContent.length; i++) {
        if (fileContent[i] === '[') openCount++;
        else if (fileContent[i] === ']') openCount--;

        if (openCount === 0) {
            arrayEnd = i + 1;
            break;
        }
    }

    if (arrayEnd === -1) {
        throw new Error("Could not find end of MOCK_PRODUCTS array");
    }

    const arrayString = fileContent.substring(arrayStart, arrayEnd);

    // Evaluate to get the object
    // Note: This relies on the file content being valid JS syntax (which it is, mostly, aside from type annotations which are outside the array)
    const mockProducts = eval(arrayString);

    const url = 'mongodb://localhost:27017/clientProjects';

    (async () => {
        try {
            await mongoose.connect(url);
            console.log('Connected to MongoDB');

            const productsCollection = mongoose.connection.db.collection('products');

            // Clear existing products
            await productsCollection.deleteMany({});
            console.log('Cleared existing products');

            // Prepare new products
            const now = Date.now();
            const productsToInsert = mockProducts.map((p, index) => ({
                name: p.name,
                description: p.description,
                price: p.price,
                images: p.images,
                category: "Clothing",
                stock: 10,
                slug: p.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now() + '-' + index,
                // Set createdAt so that the first item (index 0) has the LATEST time
                // assuming the query is .sort({ createdAt: -1 })
                createdAt: new Date(now - index * 1000),
                updatedAt: new Date()
            }));

            if (productsToInsert.length > 0) {
                await productsCollection.insertMany(productsToInsert);
                console.log(`Seeded ${productsToInsert.length} products successfully.`);
            } else {
                console.log('No products to seed.');
            }

        } catch (error) {
            console.error('Error seeding database:', error);
        } finally {
            await mongoose.disconnect();
            console.log('Disconnected');
            process.exit(0);
        }
    })();

} catch (err) {
    console.error("Failed to parse data file:", err);
}
