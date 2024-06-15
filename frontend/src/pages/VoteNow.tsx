import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Candidate = {
  _id: string;
  name: string;
  party: string;
};

const BASE_URL = "http://localhost:3001"; // Replace with your base URL

export default function VoteNow() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [voting, setVoting] = useState<string | null>(null);

  const navigate = useNavigate();

  let candidateID = "666da6617b7e712222e9cdfe";

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/candidate`);
        setCandidates(res.data);
      } catch (error) {
        setError("Error loading candidates.");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user-login");
    } else {
      fetchCandidates();
    }
  }, [navigate]);

  const handleVote = async (candidateId: string) => {
    try {
      setVoting(candidateId);
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/candidate/vote/666da6617b7e712222e9cdfe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Vote recorded successfully!");
    } catch (error) {
      console.error("Error voting for candidate:", error);
      alert("Failed to record vote.");
    } finally {
      setVoting(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-center">Vote for a Candidate</h1>
      <section className="w-[600px] py-12 flex justify-center items-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-center">
                Candidate Name
              </TableHead>
              <TableHead className="font-medium text-center">Party</TableHead>
              <TableHead className="font-medium text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{candidate.name}</TableCell>
                <TableCell className="text-center">{candidate.party}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => handleVote(candidateID)}
                    disabled={voting === candidateID}
                  >
                    {voting === candidateID ? "Voting..." : "Vote"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
