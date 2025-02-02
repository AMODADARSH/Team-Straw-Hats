import React, { useState } from 'react';
import { Globe2, Rocket } from 'lucide-react';
import SpaceQuiz from './SpaceQuiz';

const spaceData = {
  planets: [
    {
      name: 'Mercury',
      description: 'The smallest and innermost planet in the Solar System',
      funFact: 'Orbits the Sun at an incredible speed of about 107,000 mph —faster than any other planet.',
      imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Venus',
      description: 'Often called Earth\'s sister planet due to similar size',
      funFact: 'Rotates backwards compared to most other planets.',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Earth',
      description: 'Our home planet and the only known planet with life',
      funFact: 'Is the only planet not named after a god or goddess.',
      imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Mars',
      description: 'Known as the Red Planet',
      funFact: 'Has the largest dust storms in our solar system.',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Jupiter',
      description: 'The largest planet in our solar system',
      funFact: 'Has the shortest day of all the planets.',
      imageUrl: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Saturn',
      description: 'The ringed planet',
      funFact: 'Could float in water because it is mostly made of gas.',
      imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Uranus',
      description: 'The tilted ice giant',
      funFact: 'Rotates on its side, like a rolling ball.',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Neptune',
      description: 'The windiest planet',
      funFact: 'Has the strongest winds in the solar system, reaching 1,200 mph.',
      imageUrl: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?auto=format&fit=crop&q=80&w=800'
    }
  ],
  missions: [
    {
      name: 'Apollo 11',
      description: 'First human Moon landing mission',
      funFact: 'Neil Armstrong\'s first step on the Moon was watched by an estimated 600 million people.',
      imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Voyager 1',
      description: 'Farthest human-made object from Earth',
      funFact: 'Voyager 1 carries a golden record with sounds and images of Earth.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Hubble Space Telescope',
      description: 'NASA\'s eye on the universe since 1990',
      funFact: 'Hubble has made more than 1.5 million observations since its mission began.',
      imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Mars Perseverance',
      description: 'Latest Mars rover searching for ancient microbial life',
      funFact: 'Perseverance carries a helicopter named Ingenuity, the first aircraft to fly on another planet.',
      imageUrl: 'https://wp.technologyreview.com/wp-content/uploads/2021/04/nasa-mars-rover-perseverance.jpg?auto=format&fit=crop&q=80&w=800'
    }
  ]
};

export default function PlanetFacts() {
  const [activeSection, setActiveSection] = useState<'planets' | 'missions'>('planets');
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={() => {
            setActiveSection('planets');
            setShowQuiz(false);
          }}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
            activeSection === 'planets' && !showQuiz
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white/50 hover:bg-white/80'
          }`}
        >
          <Globe2 className="w-5 h-5" />
          Planets
        </button>
        <button
          onClick={() => {
            setActiveSection('missions');
            setShowQuiz(false);
          }}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
            activeSection === 'missions' && !showQuiz
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white/50 hover:bg-white/80'
          }`}
        >
          <Rocket className="w-5 h-5" />
          Space Missions
        </button>
        <button
          onClick={() => setShowQuiz(true)}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
            showQuiz
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white/50 hover:bg-white/80'
          }`}
        >
          🎮 Space Quiz
        </button>
      </div>

      {showQuiz ? (
        <SpaceQuiz spaceData={spaceData} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {spaceData[activeSection].map((item) => (
            <div
              key={item.name}
              className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-video">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {activeSection === 'planets' ? (
                      <Globe2 className="w-5 h-5" />
                    ) : (
                      <Rocket className="w-5 h-5" />
                    )}
                    {item.name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Fun Fact:</span> {item.funFact}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}