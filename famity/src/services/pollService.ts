// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
}

export const pollService = {
  // Get current active poll
  getCurrentPoll: async (): Promise<Poll> => {
    const response = await fetch(`${API_BASE_URL}/polls/current`);
    if (!response.ok) {
      throw new Error('Failed to fetch current poll');
    }
    return response.json();
  },

  // Submit a vote
  submitVote: async (pollId: string, optionId: string): Promise<Poll> => {
    const response = await fetch(`${API_BASE_URL}/polls/${pollId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ optionId }),
      credentials: 'include', // For session/cookie based auth
    });

    if (!response.ok) {
      throw new Error('Failed to submit vote');
    }

    return response.json();
  },

  // Create a new poll (admin only)
  createPoll: async (pollData: {
    question: string;
    options: string[];
    durationHours?: number;
  }): Promise<Poll> => {
    const response = await fetch(`${API_BASE_URL}/polls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pollData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to create poll');
    }

    return response.json();
  },

  // Close a poll (admin only)
  closePoll: async (pollId: string): Promise<Poll> => {
    const response = await fetch(`${API_BASE_URL}/polls/${pollId}/close`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to close poll');
    }

    return response.json();
  },
};