// import mongoose from "mongoose";
// import { BabyState } from "../models/babyState.js";
// import { MomState } from "../models/momState.js";
// import { Emotion } from "../models/emotion.js";

// export const connectMongoDB = async () => {
//   try {
//     const mongoUrl = process.env.MONGO_URL;
//     await mongoose.connect(mongoUrl);
//     console.log('✅ MongoDB connection established successfully');
//       await BabyState.syncIndexes();
//       await MomState.syncIndexes();
//       await Emotion.syncIndexes();
//     console.log("Indexes synced successfully");

//   } catch (error) {
//     console.error('❌ Failed to connect to MongoDB', error.message);
//     process.exit(1);
//   }
// };

import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";
import { ENV_VARS } from "../constants/envVars.js";

const clientOptions = {
  serverApi: { version: "1", strict: false, deprecationErrors: true },
};

export const connectToMongoDB = async () => {
  try {
    const user = getEnvVar(ENV_VARS.DB_USER);
    const password = getEnvVar(ENV_VARS.DB_PASSWORD);
    const host = getEnvVar(ENV_VARS.DB_HOST);
    const dbName = getEnvVar(ENV_VARS.DB_NAME);

    // const url = `mongodb+srv://${user}:${password}@${host}/${dbName}?appName=Cluster0`;
    const url = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(url, clientOptions);
    console.log("✅ MongoDB connection established successfully");

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("✅ Deployment pinged successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};
