import express, { Request, Response } from "express";
import { User, IUser } from "../models/user";
import { generateToken, jwtAuthMiddleware } from "../jwt";

const app = express();
const router = express.Router();

app.use(express.json());

interface AuthenticatedRequest extends express.Request {
  user?: {
    id: string; // Add other JWT payload properties as needed
  };
}

// SignUp
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const savedUser = await newUser.save();

    const payload = {
      id: savedUser.id,
      userName: savedUser.name,
    };

    const token = generateToken(payload);
    res.status(200).json({ user: savedUser, token: token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { cnicNumber, password } = req.body;
    const user = await User.findOne({ cnicNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid cnicNumber or password" });
    }
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile
router.get("/profile", jwtAuthMiddleware, async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ForgetPassword
router.put(
  "/profile/password",
  jwtAuthMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID missing from request." });
    }
    const { currentPassword, newPassword } = req.body;

    try {
      const user = await User.findById(userId).exec();
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      const isMatch = await (user as IUser).comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password." });
      }
      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
);

export { router as userRoutes };
