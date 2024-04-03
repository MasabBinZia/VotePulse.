import { useState, useEffect } from "react";

type Candidate = {
  name: string;
  party: string;
};

export default function CandidatesPage() {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);

  const getData = async () => {
    const URL = `http://localhost:3001/candidate`;
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
