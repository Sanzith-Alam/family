import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

const app = express();
const port = 3000; // This should match the baseURL in your frontend's api.ts

// Middleware
app.use(cors()); // Allows your frontend (on a different port) to access this backend
app.use(bodyParser.json()); // To parse JSON request bodies

// --- Data Interfaces (Updated to match frontend's richer types) ---

interface ContactInfo {
    email?: string;
    phone?: string;
}

interface Member {
    id: string;
    name: string;
    relation: string; // e.g., "Father", "Mother", "Cousin", "Aunt"
    dob: string; // Date of Birth, e.g., "1970-03-10"
    bio?: string;
    avatarUrl?: string; // URL to the member's profile picture
    contactInfo?: ContactInfo; // Added for contact details
    birthplace?: string; // Added for more personal info
}

interface Comment {
    id: string;
    content: string;
    authorId: string; // ID of the member who commented
    authorName: string; // Name of the member for display
    timestamp: string; // ISO 8601 string
}

interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string; // ISO 8601 string
    author: string; // Who posted the announcement
    comments?: Comment[]; // Added for comments
}

interface Event {
    id: string;
    title: string;
    description: string;
    date: string; // ISO 8601 string, e.g., "2025-08-15T14:00:00Z"
    location: string;
    imageUrl?: string; // Optional image for the event
    category: 'Birthday' | 'Holiday' | 'Gathering' | 'Milestone' | 'Other'; // Added category
    attendees?: string[]; // Array of member IDs (Added for simple tracking)
    googleMapsUrl?: string; // Added for location links
}

interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    description?: string;
    albumId: string; // Foreign key to the Album it belongs to
    tags?: string[]; // Added for photo categorization/search
}

interface Album {
    id: string;
    name: string;
    description?: string;
    coverPhotoUrl?: string; // URL to the photo that represents the album
    // photos are linked via albumId, not directly nested in this backend structure
}

interface PollOption {
    id: string;
    text: string;
    votes: number;
}

interface FamilyPollData {
    id: string;
    question: string;
    options: PollOption[];
    totalVotes: number;
    isActive: boolean;
    // userVoted is frontend-only state
}

// --- Dummy Data Store (in-memory, resets on server restart) ---
const events: Event[] = [
    { id: '1', title: 'Family BBQ', description: 'Annual family BBQ at the park. Bring your favorite dish!', date: '2025-08-15T14:00:00Z', location: 'City Park', imageUrl: 'https://via.placeholder.com/400x250?text=Family+BBQ', category: 'Gathering', attendees: ['m1', 'm2'] },
    { id: '2', title: 'Grandma\'s 80th Birthday', description: 'A grand celebration for Grandma\'s 80th! RSVP by Aug 15th.', date: '2025-09-02T18:00:00Z', location: 'Family Reunion Hall', imageUrl: 'https://via.placeholder.com/400x250?text=Birthday+Party', category: 'Birthday', attendees: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'], googleMapsUrl: 'https://maps.app.goo.gl/example123' },
    { id: '3', title: 'Annual Family Reunion', description: 'Our biggest event of the year! Catch up with everyone.', date: '2025-12-20T10:00:00Z', location: 'Mountain Resort', imageUrl: 'https://via.placeholder.com/400x250?text=Family+Reunion', category: 'Holiday', attendees: [] },
    { id: '4', title: 'Cousin Sarah\'s Graduation', description: 'Celebrate Sarah graduating from university!', date: '2025-07-28T16:00:00Z', location: 'University Auditorium', imageUrl: 'https://via.placeholder.com/400x250?text=Graduation', category: 'Milestone', attendees: ['m1', 'm2', 'm3'] },
    { id: '5', title: 'Nephew Timmy\'s First Steps', description: 'Join us to celebrate Timmy\'s milestone! Cake will be served.', date: '2025-09-10T11:00:00Z', location: 'Doe Family Home', imageUrl: 'https://via.placeholder.com/400x250?text=First+Steps', category: 'Milestone', attendees: ['m2', 'm3'] },
    { id: '6', title: 'Fall Family Photo Shoot', description: 'Professional photographer will capture our family in autumn colors.', date: '2025-10-05T15:00:00Z', location: 'Maplewood Forest', imageUrl: 'https://via.placeholder.com/400x250?text=Photo+Shoot', category: 'Gathering', attendees: ['m1', 'm2', 'm3', 'm4'] },
];

const members: Member[] = [
    { id: 'm1', name: 'John Doe', relation: 'Father', dob: '1970-03-10', bio: 'Loves fishing, hiking, and telling dad jokes.', avatarUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=JD', contactInfo: { email: 'john.d@example.com', phone: '111-222-3333' }, birthplace: 'New York, USA' },
    { id: 'm2', name: 'Jane Doe', relation: 'Mother', dob: '1972-07-25', bio: 'An amazing cook, gardener, and the glue that holds us together.', avatarUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=JA', contactInfo: { email: 'jane.d@example.com' }, birthplace: 'London, UK' },
    { id: 'm3', name: 'Alice Doe', relation: 'Daughter', dob: '2000-01-05', bio: 'Studying computer science, loves gaming and coding.', avatarUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=AL', birthplace: 'California, USA' },
    { id: 'm4', name: 'Bob Doe', relation: 'Son', dob: '2005-11-12', bio: 'Passionate about basketball, reading, and learning new things.', avatarUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=BO', contactInfo: { phone: '555-666-7777' }, birthplace: 'Texas, USA' },
    { id: 'm5', name: 'Grandma Mary', relation: 'Grandmother', dob: '1945-02-14', bio: 'The family matriarch, wise, kind, and tells the best stories.', avatarUrl: 'https://via.placeholder.com/150/800080/FFFFFF?text=GM', birthplace: 'Dublin, Ireland' },
    { id: 'm6', name: 'Uncle Tom', relation: 'Uncle', dob: '1968-09-20', bio: 'Always brings laughter and the best BBQ ribs to family gatherings.', avatarUrl: 'https://via.placeholder.com/150/008080/FFFFFF?text=UT', birthplace: 'Sydney, Australia' },
];

const photos: Photo[] = [
    { id: 'p1', title: 'Summer Picnic 2024 - Group Photo', imageUrl: 'https://via.placeholder.com/800x600?text=Picnic+Group', description: 'Everyone smiling at the annual picnic.', albumId: 'a1', tags: ['picnic', 'summer', 'group'] },
    { id: 'p2', title: 'Kids playing in the park', imageUrl: 'https://via.placeholder.com/600x400?text=Kids+Play', description: 'The little ones having a blast on the swings.', albumId: 'a1', tags: ['kids', 'play', 'park'] },
    { id: 'p3', title: 'Grandma Mary\'s Rose Garden', imageUrl: 'https://via.placeholder.com/600x400?text=Rose+Garden', description: 'Beautiful roses from Grandma\'s garden.', albumId: 'a1', tags: ['garden', 'flowers', 'grandma'] },
    { id: 'p4', title: 'Beach Vacation Sunset', imageUrl: 'https://via.placeholder.com/800x600?text=Beach+Sunset', description: 'Stunning sunset over the ocean during our family vacation.', albumId: 'a2', tags: ['beach', 'sunset', 'vacation'] },
    { id: 'p5', title: 'Building Sandcastles', imageUrl: 'https://via.placeholder.com/600x400?text=Sandcastles', description: 'Hours of fun building the ultimate sandcastle on the beach.', albumId: 'a2', tags: ['beach', 'kids', 'fun'] },
    { id: 'p6', title: 'Family at the Lighthouse', imageUrl: 'https://via.placeholder.com/600x400?text=Lighthouse', description: 'A memorable visit to the historic lighthouse.', albumId: 'a2', tags: ['lighthouse', 'trip', 'family'] },
    { id: 'p7', title: 'Christmas Dinner Table', imageUrl: 'https://via.placeholder.com/800x600?text=Christmas+Dinner', description: 'The delicious spread for Christmas dinner.', albumId: 'a3', tags: ['christmas', 'dinner', 'food'] },
    { id: 'p8', title: 'Gift Opening Morning', imageUrl: 'https://via.placeholder.com/600x400?text=Gift+Opening', description: 'Excited faces opening gifts on Christmas morning.', albumId: 'a3', tags: ['christmas', 'gifts', 'joy'] },
    { id: 'p9', title: 'Singing Carols', imageUrl: 'https://via.placeholder.com/600x400?text=Carols', description: 'Family gathered around the piano singing carols.', albumId: 'a3', tags: ['christmas', 'music', 'singing'] },
];

const albums: Album[] = [
    { id: 'a1', name: 'Summer 2024 Adventures', description: 'Memories from our summer adventures, picnics, and fun in the sun.', coverPhotoUrl: 'https://via.placeholder.com/400x250?text=Summer+Album' },
    { id: 'a2', name: 'Beach Trip 2023', description: 'Our unforgettable trip to the seaside, full of sun, sand, and smiles.', coverPhotoUrl: 'https://via.placeholder.com/400x250?text=Beach+Album' },
    { id: 'a3', name: 'Holidays 2023', description: 'Christmas and New Year celebrations, filled with warmth and joy.', coverPhotoUrl: 'https://via.placeholder.com/400x250?text=Holiday+Album' },
];

const announcements: Announcement[] = [
    { id: 'an1', title: 'New Baby Alert! - Baby Lily Has Arrived!', content: 'We are thrilled to announce the safe arrival of baby Lily! Born on July 15th, 2025, weighing 7 lbs, 5 oz. Both mom and baby are doing wonderfully.', date: '2025-07-20T10:00:00Z', author: 'John Doe', comments: [] },
    { id: 'an2', title: 'Website Update Completed - Explore New Features!', content: 'Our new family website is now fully live! We\'ve added new photo gallery features, improved member profiles, and a dedicated events calendar. Explore all the new functionalities!', date: '2025-07-18T09:00:00Z', author: 'Webmaster', comments: [
      { id: 'c1', content: 'Looks great! Love the new design.', authorId: 'm3', authorName: 'Alice Doe', timestamp: '2025-07-18T12:00:00Z' },
      { id: 'c2', content: 'Fantastic job, thank you for all your hard work!', authorId: 'm5', authorName: 'Grandma Mary', timestamp: '2025-07-19T09:30:00Z' },
    ] },
    { id: 'an3', title: 'Lost Dog: Max - Please Help Us Find Him!', content: 'Our beloved family dog, Max, a golden retriever, went missing near the park on July 10th. He\'s wearing a blue collar. If you see him, please contact Jane Doe immediately!', date: '2025-07-11T14:30:00Z', author: 'Jane Doe', comments: [] },
    { id: 'an4', title: 'Family Tree Research Project - Volunteers Needed!', content: 'Seeking enthusiastic volunteers to help us compile and expand our extensive family tree. Your contributions will help us uncover more of our family history. Contact Alice Doe for details and how to get involved.', date: '2025-06-25T11:00:00Z', author: 'Alice Doe', comments: [] },
    { id: 'an5', title: 'Upcoming Zoom Call for Family Q&A', content: 'We\'re hosting a family Zoom call to discuss upcoming events and answer any questions. Date: Aug 5th, 2025, 7 PM EST. Link will be shared soon!', date: '2025-07-22T16:00:00Z', author: 'Admin', comments: [] },
];

const familyPoll: FamilyPollData = {
    id: 'poll1',
    question: 'What should be the theme for our next family gathering?',
    options: [
        { id: 'opt1', text: 'Summer Luau', votes: 15 },
        { id: 'opt2', text: 'Decades Party (80s/90s)', votes: 10 },
        { id: 'opt3', text: 'Board Game Bonanza', votes: 8 },
        { id: 'opt4', text: 'Outdoor Adventure Day', votes: 12 },
    ],
    totalVotes: 45,
    isActive: true,
};

// --- API Routes ---

// Events API
app.get('/api/events', (_req, res) => {
    res.json(events);
});

app.get('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === req.params.id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.post('/api/events', (req, res) => {
    const newEvent: Event = { id: uuidv4(), ...req.body };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Members API
app.get('/api/members', (_req, res) => {
    res.json(members);
});

app.get('/api/members/:id', (req, res) => {
    const member = members.find(m => m.id === req.params.id);
    if (member) {
        res.json(member);
    } else {
        res.status(404).json({ message: 'Member not found' });
    }
});

app.post('/api/members', (req, res) => {
    const newMember: Member = { id: uuidv4(), ...req.body };
    members.push(newMember);
    res.status(201).json(newMember);
});

// Announcements API
app.get('/api/announcements', (_req, res) => {
    // Sort announcements by date, newest first
    const sortedAnnouncements = [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(sortedAnnouncements);
});

app.get('/api/announcements/:id', (req, res) => {
    const announcement = announcements.find(a => a.id === req.params.id);
    if (announcement) {
        res.json(announcement);
    } else {
        res.status(404).json({ message: 'Announcement not found' });
    }
});

app.post('/api/announcements', (req, res) => {
    const newAnnouncement: Announcement = { id: uuidv4(), ...req.body, comments: [] }; // Initialize comments array
    announcements.push(newAnnouncement);
    res.status(201).json(newAnnouncement);
});

app.post('/api/announcements/:id/comments', (req, res) => {
    const announcementId = req.params.id;
    const { content, authorId, authorName } = req.body; // Expect these fields

    if (!content || !authorId || !authorName) {
        return res.status(400).json({ message: 'Missing comment content, authorId, or authorName.' });
    }

    const announcementIndex = announcements.findIndex(a => a.id === announcementId);
    if (announcementIndex > -1) {
        const newComment: Comment = {
            id: uuidv4(),
            content,
            authorId,
            authorName,
            timestamp: new Date().toISOString()
        };
        if (!announcements[announcementIndex].comments) {
            announcements[announcementIndex].comments = [];
        }
        announcements[announcementIndex].comments!.push(newComment);
        res.status(201).json(announcements[announcementIndex]); // Return the updated announcement
    } else {
        res.status(404).json({ message: 'Announcement not found to add comment' });
    }
});

// Gallery API (Albums and Photos)
app.get('/api/gallery', (_req, res) => {
    // Return albums with a 'photos' array, even if empty for simplicity
    const albumsWithPhotos = albums.map(album => ({
        ...album,
        photos: photos.filter(p => p.albumId === album.id)
    }));
    res.json(albumsWithPhotos);
});

app.get('/api/gallery/:albumId', (req, res) => {
    const album = albums.find(a => a.id === req.params.albumId);
    if (album) {
        // Attach photos to the album object for the details view
        const albumWithPhotos = {
            ...album,
            photos: photos.filter(p => p.albumId === album.id)
        };
        res.json(albumWithPhotos);
    } else {
        res.status(404).json({ message: 'Album not found' });
    }
});

app.post('/api/gallery/albums', (req, res) => {
    const newAlbum: Album = { id: uuidv4(), ...req.body };
    albums.push(newAlbum);
    res.status(201).json(newAlbum);
});

app.post('/api/gallery/photos', (req, res) => {
    const newPhoto: Photo = { id: uuidv4(), ...req.body };
    photos.push(newPhoto);
    res.status(201).json(newPhoto);
});

// Poll API
app.get('/api/poll', (_req, res) => {
    // In a real app, you'd fetch the active poll from a DB
    // For now, return the single dummy poll
    res.json(familyPoll);
});

app.post('/api/poll/:pollId/vote', (req, res) => {
    const { pollId } = req.params;
    const { optionId } = req.body; // Expect { optionId: 'opt1' }

    if (pollId !== familyPoll.id || !familyPoll.isActive) {
        return res.status(400).json({ message: 'Invalid or inactive poll.' });
    }

    const optionIndex = familyPoll.options.findIndex(opt => opt.id === optionId);
    if (optionIndex === -1) {
        return res.status(400).json({ message: 'Invalid option.' });
    }

    familyPoll.options[optionIndex].votes++;
    familyPoll.totalVotes++;

    res.json(familyPoll); // Return the updated poll state
});

app.put('/api/poll/:pollId', (req, res) => {
    const { pollId } = req.params;
    const { question, options, isActive } = req.body;

    if (pollId !== familyPoll.id) {
        return res.status(404).json({ message: 'Poll not found.' });
    }

    // Update poll properties
    if (question) familyPoll.question = question;
    if (options && Array.isArray(options)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        familyPoll.options = options.map((opt: any) => ({
            id: opt.id || uuidv4(),
            text: opt.text,
            votes: opt.votes || 0,
        }));
        familyPoll.totalVotes = familyPoll.options.reduce((sum, opt) => sum + opt.votes, 0);
    }
    if (typeof isActive === 'boolean') familyPoll.isActive = isActive;

    res.json(familyPoll);
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
    console.log(`API endpoints:`);
    console.log(`  - GET http://localhost:${port}/api/events`);
    console.log(`  - GET http://localhost:${port}/api/events/:id`);
    console.log(`  - POST http://localhost:${port}/api/events`);
    console.log(`  - GET http://localhost:${port}/api/members`);
    console.log(`  - GET http://localhost:${port}/api/members/:id`);
    console.log(`  - POST http://localhost:${port}/api/members`);
    console.log(`  - GET http://localhost:${port}/api/announcements`);
    console.log(`  - GET http://localhost:${port}/api/announcements/:id`);
    console.log(`  - POST http://localhost:${port}/api/announcements`);
    console.log(`  - POST http://localhost:${port}/api/announcements/:id/comments`);
    console.log(`  - GET http://localhost:${port}/api/gallery (lists albums with embedded photos)`);
    console.log(`  - GET http://localhost:${port}/api/gallery/:albumId (gets specific album with embedded photos)`);
    console.log(`  - POST http://localhost:${port}/api/gallery/albums`);
    console.log(`  - POST http://localhost:${port}/api/gallery/photos`);
    console.log(`  - GET http://localhost:${port}/api/poll`);
    console.log(`  - POST http://localhost:${port}/api/poll/:pollId/vote`);
    console.log(`  - PUT http://localhost:${port}/api/poll/:pollId`);
});