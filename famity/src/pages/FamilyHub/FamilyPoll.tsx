// src/pages/FamilyHub/FamilyPoll.tsx
import React, { useState, useEffect } from "react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface FamilyPollData {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  userVoted: boolean;
}

// --- Initial Poll (Mock Data) ---
const initialPoll: FamilyPollData = {
  id: "poll1",
  question: "What should be the theme for our next family gathering?",
  options: [
    { id: "opt1", text: "Summer Luau", votes: 15 },
    { id: "opt2", text: "Decades Party (80s/90s)", votes: 10 },
    { id: "opt3", text: "Board Game Bonanza", votes: 8 },
    { id: "opt4", text: "Outdoor Adventure Day", votes: 12 },
  ],
  totalVotes: 45,
  isActive: true,
  userVoted: false,
};

// --- Fetch Poll (LocalStorage Mock) ---
const fetchPoll = async (): Promise<FamilyPollData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedPoll = localStorage.getItem("family_poll_data");
      const storedUserVote = localStorage.getItem("family_poll_voted");
      if (storedPoll) {
        const parsedPoll: FamilyPollData = JSON.parse(storedPoll);
        parsedPoll.userVoted = storedUserVote === parsedPoll.id;
        resolve(parsedPoll);
      } else {
        resolve(initialPoll);
      }
    }, 500);
  });
};

// --- Submit Vote (LocalStorage Mock) ---
const submitVote = async (
  pollId: string,
  optionId: string
): Promise<FamilyPollData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedPoll = localStorage.getItem("family_poll_data");
      const currentPoll: FamilyPollData = storedPoll
        ? JSON.parse(storedPoll)
        : initialPoll;

      if (!currentPoll.isActive || currentPoll.userVoted) {
        reject(new Error("Poll is not active or you have already voted."));
        return;
      }

      const updatedOptions = currentPoll.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );

      const updatedPoll: FamilyPollData = {
        ...currentPoll,
        options: updatedOptions,
        totalVotes: currentPoll.totalVotes + 1,
        userVoted: true,
      };

      localStorage.setItem("family_poll_data", JSON.stringify(updatedPoll));
      localStorage.setItem("family_poll_voted", updatedPoll.id);

      resolve(updatedPoll);
    }, 500);
  });
};

const FamilyPoll: React.FC = () => {
  const [poll, setPoll] = useState<FamilyPollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        setLoading(true);
        const data = await fetchPoll();
        setPoll(data);
      } catch {
        setError("Failed to load poll.");
      } finally {
        setLoading(false);
      }
    };
    loadPoll();
  }, []);

  const handleVote = async (optionId: string) => {
    if (!poll || poll.userVoted || !poll.isActive) return;

    try {
      setLoading(true);
      const updatedPoll = await submitVote(poll.id, optionId);
      setPoll(updatedPoll);
    } catch {
      setError("Failed to submit vote.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading poll...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (!poll) return <div className="text-center text-gray-500 italic">No active poll at the moment.</div>;

  const showResults = poll.userVoted || !poll.isActive;

  return (
    <div>
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-gray-900">
        {poll.question}
      </h3>
      <div className="space-y-2 md:space-y-3">
        {poll.options.map((option) => (
          <div key={option.id} className="relative flex items-center">
            {!showResults ? (
              <label className="flex items-center w-full cursor-pointer p-2 rounded-md hover:bg-blue-50 transition-colors duration-200">
                <input
                  type="radio"
                  name="poll-option"
                  value={option.id}
                  onChange={() => handleVote(option.id)}
                  className="mr-2 md:mr-3 text-blue-600 focus:ring-blue-500"
                  disabled={poll.userVoted || !poll.isActive || loading}
                />
                <span className="text-gray-700 font-medium text-sm md:text-base">
                  {option.text}
                </span>
              </label>
            ) : (
              <div className="relative w-full bg-gray-200 rounded-full h-6 md:h-8 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full flex items-center px-3 text-white font-bold text-xs md:text-sm transition-all duration-500 ease-out"
                  style={{
                    width: `${
                      poll.totalVotes > 0
                        ? (option.votes / poll.totalVotes) * 100
                        : 0
                    }%`,
                  }}
                >
                  {option.text}
                </div>
                <span className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-gray-800 font-bold text-xs md:text-sm">
                  {option.votes} (
                  {poll.totalVotes > 0
                    ? ((option.votes / poll.totalVotes) * 100).toFixed(0)
                    : 0}
                  %)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {showResults && (
        <p className="mt-3 md:mt-4 text-xs md:text-sm text-center text-gray-600 italic">
          Total Votes: {poll.totalVotes}.{" "}
          {poll.userVoted ? "You've already voted." : "Voting closed."}
        </p>
      )}
      {!poll.isActive && (
        <p className="mt-3 md:mt-4 text-center text-red-600 font-semibold text-sm md:text-base">
          This poll is no longer active.
        </p>
      )}
    </div>
  );
};

export default FamilyPoll;
