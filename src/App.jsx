import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  // fetch images
  const fetchImages = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=6`,
      );
      setImages(res.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  return (
    <div className='min-h-screen bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-6'>
      <h1 className='text-2xl font-bold text-center mb-6'>Image Gallery 📸</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {images.map((img) => (
          <div
            key={img.id}
            className='bg-white  rounded-xl shadow-md overflow-hidden'
          >
            <img
              src={img.thumbnailUrl}
              alt={img.title}
              className='h-52 w-full object-cover'
            />
            <div className='p-3'>
              <p className='font-semibold text-center text-sm line-clamp-2'>
                {img.title}
              </p>
              <p className='text-sm text-gray-500 text-center'>ID: {img.id}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center gap-4 mt-8'>
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className='px-4 py-2 bg-gray-300 rounded'
        >
          Previous
        </button>

        <span className='font-semibold'>Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Next
        </button>
      </div>
    </div>
  );
}