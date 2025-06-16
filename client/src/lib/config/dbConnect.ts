import mongoose from 'mongoose';


const dbConnect = async () => {
  if (mongoose.connection?.readyState === 1) {
    console.log("✅ MongoDB is already connected.");
    return;
  }
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000, 
    });
    console.log('✅ MongoDB connected:', connection.connection.host);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error; 
  }
};

export default dbConnect;
