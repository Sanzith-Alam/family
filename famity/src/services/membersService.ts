
import type { Member } from '../types/Member';


// --- Dummy Data (Replace with real API calls) ---
const dummyMembers: Member[] = [
  {
    id: 'm1', name: 'John Doe', relation: 'Father', dob: '1970-03-10', bio: 'Loves fishing and hiking.', avatarUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=JD',
    contactInfo: undefined
  },
  {
    id: 'm2', name: 'Jane Doe', relation: 'Mother', dob: '1972-07-25', bio: 'An amazing cook and gardener.', avatarUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=JA',
    contactInfo: undefined
  },
  {
    id: 'm3', name: 'Alice Doe', relation: 'Daughter', dob: '2000-01-05', bio: 'Studying computer science, loves gaming.', avatarUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=AL',
    contactInfo: undefined
  },
  {
    id: 'm4', name: 'Bob Doe', relation: 'Son', dob: '2005-11-12', bio: 'Passionate about basketball and reading.', avatarUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=BO',
    contactInfo: undefined
  },
  {
    id: 'm5', name: 'Grandma Mary', relation: 'Grandmother', dob: '1945-02-14', bio: 'The family matriarch, wise and kind.', avatarUrl: 'https://via.placeholder.com/150/800080/FFFFFF?text=GM',
    contactInfo: undefined
  },
];
// --- End Dummy Data ---

export const getMembers = async (): Promise<Member[]> => {
  // const response = await api.get<Member[]>(MEMBERS_API_URL);
  // return response.data;
  
  return new Promise((resolve) => setTimeout(() => resolve(dummyMembers), 500));
};

export const getMemberById = async (id: string): Promise<Member> => {
  // const response = await api.get<Member>(`${MEMBERS_API_URL}/${id}`);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = dummyMembers.find(m => m.id === id);
      if (member) {
        resolve(member);
      } else {
        reject(new Error('Member not found'));
      }
    }, 500);
  });
};

// Add createMember, updateMember, deleteMember as needed