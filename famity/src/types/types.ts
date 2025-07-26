// types.ts
export interface Member {
  id: string;
  name: string;
  dob: string;
  avatarUrl?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  // ... other member fields
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  // ... other event fields
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  // ... other announcement fields
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  coverPhotoUrl?: string;
  photos: Photo[];
  // ... other album fields
}

export interface Photo {
  id: string;
  imageUrl: string;
  caption?: string;
  uploadedBy: string;
  uploadedAt: string;
  // ... other photo fields
}