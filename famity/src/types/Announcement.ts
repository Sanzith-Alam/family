export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string; // ISO 8601 string
  author: string; // Who posted the announcement
}