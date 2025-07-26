import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import type { Announcement } from '../../types/Announcement';
import { getAnnouncements } from '../../services/announcementsService'; // Will create this service
import { formatDate } from '../../utils/dateFormatter';

const AnnouncementsList: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await getAnnouncements();
        // Sort by date, newest first
        setAnnouncements(data.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        setError('Failed to fetch announcements.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div className="text-center p-8">Loading announcements...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Family Announcements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No announcements posted yet.</p>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement.id}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{announcement.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Posted by <span className="font-medium">{announcement.author}</span> on {formatDate(announcement.date)}
              </p>
              <p className="text-gray-700 mt-4">{announcement.content}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementsList;