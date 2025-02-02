import React from 'react';
import { RocketIcon } from 'lucide-react';
import APOD from './components/APOD';
import PlanetFacts from './components/PlanetFacts';
import NasaEyes from './components/NasaEyes';
import SpaceNews from './components/SpaceNews';
import ThemeSelector from './components/ThemeSelector';
import { ThemeProvider, useTheme } from './components/themeContext';

function AppContent() {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.primary} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <ThemeSelector />
        
        <header className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold ${colors.text} flex items-center justify-center gap-3 mb-4 transition-colors duration-500`}>
            <RocketIcon className="w-10 h-10 text-indigo-600" />
            Space Facts Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors duration-500">
            Discover the wonders of our universe, from the mysteries of distant planets 
            to humanity's greatest space achievements
          </p>
        </header>

        <main className="space-y-12">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <APOD />
            </div>
            <div>
              <SpaceNews />
            </div>
          </section>

          <section>
            <h2 className={`text-3xl font-bold mb-6 ${colors.text} text-center transition-colors duration-500`}>
              3D Solar System
            </h2>
            <NasaEyes />
          </section>

          <section>
            <h2 className={`text-3xl font-bold mb-6 ${colors.text} text-center transition-colors duration-500`}>
              Explore Space
            </h2>
            <PlanetFacts />
          </section>
        </main>

        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400 transition-colors duration-500">
          <p>Data provided by NASA's APIs • Built with React and TailwindCSS</p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}