import express, { Request, Response } from "express";
import { User } from "../models/user";
import { jwtAuthMiddleware } from "../jwt";
import { Candidate } from "../models/candidate";

const router = express.Router();

router.use(express.json());

const checkAdminRole = async (userId: string): Promise<boolean> => {
  try {
    const user = await User.findById(userId);
    return user?.role === "admin";
  } catch (err) {
    console.error(err);
    return false;
  }
};

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

// SignUp
router.post("/signup", jwtAuthMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!(await checkAdminRole(req.user!.id))) {
      return res.status(403).json({ message: "User has no Admin Role" });
    }

    const data = req.body;
    const newCandidate = new Candidate(data);
    const savedCandidate = await newCandidate.save();
    console.log("Candidate saved");
    res.status(200).json({ response: savedCandidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Candidate
router.put("/:candidateID", jwtAuthMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!(await checkAdminRole(req.user!.id))) {
      return res.status(403).json({ message: "User has no Admin Role" });
    }

    const candidateId = req.params.candidateID;
    const updatedCandidateData = req.body;
    const savedCandidateData = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
      new: true,
      runValidators: true,
    });

    if (!savedCandidateData) {
      return res.status(404).json({ error: "Candidate not Found" });
    }
    res.status(200).json(savedCandidateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Candidate
router.delete("/:candidateID", jwtAuthMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!(await checkAdminRole(req.user!.id))) {
      return res.status(403).json({ message: "User has no Admin Role" });
    }

    const candidateId = req.params.candidateID;
    const deletedCandidateData = await Candidate.findByIdAndDelete(candidateId);
    if (!deletedCandidateData) {
      return res.status(404).json({ error: "Candidate not Found" });
    }
    console.log("Candidate Deleted");

    res.status(200).json(deletedCandidateData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Vote for Candidate
router.post("/vote/:candidateID", jwtAuthMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const candidateId = req.params.candidateID;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not Found" });
    }

    const userId = req.user!.id as any;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    if (user.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin is not allowed to vote" });
    }

    candidate.votes.push({ user: userId, votedAt: new Date() });
    candidate.voteCount++;
    await candidate.save();

    user.isVoted = true;
    await user.save();

    res.status(200).json({ message: "Vote Recorded Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Vote Count
router.get("/vote/count", async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecord = candidates.map((data) => ({
      party: data.party,
      count: data.voteCount,
    }));

    res.status(200).json(voteRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Candidates
router.get("/", async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find({}, "name party age voteCount _id");
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as candidateRoutes };
