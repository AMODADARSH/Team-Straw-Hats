import React from 'react';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { APODResponse } from '../types';

export default function APOD() {
  const [apod, setApod] = useState<APODResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(
          'https://api.nasa.gov/planetary/apod?api_key=p0mWaPuUMCjnKh9EvgMiuAlf3Moo9XzUzEx8uFdl'
        );
        const data = await response.json();
        setApod(data);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[800px] bg-black/5 backdrop-blur-sm rounded-xl">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!apod) return null;

  return (
    <div className="h-[800px] bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Astronomy Picture of the Day</h2>
      <div className="space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={apod.url}
            alt={apod.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <h3 className="text-xl font-semibold">{apod.title}</h3>
        <p className="text-gray-600 leading-relaxed">{apod.explanation}</p>
        <p className="text-sm text-gray-500">Date: {apod.date}</p>
      </div>
    </div>
  );
}