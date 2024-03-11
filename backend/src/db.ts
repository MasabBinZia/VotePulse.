import mongoose from "mongoose";
import { config } from "dotenv";
config();

const dbURL = process.env.MONGODB_URL;

if (!dbURL) {
  console.error("MONGODB_URL environment variable is not defined");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB Server");
  } catch (err) {
    console.error(`MongoDB Connection error: ${err}`);
    process.exit(1);
  }
};

connectDB();
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
