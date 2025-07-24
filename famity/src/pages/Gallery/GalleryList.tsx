import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import type { Album } from '../../types/Photo';
import { getAlbums } from '../../services/galleryService';
import { Link } from 'react-router-dom';

const GalleryList: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const data = await getAlbums();
        setAlbums(data);
      } catch (err) {
        setError('Failed to fetch albums.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-6 text-2xl font-medium text-gray-700">Loading albums...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <p className="text-3xl font-bold text-red-700 mb-3">Error: {error}</p>
        <p className="text-gray-600">Please refresh or check your connection.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:p-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-4 leading-tight">
          Family Gallery
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Relive our most precious memories and milestones through beautifully
          curated photo albums.
        </p>
      </header>

      {/* Albums Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {albums.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-lg p-10 text-center text-gray-600 text-xl font-medium">
            <p>It looks empty here — no albums yet!</p>
            <Button
              variant="primary"
              className="mt-6 px-6 py-3 text-lg rounded-full"
            >
              + Create First Album
            </Button>
          </div>
        ) : (
          albums.map((album) => (
            <Card
              key={album.id}
              className="group flex flex-col justify-between items-center text-center p-0 overflow-hidden
                         bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out
                         transform hover:-translate-y-2 hover:scale-105 relative"
            >
              {/* Badge for photos count */}
              {album.photos?.length > 0 && (
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {album.photos.length} Photos
                </span>
              )}

              {/* Cover Image */}
              {album.coverPhotoUrl && (
                <div className="w-full h-56 overflow-hidden rounded-t-xl">
                  <img
                    src={album.coverPhotoUrl}
                    alt={album.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
              )}

              {/* Album Info */}
              <div className="p-6 flex flex-col items-center flex-grow w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                  {album.name}
                </h2>
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                  {album.description || 'A beautiful collection of memories.'}
                </p>
                <Link to={`/gallery/${album.id}`} className="w-full mt-auto">
                  <Button
                    variant="primary"
                    className="w-full py-3 text-lg font-semibold rounded-lg
                               bg-blue-600 text-white hover:bg-blue-700
                               transition-transform duration-300 hover:scale-105"
                  >
                    View Album
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryList;
