import mongoose from 'mongoose';

type ConnectObject = {
    isConnected?: number;
}

const connection: ConnectObject = {}

export default async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to MongoDB')
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '')
        connection.isConnected = db.connections[0].readyState
        console.log('Connected to MongoDB')
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message)

        if (error.name === 'MongooseServerSelectionError' && error.message.includes('ECONNREFUSED')) {
            const url = process.env.MONGODB_URL || '';
            if (url.includes('localhost') || url.includes('127.0.0.1')) {
                console.error('\x1b[33m%s\x1b[0m', 'Create a hint: It looks like you are trying to connect to a local MongoDB instance but it is not reachable.');
                console.error('\x1b[33m%s\x1b[0m', 'Please make sure your local MongoDB server is running (e.g., mongod.exe).');
                console.error('\x1b[33m%s\x1b[0m', 'If you intended to use a remote database, check your .env file.');
            }
        }

        // process.exit(1) // Removed to allow fallback
        throw error;
    }
}