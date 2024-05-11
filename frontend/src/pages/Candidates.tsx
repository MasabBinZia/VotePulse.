import { useAuth } from "@/Providers/AuthProvider";
import { BASE_URL } from "../../envConstants";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const URL = `${BASE_URL}/candidate`;

type Candidate = {
  name: string;
  party: string;
};

export default function CandidatesPage() {
  const auth = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => fetch(URL).then((res) => res.json()),
  });

  // Check if the user is not logged in
  // if (!auth?.user) {
  //   return <p>You must be logged in to view this page.</p>;
  // }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading candidates.</p>;

  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-center">
        List Of Candidates Available to Vote
      </h1>
      {/* {data && data.length > 0 ? (
        <div>
          {data.map((candidate: Candidate, index: number) => (
            <div key={index}>
              {candidate.name} - {candidate.party}
            </div>
          ))}
        </div>
      ) : (
        <p>No candidates found.</p>
      )} */}

      <section className="w-[400px] py-12 flex justify-center items-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-center">No.</TableHead>
              <TableHead className="font-medium text-center">Candidate Name</TableHead>
              <TableHead className="font-medium text-center">Candidate Party</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((candidate: Candidate, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx + 1}</TableCell>
                <TableCell className="text-center">{candidate.name}</TableCell>
                <TableCell className="text-center">{candidate.party}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
