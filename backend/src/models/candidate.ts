import mongoose, { Schema, Model } from "mongoose";
import { ICandidate, IVote } from "../utils/interfaces";

const voteSchema = new Schema<IVote>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votedAt: {
    type: Date,
    default: Date.now,
  },
});

const candidateSchema: Schema<ICandidate> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  politicalFlagUrl: {
    type: String,
    reqired: true,
  },
  politicalSymbolUrl: {
    type: String,
    reqired: true,
  },
  votes: [voteSchema],
  voteCount: {
    type: Number,
    default: 0,
  },
});

const Candidate: Model<ICandidate> = mongoose.model<ICandidate>(
  "Candidate",
  candidateSchema
);

export { Candidate };
