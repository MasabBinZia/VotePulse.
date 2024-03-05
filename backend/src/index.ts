import express from "express";
import bodyParser from "body-parser";
import { userRoutes } from "./routes/userRoutes";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Ensure this is consistent with your logging

app.use(bodyParser.json());

// Define your routes
app.use("/users", userRoutes);

// Connect to the database before starting the server
connectDB().then(() => {
  console.log("Connected to MongoDB Server");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection failed", err);
  process.exit(1); // Optionally exit if database connection cannot be established
});
