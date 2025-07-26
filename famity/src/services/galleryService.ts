
import type { Photo, Album } from '../types/Photo';

import togather from '../assets/program/togather.jpg'
import togather1 from '../assets/program/togather1.jpg'
import togather2 from '../assets/program/togather2.jpg'
import playing from '../assets/program/playing.jpg'
import togather3 from '../assets/program/togather3.jpg'
import price from '../assets/price/price.jpg'
// --- Dummy Data (Replace with real API calls) ---
const dummyPhotos: Photo[] = [
  { id: 'p1', title: '', imageUrl: togather1 , description: 'Fun day at the park with sandwiches.', albumId: 'a1' },
  { id: 'p2', title: '', imageUrl: togather2, description: 'The little ones having a blast.', albumId: 'a1' },
   { id: 'p3', title: 'Playing Badminton', imageUrl: playing, description: 'রাতের বিনোদন .', albumId: 'a1' },
    { id: 'p4', title: 'Playing Badminton', imageUrl: togather3, description: 'রাতের বিনোদন .', albumId: 'a1' },
    { id: 'p5', title: '', imageUrl: togather , description: '', albumId: 'a1' },
  { id: 'p3', title: 'price giving ', imageUrl: price , description: '', albumId: 'a2' },
  { id: 'p4', title: 'Building Sandcastles', imageUrl: 'https://via.placeholder.com/600x400?text=Sandcastles', description: 'Hours of fun building the ultimate sandcastle.', albumId: 'a2' },
  { id: 'p5', title: 'Christmas Dinner', imageUrl: 'https://via.placeholder.com/600x400?text=Christmas+Dinner', description: 'Family gathered for Christmas dinner.', albumId: 'a3' },
  { id: 'p6', title: 'Gift Opening', imageUrl: 'https://via.placeholder.com/600x400?text=Gift+Opening', description: 'Excited faces opening gifts.', albumId: 'a3' },
];

const dummyAlbums: Album[] = [
  { id: 'a1', name: 'Family reunion', description: 'Lots of Memories ', coverPhotoUrl: togather, photos: dummyPhotos.filter(p => p.albumId === 'a1') },
  { id: 'a2', name: 'Prize giving ceremony', description: 'Prize-giving ceremonies aim to acknowledge and celebrate excellence', coverPhotoUrl: price , photos: dummyPhotos.filter(p => p.albumId === 'a2') },
  { id: 'a3', name: 'Holidays 2023', description: 'Christmas and New Year celebrations.', coverPhotoUrl: 'https://via.placeholder.com/400x250?text=Holiday+Album', photos: dummyPhotos.filter(p => p.albumId === 'a3') },
  { id: 'a3', name: 'Holidays 2023', description: 'Christmas and New Year celebrations.', coverPhotoUrl: 'https://via.placeholder.com/400x250?text=Holiday+Album', photos: dummyPhotos.filter(p => p.albumId === 'a3') },
];
// --- End Dummy Data ---

export const getAlbums = async (): Promise<Album[]> => {
  // In a real application, you'd use:
  // const response = await api.get<Album[]>(GALLERY_API_URL);
  // return response.data;
  
  return new Promise((resolve) => setTimeout(() => resolve(dummyAlbums), 500));
};

export const getAlbumById = async (id: string): Promise<Album> => {
  // In a real application, you'd use:
  // const response = await api.get<Album>(`${GALLERY_API_URL}/albums/${id}`);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const album = dummyAlbums.find(a => a.id === id);
      if (album) {
        resolve(album);
      } else {
        reject(new Error('Album not found'));
      }
    }, 500);
  });
};

// You might also have getPhotos and getPhotoById if photos are managed separately from albums
export const getPhotosByAlbumId = async (albumId: string): Promise<Photo[]> => {
  // const response = await api.get<Photo[]>(`${GALLERY_API_URL}/albums/${albumId}/photos`);
  // return response.data;
  return new Promise((resolve) => setTimeout(() => resolve(dummyPhotos.filter(p => p.albumId === albumId)), 500));
};

// Add createAlbum, createPhoto, etc.