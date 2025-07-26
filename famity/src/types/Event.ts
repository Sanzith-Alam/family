export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Consider using Date object or specific date format
  location: string;
  imageUrl?: string;
}