
import type { Announcement } from '../types/Announcement';


// --- Dummy Data (Replace with real API calls) ---
const dummyAnnouncements: Announcement[] = [
  { id: 'an1', title: 'New Baby Alert!', content: 'We are thrilled to announce the arrival of baby Lily! Born on July 15th, 2025.', date: '2025-07-20T10:00:00Z', author: 'John Doe' },
  { id: 'an2', title: 'Website Update Completed', content: 'Our new family website is now fully live! Explore all the new features.', date: '2025-07-18T09:00:00Z', author: 'Webmaster' },
  { id: 'an3', title: 'Lost Dog: Max', content: 'Our family dog, Max, went missing near the park on July 10th. Please contact us if you see him!', date: '2025-07-11T14:30:00Z', author: 'Jane Doe' },
  { id: 'an4', title: 'Family Tree Research Project', content: 'Seeking volunteers to help compile our extensive family tree. Contact Alice for details.', date: '2025-06-25T11:00:00Z', author: 'Alice Doe' },
];
// --- End Dummy Data ---

export const getAnnouncements = async (): Promise<Announcement[]> => {
  // const response = await api.get<Announcement[]>(ANNOUNCEMENTS_API_URL);
  // return response.data;
  
  return new Promise((resolve) => setTimeout(() => resolve(dummyAnnouncements), 500));
};

export const getAnnouncementById = async (id: string): Promise<Announcement> => {
  // const response = await api.get<Announcement>(`${ANNOUNCEMENTS_API_URL}/${id}`);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const announcement = dummyAnnouncements.find(a => a.id === id);
      if (announcement) {
        resolve(announcement);
      } else {
        reject(new Error('Announcement not found'));
      }
    }, 500);
  });
};

// Add createAnnouncement, updateAnnouncement, deleteAnnouncement as needed