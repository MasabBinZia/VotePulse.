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

const URL = `${BASE_URL}/candidate/vote/count`;

type VoteRecord = {
  party: string;
  count: number;
};

export default function Votes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["votes"],
    queryFn: () => fetch(URL).then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading votes.</p>;

  // Sort data in ascending order according to the vote count
  const sortedData = [...data].sort((a: VoteRecord, b: VoteRecord) => a.count - b.count);

  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-center">
        List Of Parties According to Their Votes
      </h1>

      <section className="w-[400px] py-12 flex justify-center items-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-center">No.</TableHead>
              <TableHead className="font-medium text-center">
                Party
              </TableHead>
              <TableHead className="font-medium text-center">
                Vote Count
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((voteRecord: VoteRecord, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx + 1}</TableCell>
                <TableCell className="text-center">{voteRecord.party}</TableCell>
                <TableCell className="text-center">{voteRecord.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
