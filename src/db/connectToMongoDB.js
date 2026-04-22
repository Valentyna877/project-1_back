import mongoose from "mongoose";
import { BabyState } from "../models/babyState.js";
import { MomState } from "../models/momState.js";
import { Emotion } from "../models/emotion.js";

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
      await BabyState.syncIndexes();
      await MomState.syncIndexes();
      await Emotion.syncIndexes();
    console.log("Indexes synced successfully");
    
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB', error.message);
    process.exit(1);
  }
};
