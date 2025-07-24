// Still import api, but it won't be used for dummy data
// If you were using a real API, you might have something like:
// import axios from 'axios';
// const api = axios.create({ baseURL: 'YOUR_API_BASE_URL' });
// const EVENTS_API_URL = '/events';

import { type Event } from '../types/Event';
import Image from "../assets/events.jpg"
// --- Dummy Data ---
const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'পারিবারিক পিকনিক ২০২৫',
    description: `শীতের রোদে সবাইকে নিয়ে মজার এক পিকনিকের আয়োজন করা হয়েছে। দিনব্যাপী আড্ডা, খেলাধুলা, গানের আসর ও সুস্বাদু খাবারের মাধ্যমে পরিবারের সকল সদস্যদের আনন্দ ভাগাভাগি করে নেওয়া হবে।

প্রোগ্রাম হাইলাইটস:
* সকাল ৯টায় বাস রওনা হবে
* আউটডোর গেমস (ক্রিকেট, ব্যাডমিন্টন, দড়ি টানাটানি)
* গান ও নাচের পারফরম্যান্স
* একসাথে লাঞ্চ ও সন্ধ্যায় বারবিকিউ`,
    date: '2026-01-15T14:00:00Z',
    location: 'টামনি নয়াপাড়া',
    imageUrl : Image,
  },
  {
    id: '2',
    title: 'জন্মদিন উদযাপন',
    description: `আমাদের পরিবারের সবচেয়ে শ্রদ্ধেয় মানুষ দাদুর ৮০তম জন্মদিন উপলক্ষে আয়োজন করা হয়েছে এক বিশেষ অনুষ্ঠান। থাকবে পারিবারিক দোয়া মাহফিল, কেক কাটিং এবং স্মৃতিচারণ।

বিশেষ পরিকল্পনা:
* দোয়া মাহফিল সকাল ১০টায়
* জন্মদিন কেক কাটিং দুপুর ১২টায়
* সবাই মিলে গ্রুপ ফটো ও স্মৃতির অ্যালবাম তৈরি`,
    date: '2025-09-02T18:00:00Z',
    location: 'Family Reunion Hall',
  
  },
  {
    id: '3',
    title: 'পারিবারিক গেট-টুগেদার ও সাংস্কৃতিক অনুষ্ঠান',
    description: `পরিবারের নতুন প্রজন্মকে একে অপরের সাথে পরিচয় করিয়ে দিতে এবং সম্পর্ক আরও দৃঢ় করতে গেট-টুগেদার ও সাংস্কৃতিক অনুষ্ঠানের আয়োজন করা হয়েছে। সবাই নিজেদের প্রতিভা উপস্থাপন করতে পারবে।

ইভেন্ট হাইলাইটস:
* শিশুদের আবৃত্তি ও গান
* কুইজ ও খেলাধুলা প্রতিযোগিতা
* স্মৃতিচারণ ও পারিবারিক গল্প শেয়ার
* ডিনার পার্টি`,
    date: '2025-12-20T10:00:00Z',
    location: 'টামনি নয়াপাড়া',

  },
  {
    id: '4',
    title: 'ঈদ পুনর্মিলনী ২০২৫',
    description: `ঈদের আনন্দ ভাগাভাগি করতে আমাদের সকল আত্মীয়-স্বজন একসাথে মিলিত হব। থাকবে খাওয়া-দাওয়া, ঈদের সেলফি কর্নার এবং শিশুদের জন্য বিশেষ উপহার বিতরণ।

প্রোগ্রাম:
* দুপুরের আগে মিলনমেলা
* একসাথে মধ্যাহ্ন ভোজন
* ঈদ গিফট এক্সচেঞ্জ অনুষ্ঠান
* পারিবারিক ফটোসেশন`,
    date: '2025-07-28T16:00:00Z',
    location: 'টামনি নয়াপাড়া',
   
  },
];
// --- End Dummy Data ---

export const getEvents = async (): Promise<Event[]> => {
  // Uncomment the following block and comment out the Promise below when you have a real API
  /*
  try {
    const response = await api.get<Event[]>(EVENTS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching events from API:", error);
    throw error; // Re-throw to be caught by the component
  }
  */

  // This simulates an API call with dummy data
  return new Promise((resolve) => setTimeout(() => resolve(dummyEvents), 500));
};

export const getEventById = async (id: string): Promise<Event> => {
  // Uncomment the following block and comment out the Promise below when you have a real API
  /*
  try {
    const response = await api.get<Event>(`${EVENTS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event by ID ${id} from API:`, error);
    throw error;
  }
  */

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = dummyEvents.find((e) => e.id === id);
      if (event) {
        resolve(event);
      } else {
        reject(new Error('Event not found (dummy data)'));
      }
    }, 500);
  });
};

export const createEvent = async (
  eventData: Omit<Event, 'id'>
): Promise<Event> => {
  // Uncomment the following block and comment out the Promise below when you have a real API
  /*
  try {
    const response = await api.post<Event>(EVENTS_API_URL, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event from API:", error);
    throw error;
  }
  */

  console.log('Creating event (dummy):', eventData);
  const newEvent: Event = { ...eventData, id: String(dummyEvents.length + 1) };
  dummyEvents.push(newEvent); // In a real app, you'd want to ensure this is immutable
  return new Promise((resolve) => setTimeout(() => resolve(newEvent), 500));
};