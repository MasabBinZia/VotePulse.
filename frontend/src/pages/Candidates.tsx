import { useState, useEffect } from "react";

type Candidate = {
  name: string;
  party: string;
};

export default function CandidatesPage() {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);

  const getData = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/candidate`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      console.log("Fetched data:", result);
      setCandidateData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
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
    </main>
  );
}
