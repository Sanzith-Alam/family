import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import type { Event } from '../../types/Event';
import { getEventById } from '../../services/eventsService';
import { formatDate } from '../../utils/dateFormatter';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('Event ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Failed to fetch event details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading event details...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  if (!event) return <div className="text-center p-8 text-gray-600">Event not found.</div>;

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">{event.title}</h1>
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        )}
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Date:</span> {formatDate(event.date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <p className="text-gray-600 mb-4"><span className="font-semibold">Location:</span> {event.location}</p>
        
        <div className="flex justify-end mt-6">
          <Link to="/events">
            <Button variant="secondary">Back to Events List</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default EventDetails;