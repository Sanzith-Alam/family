// FamilyHub.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FamilyPoll from '../../pages/FamilyHub/FamilyPoll';
import { useAuth } from '../../context/AuthContext';
import { getEvents } from '../../services/eventsService';
import { getAnnouncements } from '../../services/announcementsService';
import { getAlbums } from '../../services/galleryService';
import { getMembers } from '../../services/membersService';
import type { Member } from '../../types/Member';
import { formatDate } from '../../utils/dateFormatter';


type ActivityFeedItem = {
  id: string;
  type: 'event' | 'announcement' | 'photoUpload';
  title: string;
  date: string;
  link: string;
  description?: string;
  imageUrl?: string;
  author?: string;
};

const FamilyHub: React.FC = () => {
  const { user } = useAuth();
  const [latestActivity, setLatestActivity] = useState<ActivityFeedItem[]>([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Member[]>([]);
  const [importantContacts, setImportantContacts] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsData, announcementsData, albumsData, membersData] = await Promise.all([
          getEvents(),
          getAnnouncements(),
          getAlbums(),
          getMembers(),
        ]);

        // Prepare Latest Activity Feed
        const activityItems: ActivityFeedItem[] = [];

        eventsData.forEach(event => {
          activityItems.push({
            id: event.id,
            type: 'event',
            title: `Event: ${event.title}`,
            date: event.date,
            link: `/events/${event.id}`,
            description: event.description,
          });
        });

        announcementsData.forEach(announcement => {
          activityItems.push({
            id: announcement.id,
            type: 'announcement',
            title: `Announcement: ${announcement.title}`,
            date: announcement.date,
            link: `/announcements/${announcement.id}`,
            description: announcement.content,
            author: announcement.author,
          });
        });

        albumsData
          .sort((a, b) => b.id.localeCompare(a.id))
          .slice(0, 3)
          .forEach(album => {
            if (album.photos && album.photos.length > 0) {
              activityItems.push({
                id: album.id,
                type: 'photoUpload',
                title: `New Album: ${album.name}`,
                date: new Date().toISOString(),
                link: `/gallery/${album.id}`,
                imageUrl: album.coverPhotoUrl || album.photos[0].imageUrl,
                description: album.description || 'New photos added!',
              });
            }
          });

        activityItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLatestActivity(activityItems.slice(0, 5));

        // Prepare Upcoming Birthdays
        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);

        const upcoming = membersData
          .filter(member => {
            const dob = new Date(member.dob);
            const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            if (nextBirthday < today) {
              nextBirthday.setFullYear(today.getFullYear() + 1);
            }
            return nextBirthday >= today && nextBirthday <= next30Days;
          })
          .sort((a, b) => {
            const dobA = new Date(a.dob);
            const dobB = new Date(b.dob);
            const nextBirthdayA = new Date(today.getFullYear(), dobA.getMonth(), dobA.getDate());
            if (nextBirthdayA < today) nextBirthdayA.setFullYear(today.getFullYear() + 1);
            const nextBirthdayB = new Date(today.getFullYear(), dobB.getMonth(), dobB.getDate());
            if (nextBirthdayB < today) nextBirthdayB.setFullYear(today.getFullYear() + 1);
            return nextBirthdayA.getTime() - nextBirthdayB.getTime();
          })
          .slice(0, 3);

        setUpcomingBirthdays(upcoming);

        // Prepare Important Contacts
        const contacts = membersData.filter(member => 
          member.contactInfo && (member.contactInfo.email || member.contactInfo.phone)
        );
        setImportantContacts(contacts.slice(0, 3));

      } catch (err) {
        setError('Failed to load Family Hub data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-8 text-xl text-blue-700">Loading your Family Hub...</div>;
  if (error) return <div className="text-center p-8 text-xl text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Personalized Welcome */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-xl p-6 md:p-8 mb-8 md:mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-3">
          Welcome to Your Family Hub, {user ? user.name.split(' ')[0] : 'Family Member'}!
        </h1>
        <p className="text-base md:text-lg lg:text-xl opacity-90">
          Your central dashboard for all things family. Stay connected and informed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
        {/* Latest Activity Feed */}
        <Card title="Latest Family Activity" className="lg:col-span-2">
          {latestActivity.length > 0 ? (
            <ul className="space-y-3 md:space-y-4">
              {latestActivity.map(item => (
                <li key={item.id} className="flex items-start space-x-3 md:space-x-4 bg-gray-50 p-3 rounded-md shadow-sm">
                  {item.type === 'photoUpload' && item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0" 
                    />
                  )}
                  <div className="flex-grow">
                    <Link 
                      to={item.link} 
                      className="font-semibold text-base md:text-lg text-blue-700 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs md:text-sm text-gray-500">
                      {formatDate(item.date, { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    <p className="text-gray-700 mt-1 line-clamp-2 text-sm md:text-base">
                      {item.description}
                    </p>
                    {item.author && (
                      <p className="text-xs text-gray-600 mt-1">By: {item.author}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No recent family activity to display.</p>
          )}
          <div className="mt-4 md:mt-6 text-center md:text-right">
            <Link to="/events" className="text-blue-600 hover:underline mr-3 md:mr-4 text-sm md:text-base">
              View All Events
            </Link>
            <Link to="/announcements" className="text-blue-600 hover:underline mr-3 md:mr-4 text-sm md:text-base">
              View All Announcements
            </Link>
            <Link to="/gallery" className="text-blue-600 hover:underline text-sm md:text-base">
              View All Photos
            </Link>
          </div>
        </Card>

        {/* Right Sidebar - Birthdays & Poll */}
        <div className="lg:col-span-1 space-y-6 md:space-y-8">
          {/* Upcoming Birthdays */}
          <Card title="Upcoming Birthdays">
            {upcomingBirthdays.length > 0 ? (
              <ul className="space-y-2 md:space-y-3">
                {upcomingBirthdays.map(member => (
                  <li key={member.id} className="flex items-center space-x-2 md:space-x-3">
                    <img 
                      src={member.avatarUrl || '/src/assets/default-avatar.png'} 
                      alt={member.name} 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-pink-300" 
                    />
                    <div>
                      <span className="font-medium text-gray-800 text-sm md:text-base">
                        {member.name}
                      </span>
                      <span className="block text-xs md:text-sm text-gray-600">
                        {formatDate(
                          new Date(
                            new Date().getFullYear(), 
                            new Date(member.dob).getMonth(), 
                            new Date(member.dob).getDate()
                          ).toISOString(), 
                          { month: 'long', day: 'numeric' }
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No upcoming birthdays soon.</p>
            )}
            <div className="mt-3 md:mt-4 text-right">
              <Link to="/members" className="text-blue-600 hover:underline text-xs md:text-sm">
                See all members →
              </Link>
            </div>
          </Card>

          {/* Family Poll */}
          <Card title="Family Poll of the Week">
            <FamilyPoll />
          </Card>

          {/* Important Family Contacts */}
          <Card title="Important Family Contacts">
            {importantContacts.length > 0 ? (
              <ul className="space-y-2 md:space-y-3">
                {importantContacts.map(member => (
                  <li key={`contact-${member.id}`} className="flex items-center space-x-2 md:space-x-3">
                    <img 
                      src={member.avatarUrl || '/src/assets/default-avatar.png'} 
                      alt={member.name} 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-300" 
                    />
                    <div>
                      <span className="font-medium text-gray-800 text-sm md:text-base">
                        {member.name}
                      </span>
                      {member.contactInfo?.phone && (
                        <p className="text-xs md:text-sm text-gray-600">
                          {member.contactInfo.phone}
                        </p>
                      )}
                      {member.contactInfo?.email && (
                        <p className="text-xs md:text-sm text-gray-600">
                          {member.contactInfo.email}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No contacts with public info.</p>
            )}
            <div className="mt-3 md:mt-4 text-right">
              <Link to="/members" className="text-blue-600 hover:underline text-xs md:text-sm">
                View all members →
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="text-center mt-8 md:mt-12 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
          Quick Access
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <Link to="/events">
            <Button size="large" className="min-w-[150px] md:min-w-[180px]">
              Upcoming Events
            </Button>
          </Link>
          <Link to="/gallery">
            <Button size="large" variant="secondary" className="min-w-[150px] md:min-w-[180px]">
              Family Photos
            </Button>
          </Link>
          <Link to="/members">
            <Button size="large" className="min-w-[150px] md:min-w-[180px]">
              Our Members
            </Button>
          </Link>
          <Link to="/announcements">
            <Button size="large" variant="secondary" className="min-w-[150px] md:min-w-[180px]">
              Announcements
            </Button>
          </Link>
          <Button 
            size="large" 
            className="min-w-[150px] md:min-w-[180px]"
            onClick={() => alert('Feature coming soon!')}
          >
            Family Tree
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyHub;