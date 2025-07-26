// src/pages/AlbumDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Assuming these components and types are defined in your project
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import type { Photo, Album } from '../../types/Photo';
import { getAlbumById } from '../../services/galleryService'; // Data fetching service

const AlbumDetails: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!albumId) {
        setError('Album ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getAlbumById(albumId);
        setAlbum(data);
      } catch (err) {
        setError('Failed to fetch album details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [albumId]); // Re-run effect if albumId changes

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading album...</p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-2xl text-red-700 font-semibold">Error: {error}</p>
      </div>
    );
  }

  // --- Album Not Found State ---
  if (!album) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-2xl text-gray-600">Album not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Hero Section for Album Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4 tracking-tight leading-tight">
          {album.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {album.description || 'A collection of beautiful memories.'}
        </p>
      </div>

      {/* Photo Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {album.photos.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center text-gray-600 text-lg">
            <p>No photos in this album yet. Time to add some magic!</p>
          </div>
        ) : (
          album.photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              onClick={() => openPhotoModal(photo)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-64 object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <p className="text-white text-lg font-semibold truncate">
                  {photo.title}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <Link to="/gallery">
          <Button
            variant="primary" // Assuming 'primary' variant provides a prominent style
            className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            ← Back to Albums
          </Button>
        </Link>
      </div>

      {/* Photo Modal */}
      <Modal isOpen={isModalOpen} onClose={closePhotoModal} title={selectedPhoto?.title}>
        {selectedPhoto && (
          <div className="text-center">
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="max-h-[80vh] w-full object-contain mx-auto rounded-lg shadow-xl mb-4"
            />
            {selectedPhoto.description && (
              <p className="text-gray-700 mt-2 text-md leading-relaxed">
                {selectedPhoto.description}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AlbumDetails;