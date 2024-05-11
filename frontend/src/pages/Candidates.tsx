import { useAuth } from "@/Providers/AuthProvider";
import { BASE_URL } from "../../envConstants";
import { useQuery } from "@tanstack/react-query";

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
    <main>
      {data && data.length > 0 ? (
        <div>
          {data.map((candidate: Candidate, index: number) => (
            <div key={index}>
              {candidate.name} - {candidate.party}
            </div>
          ))}
        </div>
      ) : (
        <p>No candidates found.</p>
      )}
    </main>
  );
}
