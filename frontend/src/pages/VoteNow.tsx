import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Candidate } from "@/utils/types/types";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../envConstants";
import SkeletonLoader from "@/components/skeletonLoader";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const URL = `${BASE_URL}/candidate`;

export default function VoteNow() {
  const [voting, setVoting] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    data: candidates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => axios.get(URL).then((res) => res.data),
  });

  const handleVote = async (candidateId: string) => {
    try {
      setVoting(candidateId);

      const token = localStorage.getItem("token");
      console.log(token);

      await axios.post(
        `${BASE_URL}/candidate/vote/${candidateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        variant: "default",
        description: "Vote recorded successfully!",
      });
    } catch (error) {
      console.error("Error voting for candidate:", error);
      toast({
        variant: "destructive",
        description: "Already Voted OR Failed to record vote!",
      });
    } finally {
      setVoting(null);
    }
  };

  if (error) return <p> Error Fetching data</p>;

  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-center">Vote for a Candidate</h1>
      <section className="w-[600px] py-12 flex justify-center items-center">
        {isLoading ? (
          <SkeletonLoader count={8} className="h-12 w-[600px] bg-gray-300" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-center">
                  Candidate Name
                </TableHead>
                <TableHead className="font-medium text-center">Party</TableHead>
                <TableHead className="font-medium text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate: Candidate, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="text-center">
                    {candidate.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {candidate.party}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => handleVote(candidate._id)}
                      disabled={voting === candidate._id}
                    >
                      {voting === candidate._id ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Vote"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </main>
  );
}
