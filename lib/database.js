// lib/database.js
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected || mongoose.connections[0].readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'blog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};
