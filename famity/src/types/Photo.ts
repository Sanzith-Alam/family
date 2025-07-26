export interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  albumId: string;
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  coverPhotoUrl?: string;
  photos: Photo[]; // Or fetch photos separately
}