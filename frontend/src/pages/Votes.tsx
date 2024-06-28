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
import { VoteRecord } from "@/utils/types/types";
import { BASE_URL } from "../../envConstants";

const URL = `${BASE_URL}/candidate/vote/count`;

export default function Votes() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["votes"],
    queryFn: () => axios.get(URL).then((res) => res.data),
  });

  if (error) return <p className="flex font-bold py-20 justify-center items-center text-4xl text-primary">Error loading votes.</p>;

  const sortedData = [...data].sort(
    (a: VoteRecord, b: VoteRecord) => b.count - a.count
  );

  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-center">
        List Of <span className="text-primary">Parties</span> According to Their Votes.
      </h1>

      <section className="w-[400px] py-12 flex justify-center items-center">
        {isLoading ? (
          <SkeletonLoader count={8} className="h-8 w-[400px] bg-gray-300" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-center">No.</TableHead>
                <TableHead className="font-medium text-center">Party</TableHead>
                <TableHead className="font-medium text-center">
                  Vote Count
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((voteRecord: VoteRecord, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell className="text-center">
                    {voteRecord.party}
                  </TableCell>
                  <TableCell className="text-center">
                    {voteRecord.count}
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
