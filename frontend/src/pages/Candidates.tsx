import { useState, useEffect } from "react";
import { BASE_URL } from "../../envConstants";

type Candidate = {
  name: string;
  party: string;
};

export default function CandidatesPage() {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const URL = `${BASE_URL}/candidate`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      // console.log("Fetched data:", result);
      setCandidateData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {candidateData.length > 0 ? (
            <div>
              {candidateData.map((candidate, index) => (
                <div key={index}>
                  {candidate.name} - {candidate.party}
                </div>
              ))}
            </div>
          ) : (
            <p>No candidates found.</p>
          )}
        </>
      )}
    </main>
  );
}
