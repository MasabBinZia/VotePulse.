import mongoose, { Document } from "mongoose";

export interface IVote {
  user: mongoose.Schema.Types.ObjectId;
  votedAt: Date;
}

export interface ICandidate extends Document {
  name: string;
  party: string;
  politicalSymbolUrl: string;
  politicalFlagUrl: string;
  age: number;
  votes: IVote[];
  voteCount: number;
}

export interface IUser extends Document {
  name: string;
  age: Number;
  email?: string;
  mobile: string;
  address: string;
  password: string;
  cnicNumber: Number;
  role: "voter" | "admin";
  isVoted: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
