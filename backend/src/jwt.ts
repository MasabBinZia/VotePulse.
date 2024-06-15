import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    userName?: string; // Add other JWT payload properties as needed
  };
}

const jwtAuthMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = (userData: object): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(userData, jwtSecret, { expiresIn: "1h" });
};

export { jwtAuthMiddleware, generateToken };
