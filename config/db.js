import { MongoClient } from 'mongodb';

let client;
let db;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export const getDb = () => db;
export const getClient = () => client;
export default connectDB;
