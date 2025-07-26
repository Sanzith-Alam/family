import type { Member, Event, Announcement, Album } from '../types/types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Common fetch wrapper
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  return response.json();
}

// FamilyHub Services
export const familyService = {
  // Get all events
  getEvents: async (): Promise<Event[]> => {
    return fetchAPI('/events');
  },

  // Get all announcements
  getAnnouncements: async (): Promise<Announcement[]> => {
    return fetchAPI('/announcements');
  },

  // Get all photo albums
  getAlbums: async (): Promise<Album[]> => {
    return fetchAPI('/gallery/albums');
  },

  // Get all family members
  getMembers: async (): Promise<Member[]> => {
    return fetchAPI('/members');
  },

  // Get upcoming birthdays (next 30 days)
  getUpcomingBirthdays: async (): Promise<Member[]> => {
    return fetchAPI('/members/birthdays/upcoming');
  },

  // Get important contacts (with phone/email)
  getImportantContacts: async (): Promise<Member[]> => {
    return fetchAPI('/members/contacts/important');
  },

  // Get latest family activity (combined feed)
  getLatestActivity: async (limit = 5): Promise<unknown[]> => {
    return fetchAPI(`/activity/latest?limit=${limit}`);
  },
};