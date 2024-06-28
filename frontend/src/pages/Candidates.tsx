import { BASE_URL } from "../../envConstants";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonLoader from "@/components/skeletonLoader";
import axios from "axios";
import { Candidate } from "@/utils/types/types";

const URL = `${BASE_URL}/candidate`;

export default function CandidatesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => axios.get(URL).then((res) => res.data),
  });

  if (error) return <p className="flex font-bold py-20 justify-center items-center text-4xl text-primary">Error loading candidates.</p>;

  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-center">
        List Of <span className="text-primary">Candidates</span> Available to Vote
      </h1>
      <section className="w-[400px] py-12 flex justify-center items-center">
        {isLoading ? (
          <SkeletonLoader count={8} className="h-8 w-[400px] bg-gray-300" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-center">No.</TableHead>
                <TableHead className="font-medium text-center">
                  Candidate Name
                </TableHead>
                <TableHead className="font-medium text-center">
                  Candidate Party
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((candidate: Candidate, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell className="text-center">
                    {candidate.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {candidate.party}
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
