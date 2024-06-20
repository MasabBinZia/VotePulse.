export type Candidate = {
  _id:string
  name: string;
  party: string;
  
};

export type UserProfile = {
  id: string;
  name: string;
  cnicNumber: string;
  email: string;
  age: number;
  mobile: string;
  address: string;
  role: string;
  isVoted: boolean;
};

export type VoteRecord = {
  party: string;
  count: number;
};

