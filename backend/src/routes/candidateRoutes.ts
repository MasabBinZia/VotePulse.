import express, { Response } from "express";
import { User } from "../models/user";
import { jwtAuthMiddleware } from "../jwt";
import { Candidate } from "../models/candidate";

const app = express();
const router = express.Router();

app.use(express.json());

const checkAdminRole = async (userId: Number): Promise<boolean> => {
  try {
    const user = await User.findById(userId);
    return user?.role === "admin";
  } catch (err) {
    console.error(err);
    return false;
  }
};

// SignUp
router.post("/", jwtAuthMiddleware, async (req: any, res: Response) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "User has no Admin Role" });

    const data = req.body;
    const newCandidate = new Candidate(data);
    const savedUser = await newCandidate.save();
    console.log("data saved");
    res.status(200).json({ response: savedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put(
  "/:candidateID",
  jwtAuthMiddleware,
  async (req: any, res: Response) => {
    try {
      if (!(await checkAdminRole(req.user.id)))
        return res.status(403).json({ message: "User has no Admin Role" });

      const candidateId = req.params.candidateID;
      const updatedCandidateData = req.body;
      const savedCandidateData = await Candidate.findByIdAndUpdate(
        candidateId,
        updatedCandidateData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!savedCandidateData) {
        return res.status(404).json({ error: "Candidate not Found" });
      }
      res.status(200).json(savedCandidateData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
);

router.delete(
  "/:candidateID",
  jwtAuthMiddleware,
  async (req: any, res: Response) => {
    try {
      if (!(await checkAdminRole(req.user.id)))
        return res.status(403).json({ message: "User has no Admin Role" });

      const candidateId = req.params.candidateID;
      const savedCandidateData = await Candidate.findByIdAndDelete(candidateId);
      if (!savedCandidateData) {
        return res.status(404).json({ error: "Candidate not Found" });
      }
      console.log("Candidate Deleted");

      res.status(200).json(savedCandidateData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
);

router.post(
  "/vote/:candidateID",
  jwtAuthMiddleware,
  async (req: any, res: Response) => {
    try {
      const candidateId = req.params.candidateID;
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not Found" });
      }

      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not Found" });
      }
      if (user.isVoted) {
        res.status(400).json({ message: "You have already voted" });
      }

      if (user.role == "admin") {
        res.status(403).json({ message: "Admin is not allowed to voted" });
      }

      candidate.votes.push({ user: userId, votedAt: new Date() });
      candidate.voteCount++;
      await candidate.save();

      user.isVoted = true;
      await user.save();

      res.status(200).json({ message: "Vote Recorded Succesfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/vote/count", async (req: any, res: Response) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecord = candidate.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });

    return res.status(200).json(voteRecord);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req: any, res: Response) => {
  try {
    const candidates = await Candidate.find({}, "name party -_id");
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as candidateRoutes };
