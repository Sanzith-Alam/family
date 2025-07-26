import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import type { Event } from '../../types/Event';
import { getEvents } from '../../services/eventsService';
import { formatDate } from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center p-8">Loading events...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Upcoming Events</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No events found.</p>
        ) : (
          events.map((event) => (
            <Card key={event.id} className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Date:</span> {formatDate(event.date)}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
              </div>
              <Link to={`/events/${event.id}`}>
                <Button variant="primary" className="w-full">View Details</Button>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsList;