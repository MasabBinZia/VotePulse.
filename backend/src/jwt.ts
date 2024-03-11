import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Checking Authorized or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Unauthorized" });

  // Extract JWT token from the req headers
  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  // Ensure JWT_SECRET is defined
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, jwtSecret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = (userData: object): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "30000",
  });
};

export { jwtAuthMiddleware, generateToken };
