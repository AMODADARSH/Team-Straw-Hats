import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function NasaEyes() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      )}
      <iframe
        src="https://eyes.nasa.gov/apps/orrery/"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        allowFullScreen
        title="NASA Eyes on the Solar System"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}